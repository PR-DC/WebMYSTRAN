#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { WebMYSTRAN } from "../index.js";

const RUNTIME_DECK_FILE_NAME = "WEBMYSTRAN.DAT";
const RUNTIME_DECK_BASE_NAME = "WEBMYSTRAN";
const RESULT_EXTENSIONS = ["F06", "PCH", "F04", "NEU", "OP2", "ANS", "BUG", "ERR"];
const PASS_OUTCOMES = new Set(["success", "solver_error"]);
const BUILD_IMAGE = "ghcr.io/r-wasm/flang-wasm:v20.1.4";
const RUNTIME_ABORT_REGEX =
  /fatal Fortran runtime error|RuntimeError:\s*Aborted|Aborted\(\)|RuntimeError:\s*unreachable|RuntimeError:\s*memory access out of bounds|RuntimeError:\s*table index is out of bounds|out of memory/i;
const SOLVER_FAILURE_REGEX = /\*ERROR\s+[0-9A-Z]+|PROCESSING STOPPED|Processing terminated|CHECK F06 OUTPUT FILE/i;

function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

function tailLines(text, count) {
  const lines = String(text || "").replace(/\r\n/g, "\n").split("\n");
  return lines.slice(Math.max(0, lines.length - count)).join("\n");
}

function toPosixPath(value) {
  return String(value || "").replace(/\\/g, "/");
}

function quoteBash(value) {
  return `'${String(value).replace(/'/g, `'\"'\"'`)}'`;
}

function runDocker(args, options = {}) {
  return spawnSync("docker", args, {
    encoding: options.encoding || "utf8",
    timeout: options.timeout,
    maxBuffer: options.maxBuffer,
    cwd: options.cwd,
    env: options.env || process.env
  });
}

function createNativeRunnerContext(repoRoot) {
  const binaryPath = path.join(repoRoot, "sources", "MYSTRAN_native_ref", "Binaries", "mystran");
  if (!fileExists(binaryPath)) {
    throw new Error(`Missing native reference binary: ${binaryPath}. Run scripts/build.ps1 first.`);
  }

  const dockerVersion = runDocker(["version"], { timeout: 30000, maxBuffer: 1024 * 1024 });
  if (dockerVersion.error || dockerVersion.status !== 0) {
    const detail = dockerVersion.error ? ` (${dockerVersion.error.message})` : "";
    throw new Error(`Docker engine is required for native compare smoke${detail}.`);
  }

  return { repoRoot };
}

function listDeckFilesRecursive(baseDir) {
  const all = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && /\.dat$/i.test(entry.name)) {
        all.push(full);
      }
    }
  }

  walk(baseDir);
  return all.sort((a, b) => a.localeCompare(b));
}

function toBenchRelativePath(benchDeckDir, deckAbsPath) {
  return path.relative(benchDeckDir, deckAbsPath).split(path.sep).join("/");
}

function parseFullSmokeArgs(args) {
  const options = {
    decks: [],
    timeoutSeconds: 1800
  };

  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    const normalized = token.toLowerCase();

    if (normalized === "-decks" || normalized === "--decks") {
      let captured = false;
      while (index + 1 < args.length && !args[index + 1].startsWith("-")) {
        index += 1;
        captured = true;
        const parts = String(args[index])
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean);
        options.decks.push(...parts);
      }
      if (!captured) {
        throw new Error("Missing value for -Decks");
      }
      continue;
    }

    if (normalized === "-timeoutseconds" || normalized === "--timeoutseconds") {
      if (index + 1 >= args.length) {
        throw new Error("Missing value for -TimeoutSeconds");
      }
      const parsed = Number.parseInt(args[index + 1], 10);
      if (!Number.isFinite(parsed) || parsed < 1) {
        throw new Error(`Invalid -TimeoutSeconds value: ${args[index + 1]}`);
      }
      options.timeoutSeconds = parsed;
      index += 1;
      continue;
    }

    if (token.startsWith("-")) {
      throw new Error(`Unknown smoke option: ${token}`);
    }

    options.decks.push(token);
  }

  return options;
}

function parseDeckWorkerArgs(args) {
  const options = {
    deckPath: "",
    moduleJs: "",
    moduleWasm: "",
    workDir: "/work"
  };

  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    const normalized = token.toLowerCase();

    if (normalized === "--deck-path") {
      options.deckPath = args[index + 1] || "";
      index += 1;
      continue;
    }
    if (normalized === "--module-js") {
      options.moduleJs = args[index + 1] || "";
      index += 1;
      continue;
    }
    if (normalized === "--module-wasm") {
      options.moduleWasm = args[index + 1] || "";
      index += 1;
      continue;
    }
    if (normalized === "--work-dir") {
      options.workDir = args[index + 1] || "/work";
      index += 1;
      continue;
    }
  }

  if (!options.deckPath || !options.moduleJs || !options.moduleWasm) {
    throw new Error("Deck worker requires --deck-path, --module-js, and --module-wasm");
  }

  return options;
}

