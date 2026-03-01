import { MystranInput } from "./mystran_input.js";
import { parseMystranOutput } from "./output_parser.js";
import { WasmRunner, joinPath, toPosixPath } from "../tools/wasm_runner.js";

const DEFAULT_OUTPUT_EXTENSIONS = [
  "F06",
  "F04",
  "PCH",
  "OP2",
  "NEU",
  "ANS",
  "BUG",
  "ERR"
];

function basenamePosix(pathValue) {
  const normalized = toPosixPath(pathValue || "");
  const idx = normalized.lastIndexOf("/");
  if (idx < 0) {
    return normalized;
  }
  return normalized.slice(idx + 1);
}

function dirnamePosix(pathValue) {
  const normalized = toPosixPath(pathValue || "");
  const idx = normalized.lastIndexOf("/");
  if (idx <= 0) {
    return "/";
  }
  return normalized.slice(0, idx);
}

function getDeckBaseName(deckPath) {
  const deckName = basenamePosix(deckPath);
  const dot = deckName.lastIndexOf(".");
  if (dot > 0) {
    return deckName.slice(0, dot);
  }
  return deckName;
}

function resolveRunPath(workDir, targetPath) {
  const raw = toPosixPath(String(targetPath || ""));
  if (!raw) {
    throw new TypeError("Expected a non-empty path.");
  }
  if (raw.startsWith("/")) {
    return raw;
  }
  return joinPath(workDir, raw);
}

function findOutputPath(fs, caseDir, deckBaseName, extension) {
  const normalizedExt = String(extension || "").trim().toUpperCase();
  if (!normalizedExt) {
    return null;
  }

  const exact = joinPath(caseDir, `${deckBaseName}.${normalizedExt}`);
  if (fs.analyzePath(exact).exists) {
    return exact;
  }

  const escapedBase = deckBaseName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedExt = normalizedExt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^${escapedBase}\\..*${escapedExt}$`, "i");

  for (const entry of fs.readdir(caseDir)) {
    if (entry === "." || entry === "..") {
      continue;
    }
    if (pattern.test(entry)) {
      return joinPath(caseDir, entry);
    }
  }

  return null;
}

function collectOutputs(fs, caseDir, deckBaseName, extensions) {
  const byExtension = {};
  const files = [];

  for (const ext of extensions) {
    const outputPath = findOutputPath(fs, caseDir, deckBaseName, ext);
    if (!outputPath) {
      continue;
    }
    let size = 0;
    try {
      size = Number(fs.stat(outputPath).size || 0);
    } catch {
      size = 0;
    }
    const normalizedExt = String(ext).toUpperCase();
    byExtension[normalizedExt] = outputPath;
    files.push({
      extension: normalizedExt,
      name: basenamePosix(outputPath),
      path: outputPath,
      size
    });
  }

  return { byExtension, files };
}

class WebMYSTRAN {
  constructor(runner, loadOptions = null) {
    this._runner = runner;
    this._loadOptions = loadOptions;
  }

  static async load(options = {}) {
    const loadOptions = {
      exportName: "WebmystranModule",
      ...options
    };
    const runner = await WasmRunner.load("mystran", loadOptions);
    return new WebMYSTRAN(runner, loadOptions);
  }

  static input(lines) {
    return new MystranInput(lines);
  }

  static get Input() {
    return MystranInput;
  }

  get FS() {
    return this._runner.FS;
  }

  input(lines) {
    return new MystranInput(lines);
  }

  writeFile(path, data) {
    this._runner.writeFile(path, data);
  }

  readFile(path, encoding = "utf8") {
    return this._runner.readFile(path, encoding);
  }

  run(deckText, options = {}) {
    const workDir = toPosixPath(options.workDir || "/work");
    const deckFileName = String(options.deckFileName || "WEBMYSTRAN.DAT");
    const deckPath = resolveRunPath(workDir, deckFileName);

    const files = Array.isArray(options.files) ? options.files.slice() : [];
    if (deckText != null) {
      files.push({
        path: deckPath,
        data: deckText
      });
    }

    const stdinText =
      options.stdinText == null ? basenamePosix(deckPath) : String(options.stdinText);

    const rawRunner = this._runner.runWithStdin(stdinText, {
      workDir,
      files,
      args: Array.isArray(options.args) ? options.args.slice() : []
    });
    const raw = {
      stdout: rawRunner.stdout,
      stderr: rawRunner.stderr,
      exitCode: rawRunner.exitCode,
      signal: null,
      timedOut: false
    };

    const parseOptions = options.parseOptions && typeof options.parseOptions === "object"
      ? options.parseOptions
      : {};
    const output = parseMystranOutput(raw, parseOptions);

    const outputExtensions = Array.isArray(options.outputExtensions) && options.outputExtensions.length > 0
      ? options.outputExtensions
      : DEFAULT_OUTPUT_EXTENSIONS;
    const deckBaseName = getDeckBaseName(deckPath);
    const caseDir = dirnamePosix(deckPath);
    const outputs = collectOutputs(this._runner.FS, caseDir, deckBaseName, outputExtensions);

    const f06Path = outputs.byExtension.F06;
    if (f06Path) {
      try {
        const f06Text = this._runner.readFile(f06Path, "utf8");
        output.f06HasNormalTermination = /MYSTRAN terminated normally/i.test(f06Text);
        output.f06HasMystranEnd = /MYSTRAN END/i.test(f06Text);
        if (output.f06HasNormalTermination) {
          output.hasNormalTermination = true;
        }
      } catch {
        output.f06HasNormalTermination = false;
        output.f06HasMystranEnd = false;
      }
    } else {
      output.f06HasNormalTermination = false;
      output.f06HasMystranEnd = false;
    }

    return {
      workDir,
      deckFileName: basenamePosix(deckPath),
      deckPath,
      raw,
      output,
      outputs: outputs.byExtension,
      files: outputs.files
    };
  }

  readOutput(result, extension, encoding = "utf8") {
    if (!result || !result.outputs) {
      throw new TypeError("readOutput expects a run result with outputs.");
    }
    const normalized = String(extension || "").toUpperCase();
    const outputPath = result.outputs[normalized];
    if (!outputPath) {
      return null;
    }
    return this._runner.readFile(outputPath, encoding);
  }

  async reset() {
    if (!this._loadOptions) {
      throw new Error("Cannot reset without load options.");
    }
    if (this._runner && typeof this._runner.destroy === "function") {
      this._runner.destroy();
    }
    this._runner = await WasmRunner.load("mystran", this._loadOptions);
  }

  destroy() {
    if (this._runner && typeof this._runner.destroy === "function") {
      this._runner.destroy();
    }
  }
}

export { WebMYSTRAN };