async function runDeckWorker(args) {
  const options = parseDeckWorkerArgs(args);
  const deckPath = path.resolve(options.deckPath);

  let solver = null;
  try {
    const startedAt = process.hrtime.bigint();
    const deckText = fs.readFileSync(deckPath, "utf8");
    solver = await WebMYSTRAN.load({
      moduleUrl: pathToFileURL(path.resolve(options.moduleJs)).href,
      wasmUrl: pathToFileURL(path.resolve(options.moduleWasm)).href
    });

    const runResult = solver.run(deckText, {
      workDir: options.workDir || "/work",
      deckFileName: RUNTIME_DECK_FILE_NAME
    });
    const elapsedSec = Number(process.hrtime.bigint() - startedAt) / 1e9;

    const stdout = runResult.raw?.stdout || "";
    const stderr = runResult.raw?.stderr || "";
    const consoleText = runResult.output?.text || `${stdout}${stderr}`;
    const f06Text = runResult.outputs?.F06 ? solver.readOutput(runResult, "F06", "utf8") || "" : "";
    const resultArtifacts = Array.isArray(runResult.files)
      ? runResult.files.map((entry) => ({
          extension: String(entry.extension || "").toUpperCase(),
          length: Number(entry.size || 0)
        }))
      : [];
    const nonEmptyResultFileCount = resultArtifacts.filter((entry) => entry.length > 0).length;
    const hasNormalTermination =
      /MYSTRAN terminated normally/i.test(f06Text) || /MYSTRAN terminated normally/i.test(consoleText);
    const runtimeAbort = RUNTIME_ABORT_REGEX.test(consoleText);
    const solverFailure = SOLVER_FAILURE_REGEX.test(f06Text) || SOLVER_FAILURE_REGEX.test(consoleText);
    const errorCode = getFirstErrorCode(f06Text) || getFirstErrorCode(consoleText);
    const f06Length = resultArtifacts.find((entry) => entry.extension === "F06")?.length || 0;

    process.stdout.write(
      `${JSON.stringify({
        exitCode: Number.isInteger(runResult.raw?.exitCode) ? runResult.raw.exitCode : 1,
        elapsedSec,
        stdout,
        stderr,
        consoleText,
        hasNormalTermination,
        runtimeAbort,
        solverFailure,
        errorCode,
        f06Present: Boolean(runResult.outputs?.F06),
        f06Length,
        nonEmptyResultFileCount,
        resultArtifacts
      })}\n`
    );
    process.exit(0);
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    process.stdout.write(
      `${JSON.stringify({
        exitCode: 1,
        elapsedSec: 0,
        stdout: "",
        stderr: `${message}\n`,
        consoleText: `${message}\n`,
        hasNormalTermination: false,
        runtimeAbort: false,
        solverFailure: false,
        errorCode: null,
        f06Present: false,
        f06Length: 0,
        nonEmptyResultFileCount: 0,
        resultArtifacts: [],
        workerError: message
      })}\n`
    );
    process.exit(0);
  } finally {
    if (solver) {
      solver.destroy();
    }
  }
}

function resolveDeckPath(deckSpec, benchDeckDir, allDeckAbs) {
  if (!deckSpec) {
    return null;
  }

  const direct = path.isAbsolute(deckSpec) ? deckSpec : path.join(benchDeckDir, deckSpec);
  if (fileExists(direct)) {
    return path.resolve(direct);
  }

  const deckSpecNormalized = deckSpec.replace(/\\/g, "/").toLowerCase();
  const exactRelative = allDeckAbs.find((candidate) => {
    const relative = toBenchRelativePath(benchDeckDir, candidate).toLowerCase();
    return relative === deckSpecNormalized;
  });
  if (exactRelative) {
    return exactRelative;
  }

  const byBaseName = allDeckAbs.find((candidate) => {
    return path.basename(candidate).toLowerCase() === path.basename(deckSpec).toLowerCase();
  });
  if (byBaseName) {
    return byBaseName;
  }

  return null;
}

function getFirstErrorCode(text) {
  if (!text || !String(text).trim()) {
    return null;
  }
  const match = String(text).match(/\*ERROR\s+([0-9A-Z]+)/);
  return match ? match[1] : null;
}

function parseDeckWorkerPayload(stdoutText) {
  const lines = String(stdoutText || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  for (let index = lines.length - 1; index >= 0; index -= 1) {
    try {
      const parsed = JSON.parse(lines[index]);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    } catch {
      // Keep scanning trailing lines for JSON payload.
    }
  }

  return null;
}

function normalizeResultArtifacts(artifacts) {
  if (!Array.isArray(artifacts)) {
    return [];
  }
  return artifacts
    .map((entry) => {
      const extension = String(entry.extension || "").toUpperCase();
      const length = Number(entry.length ?? entry.size ?? 0);
      if (!extension) {
        return null;
      }
      return {
        extension,
        length: Number.isFinite(length) && length > 0 ? length : 0
      };
    })
    .filter(Boolean);
}

function evaluateRunStatus(deck, workerResult, processExitCode, timedOut, observedConsoleText) {
  const exitCode = timedOut
    ? 124
    : Number.isInteger(workerResult?.exitCode)
      ? workerResult.exitCode
      : processExitCode;
  const consoleText = String(workerResult?.consoleText || observedConsoleText || "");
  const resultArtifacts = normalizeResultArtifacts(workerResult?.resultArtifacts);
  const f06Length = Number.isFinite(workerResult?.f06Length) ? Math.max(0, workerResult.f06Length) : 0;
  const nonEmptyResultFileCount = Number.isFinite(workerResult?.nonEmptyResultFileCount)
    ? Math.max(0, workerResult.nonEmptyResultFileCount)
    : resultArtifacts.filter((entry) => entry.length > 0).length;
  const f06Present = typeof workerResult?.f06Present === "boolean" ? workerResult.f06Present : false;
  const hasNormalTermination =
    typeof workerResult?.hasNormalTermination === "boolean"
      ? workerResult.hasNormalTermination
      : /MYSTRAN terminated normally/i.test(consoleText);
  const runtimeAbort =
    typeof workerResult?.runtimeAbort === "boolean"
      ? workerResult.runtimeAbort || RUNTIME_ABORT_REGEX.test(consoleText)
      : RUNTIME_ABORT_REGEX.test(consoleText);
  const solverFailure =
    typeof workerResult?.solverFailure === "boolean"
      ? workerResult.solverFailure || SOLVER_FAILURE_REGEX.test(consoleText)
      : SOLVER_FAILURE_REGEX.test(consoleText);
  const errorCode = workerResult?.errorCode || getFirstErrorCode(consoleText);

  let outcome = "unknown";
  if (timedOut) {
    outcome = "timeout";
  } else if (runtimeAbort) {
    outcome = "runtime_abort";
  } else if (exitCode !== 0) {
    outcome = "process_error";
  } else if (!f06Present) {
    outcome = "missing_f06";
  } else if (f06Length === 0) {
    outcome = "empty_f06";
  } else if (nonEmptyResultFileCount === 0) {
    outcome = "missing_outputs";
  } else if (solverFailure) {
    outcome = "solver_error";
  } else if (hasNormalTermination) {
    outcome = "success";
  } else {
    outcome = "no_success_marker";
  }

  return {
    deck,
    outcome,
    exitCode,
    timedOut,
    runtimeAbort,
    hasNormalTermination,
    solverFailure,
    errorCode,
    workerError: workerResult?.workerError || null,
    f06Length,
    nonEmptyResultFileCount,
    resultArtifacts
  };
}

function runWasmDeckCase(deckPath, runnerScript, timeoutSeconds, distJs, distWasm) {
  const result = spawnSync(
    "node",
    [
      runnerScript,
      "__run_deck",
      "--deck-path",
      deckPath,
      "--module-js",
      distJs,
      "--module-wasm",
      distWasm,
      "--work-dir",
      "/work"
    ],
    {
      cwd: path.dirname(deckPath),
      encoding: "utf8",
      timeout: timeoutSeconds * 1000,
      maxBuffer: 16 * 1024 * 1024
    }
  );

  const timedOut = Boolean(result.error && result.error.code === "ETIMEDOUT");
  const processExitCode = timedOut ? 124 : Number.isInteger(result.status) ? result.status : 1;
  const workerResult = parseDeckWorkerPayload(result.stdout || "");
  const elapsedSec = Number.isFinite(workerResult?.elapsedSec) ? workerResult.elapsedSec : 0;
  const stdout = workerResult ? String(workerResult.stdout || "") : String(result.stdout || "");
  let stderr = String(workerResult?.stderr || result.stderr || "");

  if (result.error && !timedOut) {
    stderr = `${stderr}${stderr.endsWith("\n") || stderr.length === 0 ? "" : "\n"}${result.error.message}`;
  }

  const consoleText = String(workerResult?.consoleText || `${stdout}${stderr}`);
  const exitCode =
    timedOut || !workerResult
      ? processExitCode
      : Number.isInteger(workerResult.exitCode)
        ? workerResult.exitCode
        : processExitCode;

  return {
    exitCode,
    timedOut,
    elapsedSec,
    consoleText,
    workerResult
  };
}

function createNativeDeckCommand(deckContainerPath, timeoutSeconds) {
  const deckPathLiteral = quoteBash(deckContainerPath);
  const timeoutSec = Math.max(1, Number.parseInt(String(timeoutSeconds), 10) || 1);
  const abortPattern =
    "fatal Fortran runtime error|RuntimeError:[[:space:]]*Aborted|Aborted\\(\\)|RuntimeError:[[:space:]]*unreachable|RuntimeError:[[:space:]]*memory access out of bounds|RuntimeError:[[:space:]]*table index is out of bounds|out of memory";
  const solverPattern = "\\*ERROR[[:space:]]+[0-9A-Z]+|PROCESSING STOPPED|Processing terminated|CHECK F06 OUTPUT FILE";

  return `
set -euo pipefail
deck_path=${deckPathLiteral}
native_bin='/work/sources/MYSTRAN_native_ref/Binaries/mystran'

if [ ! -f "$deck_path" ]; then
  echo '{"exitCode":1,"elapsedSec":0,"timedOut":false,"stdout":"","stderr":"","consoleText":"","hasNormalTermination":false,"runtimeAbort":false,"solverFailure":false,"errorCode":null,"f06Present":false,"f06Length":0,"nonEmptyResultFileCount":0,"resultArtifacts":[],"workerError":"Deck not found in container"}'
  exit 0
fi

if [ ! -f "$native_bin" ]; then
  echo '{"exitCode":1,"elapsedSec":0,"timedOut":false,"stdout":"","stderr":"","consoleText":"","hasNormalTermination":false,"runtimeAbort":false,"solverFailure":false,"errorCode":null,"f06Present":false,"f06Length":0,"nonEmptyResultFileCount":0,"resultArtifacts":[],"workerError":"Missing native reference binary"}'
  exit 0
fi

chmod +x "$native_bin" || true
tmpdir=$(mktemp -d /tmp/webmystran-native-smoke-XXXXXX)
cleanup() { rm -rf "$tmpdir"; }
trap cleanup EXIT

cp "$deck_path" "$tmpdir/${RUNTIME_DECK_FILE_NAME}"
: > "$tmpdir/MYSTRAN.INI"
printf '${RUNTIME_DECK_FILE_NAME}\\n' > "$tmpdir/stdin.txt"
: > "$tmpdir/native.stdout.log"
: > "$tmpdir/native.stderr.log"

start_ns=$(date +%s%N)
set +e
if command -v timeout >/dev/null 2>&1; then
  (cd "$tmpdir" && timeout ${timeoutSec}s "$native_bin" < stdin.txt > native.stdout.log 2> native.stderr.log)
  run_exit=$?
else
  (cd "$tmpdir" && "$native_bin" < stdin.txt > native.stdout.log 2> native.stderr.log)
  run_exit=$?
fi
set -e
end_ns=$(date +%s%N)
elapsed_sec=$(awk "BEGIN { printf \\"%.6f\\", ($end_ns-$start_ns)/1000000000 }")

timed_out=false
if [ "$run_exit" -eq 124 ] || [ "$run_exit" -eq 137 ] || [ "$run_exit" -eq 143 ]; then
  timed_out=true
fi

f06_path="$tmpdir/${RUNTIME_DECK_BASE_NAME}.F06"
f06_present=false
f06_length=0
if [ -f "$f06_path" ]; then
  f06_present=true
  f06_length=$(wc -c < "$f06_path" | tr -d '[:space:]')
fi

has_normal=false
if [ -f "$f06_path" ] && grep -Eiq 'MYSTRAN terminated normally' "$f06_path"; then
  has_normal=true
elif grep -Eiq 'MYSTRAN terminated normally' "$tmpdir/native.stdout.log" "$tmpdir/native.stderr.log"; then
  has_normal=true
fi

runtime_abort=false
if grep -Eiq '${abortPattern}' "$tmpdir/native.stdout.log" "$tmpdir/native.stderr.log"; then
  runtime_abort=true
fi

solver_failure=false
if [ -f "$f06_path" ] && grep -Eiq '${solverPattern}' "$f06_path"; then
  solver_failure=true
elif grep -Eiq '${solverPattern}' "$tmpdir/native.stdout.log" "$tmpdir/native.stderr.log"; then
  solver_failure=true
fi

error_code=$( (grep -Eo '\\*ERROR[[:space:]]+[0-9A-Z]+' "$f06_path" "$tmpdir/native.stdout.log" "$tmpdir/native.stderr.log" 2>/dev/null || true) | head -n 1 | awk '{print $2}' )
error_json=null
if [ -n "$error_code" ]; then
  error_json="\\"$error_code\\""
fi

artifacts_json=""
non_empty_count=0
for ext in ${RESULT_EXTENSIONS.join(" ")}; do
  candidate="$tmpdir/${RUNTIME_DECK_BASE_NAME}.$ext"
  if [ -f "$candidate" ]; then
    length=$(wc -c < "$candidate" | tr -d '[:space:]')
    if [ -z "$length" ]; then
      length=0
    fi
    if [ "$length" -gt 0 ] 2>/dev/null; then
      non_empty_count=$((non_empty_count + 1))
    fi
    entry="{\\"extension\\":\\"$ext\\",\\"length\\":$length}"
    if [ -z "$artifacts_json" ]; then
      artifacts_json="$entry"
    else
      artifacts_json="$artifacts_json,$entry"
    fi
  fi
done

echo "{\\"exitCode\\":$run_exit,\\"elapsedSec\\":$elapsed_sec,\\"timedOut\\":$timed_out,\\"stdout\\":\\"\\",\\"stderr\\":\\"\\",\\"consoleText\\":\\"\\",\\"hasNormalTermination\\":$has_normal,\\"runtimeAbort\\":$runtime_abort,\\"solverFailure\\":$solver_failure,\\"errorCode\\":$error_json,\\"f06Present\\":$f06_present,\\"f06Length\\":$f06_length,\\"nonEmptyResultFileCount\\":$non_empty_count,\\"resultArtifacts\\":[$artifacts_json]}"
`;
}

function runNativeDeckCase(nativeContext, deckPath, timeoutSeconds) {
  const deckRelPath = toPosixPath(path.relative(nativeContext.repoRoot, deckPath));
  const deckContainerPath = `/work/${deckRelPath}`;
  const command = createNativeDeckCommand(deckContainerPath, timeoutSeconds);

  const result = runDocker(
    [
      "run",
      "--rm",
      "--volume",
      `${nativeContext.repoRoot}:/work`,
      "--workdir",
      "/work",
      BUILD_IMAGE,
      "/bin/bash",
      "-lc",
      command
    ],
    {
      encoding: "utf8",
      timeout: (Math.max(1, timeoutSeconds) + 120) * 1000,
      maxBuffer: 16 * 1024 * 1024
    }
  );

  const workerResult = parseDeckWorkerPayload(result.stdout || "");
  const timedOut =
    Boolean(workerResult?.timedOut) || Boolean(result.error && result.error.code === "ETIMEDOUT");
  const processExitCode = timedOut ? 124 : Number.isInteger(result.status) ? result.status : 1;
  const exitCode =
    timedOut || !workerResult
      ? processExitCode
      : Number.isInteger(workerResult.exitCode)
        ? workerResult.exitCode
        : processExitCode;
  const elapsedSec = Number.isFinite(workerResult?.elapsedSec) ? workerResult.elapsedSec : 0;
  const consoleText = String(workerResult?.consoleText || `${result.stdout || ""}${result.stderr || ""}`);

  return {
    exitCode,
    timedOut,
    elapsedSec,
    consoleText,
    workerResult
  };
}

function hasNonEmptyArtifact(status, extension) {
  const normalized = String(extension || "").toUpperCase();
  if (!normalized) {
    return false;
  }
  return status.resultArtifacts.some(
    (entry) => String(entry.extension || "").toUpperCase() === normalized && Number(entry.length || 0) > 0
  );
}

function evaluateNativeCompare(wasmStatus, nativeStatus) {
  const wasmPass = PASS_OUTCOMES.has(wasmStatus.outcome);
  const nativePass = PASS_OUTCOMES.has(nativeStatus.outcome);
  const wasmOutcome = String(wasmStatus.outcome || "");
  const nativeOutcome = String(nativeStatus.outcome || "");
  const bothSuccess = wasmOutcome === "success" && nativeOutcome === "success";
  const bothSolverError = wasmOutcome === "solver_error" && nativeOutcome === "solver_error";

  if (wasmPass !== nativePass) {
    return { match: false, reason: "pass_mismatch" };
  }

  if (wasmPass && nativePass) {
    if (bothSolverError) {
      return { match: true, reason: null };
    }

    if (!bothSuccess) {
      return { match: false, reason: "pass_outcome_mismatch" };
    }

    const wasmErrorCode = wasmStatus.errorCode || null;
    const nativeErrorCode = nativeStatus.errorCode || null;
    if (wasmErrorCode !== nativeErrorCode) {
      return { match: false, reason: "error_code_mismatch" };
    }

    if (wasmStatus.hasNormalTermination !== nativeStatus.hasNormalTermination) {
      return { match: false, reason: "termination_marker_mismatch" };
    }
    const wasmHasOp2 = hasNonEmptyArtifact(wasmStatus, "OP2");
    const nativeHasOp2 = hasNonEmptyArtifact(nativeStatus, "OP2");
    if (wasmHasOp2 !== nativeHasOp2) {
      return { match: false, reason: "op2_presence_mismatch" };
    }
  } else if (wasmOutcome !== nativeOutcome) {
    return { match: false, reason: "outcome_mismatch" };
  }

  return { match: true, reason: null };
}

async function runQuickSmoke(repoRoot) {
  const distJs = path.join(repoRoot, "dist", "mystran.js");
  const distWasm = path.join(repoRoot, "dist", "mystran.wasm");
  const deckLabel = "Bush_Bar/bar_01.DAT";
  const deckPath = path.join(
    repoRoot,
    "sources",
    "MYSTRAN_Benchmark",
    "Benchmark_Decks",
    "Bush_Bar",
    "bar_01.DAT"
  );

  if (!fileExists(distJs)) {
    console.error("[smoke] Missing dist/mystran.js. Build first:");
    console.error("        scripts\\build.ps1");
    process.exit(2);
  }
  if (!fileExists(distWasm)) {
    console.error("[smoke] Missing dist/mystran.wasm. Build first:");
    console.error("        scripts\\build.ps1");
    process.exit(2);
  }
  if (!fileExists(deckPath)) {
    console.error("[smoke] Missing benchmark deck:");
    console.error(`        ${deckPath}`);
    console.error("        Run scripts\\fetch_deps.ps1 first.");
    process.exit(2);
  }

  const nativeContext = createNativeRunnerContext(repoRoot);
  let mystran = null;
  let combinedText = "";

  try {
    const deckText = fs.readFileSync(deckPath, "utf8");
    const startedAt = process.hrtime.bigint();
    mystran = await WebMYSTRAN.load({
      moduleUrl: pathToFileURL(distJs).href,
      wasmUrl: pathToFileURL(distWasm).href
    });

    const result = mystran.run(deckText, {
      workDir: "/work",
      deckFileName: RUNTIME_DECK_FILE_NAME
    });
    const wasmElapsedSec = Number(process.hrtime.bigint() - startedAt) / 1e9;

    const problems = [];
    const { raw, output } = result;
    combinedText = output.text || "";

    if (raw.exitCode !== 0) {
      problems.push(`exit code ${raw.exitCode}`);
    }
    if (!output.hasNormalTermination) {
      problems.push("missing normal termination marker");
    }
    if (output.errorCodes.length > 0) {
      problems.push(`solver error code(s): ${output.errorCodes.join(", ")}`);
    }
    if (!result.outputs.F06) {
      problems.push("missing F06 output");
    }
    if (!result.outputs.OP2) {
      problems.push("missing OP2 output");
    }

    let f06Text = "";
    if (result.outputs.F06) {
      f06Text = mystran.readOutput(result, "F06", "utf8");
      if (!/MYSTRAN END/i.test(f06Text)) {
        problems.push("F06 missing MYSTRAN END marker");
      }
      if (!/Total cpu time/i.test(f06Text)) {
        problems.push("F06 missing total CPU time marker");
      }
    }

    const resultArtifacts = Array.isArray(result.files)
      ? result.files.map((entry) => ({
          extension: String(entry.extension || "").toUpperCase(),
          length: Number(entry.size || 0)
        }))
      : [];
    const wasmWorkerResult = {
      exitCode: Number.isInteger(raw.exitCode) ? raw.exitCode : 1,
      elapsedSec: wasmElapsedSec,
      stdout: raw.stdout || "",
      stderr: raw.stderr || "",
      consoleText: output.text || "",
      hasNormalTermination: Boolean(output.hasNormalTermination),
      runtimeAbort: Boolean(output.hasRuntimeAbort),
      solverFailure: Boolean(output.hasSolverError),
      errorCode: output.firstErrorCode || null,
      f06Present: Boolean(result.outputs.F06),
      f06Length: f06Text.length,
      nonEmptyResultFileCount: resultArtifacts.filter((entry) => entry.length > 0).length,
      resultArtifacts
    };
    const wasmStatus = evaluateRunStatus(deckLabel, wasmWorkerResult, raw.exitCode, false, output.text || "");

    const nativeRun = runNativeDeckCase(nativeContext, deckPath, 1800);
    const nativeStatus = evaluateRunStatus(
      deckLabel,
      nativeRun.workerResult,
      nativeRun.exitCode,
      nativeRun.timedOut,
      nativeRun.consoleText
    );

    const comparison = evaluateNativeCompare(wasmStatus, nativeStatus);
    if (!PASS_OUTCOMES.has(nativeStatus.outcome)) {
      problems.push(`native outcome ${nativeStatus.outcome}`);
    }
    if (!comparison.match) {
      problems.push(`native compare mismatch (${comparison.reason})`);
    }

    const isPass = problems.length === 0;
    const lineState = isPass ? "PASS" : "FAIL";
    const cmpToken = comparison.match ? "match" : `mismatch:${comparison.reason}`;
    const codeToken =
      wasmStatus.errorCode || nativeStatus.errorCode
        ? ` error=${wasmStatus.errorCode ?? "none"}/${nativeStatus.errorCode ?? "none"}`
        : "";
    console.log(
      `[smoke][0001/0001] ${lineState} deck=${deckLabel} wasm=${wasmStatus.outcome} native=${nativeStatus.outcome} cmp=${cmpToken} exit=${wasmStatus.exitCode}/${nativeStatus.exitCode} time=${wasmElapsedSec.toFixed(3)}s/${nativeRun.elapsedSec.toFixed(3)}s f06=${wasmStatus.f06Length}/${nativeStatus.f06Length} files=${wasmStatus.nonEmptyResultFileCount}/${nativeStatus.nonEmptyResultFileCount}${codeToken}`
    );
    console.log(
      `Smoke summary: total=1 pass=${isPass ? 1 : 0} fail=${isPass ? 0 : 1} wasmWall=${wasmElapsedSec.toFixed(3)}s nativeWall=${nativeRun.elapsedSec.toFixed(3)}s`
    );

    if (!isPass) {
      for (const problem of problems) {
        console.error(`  - ${problem}`);
      }
      console.error("");
      console.error("--- tail of wasm combined console output ---");
      console.error(tailLines(combinedText, 120));
      console.error("-------------------------------------------");
      process.exit(1);
    }
  } finally {
    if (mystran) {
      mystran.destroy();
    }
  }
}

function runFullSmoke(repoRoot, forwardedArgs) {
  const options = parseFullSmokeArgs(forwardedArgs);
  const distDir = path.join(repoRoot, "dist");
  const benchDeckDir = path.join(repoRoot, "sources", "MYSTRAN_Benchmark", "Benchmark_Decks");
  const runnerScript = fileURLToPath(import.meta.url);

  const distJs = path.join(distDir, "mystran.js");
  const webmystranWasm = path.join(distDir, "mystran.wasm");
  for (const requiredPath of [distJs, webmystranWasm, benchDeckDir]) {
    if (!fileExists(requiredPath)) {
      throw new Error(`Missing required path: ${requiredPath}`);
    }
  }

  const allDeckAbs = listDeckFilesRecursive(benchDeckDir);
  const deckSpecs =
    options.decks.length > 0
      ? options.decks
      : allDeckAbs.map((deckPath) => toBenchRelativePath(benchDeckDir, deckPath));

  if (deckSpecs.length === 0) {
    throw new Error(`No benchmark decks found under ${benchDeckDir}`);
  }

  const nativeContext = createNativeRunnerContext(repoRoot);
  const runnerFailures = [];
  const outcomeFailures = [];
  let pairPassCount = 0;
  let wasmPassCount = 0;
  let nativePassCount = 0;
  let ignoredBothNonSuccessCount = 0;
  let wasmTotalWallSec = 0;
  let nativeTotalWallSec = 0;

  let deckIndex = 0;
  const totalDecks = deckSpecs.length;
  for (const deckSpec of deckSpecs) {
    deckIndex += 1;
    const deckPrefix = `[smoke][${String(deckIndex).padStart(4, "0")}/${String(totalDecks).padStart(4, "0")}]`;
    const deckPath = resolveDeckPath(deckSpec, benchDeckDir, allDeckAbs);
    if (!deckPath) {
      const message = `Deck not found: ${deckSpec}`;
      runnerFailures.push(message);
      console.log(`${deckPrefix} FAIL deck=${deckSpec} wasm=deck_not_found native=deck_not_found cmp=mismatch:deck_not_found exit=1/1 time=0.000s/0.000s f06=0/0 files=0/0`);
      continue;
    }

    const deckLabel = toBenchRelativePath(benchDeckDir, deckPath);
    const wasmRun = runWasmDeckCase(
      deckPath,
      runnerScript,
      options.timeoutSeconds,
      distJs,
      webmystranWasm
    );
    const nativeRun = runNativeDeckCase(nativeContext, deckPath, options.timeoutSeconds);
    wasmTotalWallSec += wasmRun.elapsedSec;
    nativeTotalWallSec += nativeRun.elapsedSec;

    const wasmStatus = evaluateRunStatus(
      deckLabel,
      wasmRun.workerResult,
      wasmRun.exitCode,
      wasmRun.timedOut,
      wasmRun.consoleText
    );
    const nativeStatus = evaluateRunStatus(
      deckLabel,
      nativeRun.workerResult,
      nativeRun.exitCode,
      nativeRun.timedOut,
      nativeRun.consoleText
    );

    const comparison = evaluateNativeCompare(wasmStatus, nativeStatus);
    const wasmPass = PASS_OUTCOMES.has(wasmStatus.outcome);
    const nativePass = PASS_OUTCOMES.has(nativeStatus.outcome);
    if (wasmPass) {
      wasmPassCount += 1;
    }
    if (nativePass) {
      nativePassCount += 1;
    }

    const bothNonSuccess = wasmStatus.outcome !== "success" && nativeStatus.outcome !== "success";
    const isPass = bothNonSuccess || (wasmPass && nativePass && comparison.match);
    if (isPass) {
      pairPassCount += 1;
      if (bothNonSuccess) {
        ignoredBothNonSuccessCount += 1;
      }
    } else {
      outcomeFailures.push(
        `${deckLabel} failed: wasm=${wasmStatus.outcome} native=${nativeStatus.outcome} cmp=${comparison.match ? "match" : comparison.reason} wasmExit=${wasmStatus.exitCode} nativeExit=${nativeStatus.exitCode} wasmError=${wasmStatus.errorCode ?? "none"} nativeError=${nativeStatus.errorCode ?? "none"}`
      );
    }

    const lineState = isPass ? "PASS" : "FAIL";
    const cmpToken = bothNonSuccess
      ? "ignored:both_non_success"
      : comparison.match
        ? "match"
        : `mismatch:${comparison.reason}`;
    const lineError =
      wasmStatus.errorCode || nativeStatus.errorCode
        ? ` error=${wasmStatus.errorCode ?? "none"}/${nativeStatus.errorCode ?? "none"}`
        : "";
    console.log(
      `${deckPrefix} ${lineState} deck=${deckLabel} wasm=${wasmStatus.outcome} native=${nativeStatus.outcome} cmp=${cmpToken} exit=${wasmStatus.exitCode}/${nativeStatus.exitCode} time=${wasmRun.elapsedSec.toFixed(3)}s/${nativeRun.elapsedSec.toFixed(3)}s f06=${wasmStatus.f06Length}/${nativeStatus.f06Length} files=${wasmStatus.nonEmptyResultFileCount}/${nativeStatus.nonEmptyResultFileCount}${lineError}`
    );
  }

  const hasFailures = runnerFailures.length > 0 || outcomeFailures.length > 0;
  if (runnerFailures.length > 0) {
    console.log("");
    console.log("Run infrastructure failures:");
    for (const failure of runnerFailures) {
      console.log(` - ${failure}`);
    }
  }
  if (outcomeFailures.length > 0) {
    console.log("");
    console.log("Outcome failures:");
    for (const failure of outcomeFailures) {
      console.log(` - ${failure}`);
    }
  }

  const failedCount = deckSpecs.length - pairPassCount;
  console.log("");
  console.log(
    `Smoke summary: total=${deckSpecs.length} pass=${pairPassCount} fail=${failedCount} wasmPass=${wasmPassCount} nativePass=${nativePassCount} ignoredBothNonSuccess=${ignoredBothNonSuccessCount} wasmWall=${Number(wasmTotalWallSec.toFixed(3))}s nativeWall=${Number(nativeTotalWallSec.toFixed(3))}s`
  );

  if (hasFailures) {
    throw new Error(
      `Smoke test failed (pairPass=${pairPassCount}, pairFail=${failedCount}, wasmPass=${wasmPassCount}, nativePass=${nativePassCount}, ignoredBothNonSuccess=${ignoredBothNonSuccessCount}).`
    );
  }
}

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(__dirname, "..");
  const args = process.argv.slice(2);
  const mode = (args[0] || "quick").toLowerCase();

  if (mode === "__run_deck") {
    await runDeckWorker(args.slice(1));
    return;
  }

  if (mode === "quick") {
    await runQuickSmoke(repoRoot);
    return;
  }
  if (mode === "full") {
    runFullSmoke(repoRoot, args.slice(1));
    return;
  }

  throw new Error(`Unknown command "${args[0]}". Supported: quick, full`);
}

main().catch((error) => {
  console.error("[smoke] FAIL");
  console.error(error && error.message ? error.message : error);
  process.exit(1);
});
