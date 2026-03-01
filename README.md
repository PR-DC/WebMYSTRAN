# WebMYSTRAN (WebAssembly)

Builds [MYSTRAN](https://github.com/MYSTRANsolver/MYSTRAN) into WebAssembly and provides:

- reproducible fetch/build scripts
- quick smoke and full benchmark-deck smoke validation
- an ESM JavaScript library (`src/web_mystran.js`, `src/mystran_input.js`, `src/output_parser.js`)

## Requirements

- Docker (or compatible daemon)
- Node.js 18+
- PowerShell (Windows helper scripts)

## Quick Start (Windows)

1. `powershell -File scripts/fetch_deps.ps1`
2. `powershell -File scripts/build.ps1`
3. `node tools/smoke_test.js`

For full benchmark-deck smoke checks:

- `powershell -File scripts/smoke_test.ps1`

## npm Scripts

- `npm run fetch-deps`
- `npm run build`
- `npm run smoke` (library-level smoke)
- `npm run smoke:full` (full deck smoke)

If PowerShell blocks `npm.ps1` by execution policy, run `npm.cmd` instead (for example: `npm.cmd run smoke`).

## Build Outputs

- `dist/mystran.js` (ES module, `MODULARIZE=1`, `EXPORT_ES6=1`)
- `dist/mystran.wasm`
- `sources/MYSTRAN_native_ref/Binaries/mystran` (native Linux reference binary for smoke compare)

## Module Exports

- `./index.js` -> `WebMYSTRAN`, `MystranInput`, `parseMystranOutput`
- `./src/web_mystran.js` -> `WebMYSTRAN`
- `./src/mystran_input.js` -> `MystranInput`
- `./src/output_parser.js` -> `parseMystranOutput`

## JavaScript API (`index.js` exports)

### `WebMYSTRAN`

- `static async load(options?) -> Promise<WebMYSTRAN>`
- `static input(lines?) -> MystranInput`
- `static Input` (alias for `MystranInput`)
- `input(lines?) -> MystranInput`
- `run(deckText, options?) -> result`
- `readOutput(result, extension, encoding?)`
- `writeFile(path, data)`, `readFile(path, encoding?)`, `FS`, `reset()`, `destroy()`

`WebMYSTRAN.load(options?)` accepts:

- `moduleUrl`: URL/path override for `dist/mystran.js`
- `wasmUrl`: URL/path override for `dist/mystran.wasm`
- `moduleFactory`: custom emscripten module factory function
- `exportName`: export name when loading from `moduleUrl` (default `WebmystranModule`)
- `wasmBinary`: `Uint8Array`/`ArrayBuffer`/`Buffer` override for wasm bytes
- `workDir`: virtual FS working directory (default `/work`)
- `onStdout`/`onStderr`: per-line callbacks
- `moduleOptions`/`locateFile`: forwarded to emscripten module options

`run(deckText, options?)`:

- writes `deckText` to `deckFileName` (default `WEBMYSTRAN.DAT`)
- executes wasm in-process via ESM module factory
- returns:
  - `raw`: `{ stdout, stderr, exitCode, signal, timedOut }`
  - `output`: parsed status object from `parseMystranOutput(raw)`
  - `outputs`: discovered result files by extension (`F06`, `OP2`, ...)
  - `files`: artifact metadata `{ extension, name, path, size }`
  - `workDir`, `deckFileName`, `deckPath`

`run(..., options?)` options:

- `deckFileName`, `workDir`, `stdinText`, `args`
- `files`: array of `{ path, data }` staged before execution
- `parseOptions`: forwarded to parser
- `outputExtensions`: custom extension scan list

### `MystranInput`

Builder for deck text.

- `add(line | lines[])`, `addLines(lines)`
- `blank(count?)`, `comment(text?)`
- `sol(value)`, `cend()`, `subcase(id)`
- `set(key, value)`, `setTitle(value)`, `setSubtitle(value)`, `setLabel(value)`
- `beginBulk()`, `endData()`
- `param(name, value)`, `include(path)`
- `toArray()`, `toString()`

### `parseMystranOutput(raw)`

Parses stdout/stderr into a structured status object:

- `hasNormalTermination`
- `hasRuntimeAbort`
- `hasSolverError`
- `warningCount`
- `errorCodes`, `firstErrorCode`

## Example

```js
import fs from "node:fs";
import { WebMYSTRAN } from "./index.js";

const deck = fs.readFileSync(
  "sources/MYSTRAN_Benchmark/Benchmark_Decks/Bush_Bar/bar_01.DAT",
  "utf8"
);

const solver = await WebMYSTRAN.load();
const result = solver.run(deck, { deckFileName: "WEBMYSTRAN.DAT" });

if (!result.output.hasNormalTermination) {
  throw new Error("MYSTRAN did not terminate normally.");
}

const f06Text = solver.readOutput(result, "F06", "utf8");
console.log(f06Text.slice(0, 400));
solver.destroy();
```

## Smoke Testing

### Library smoke

- `node tools/smoke_test.js`
- Uses benchmark deck `Bush_Bar/bar_01.DAT`
- Uses the same per-deck PASS/FAIL line format and final summary format as full smoke
- Runs both wasm and native reference, then checks wasm/native parity for the deck
- Validates:
  - process exit code
  - `MYSTRAN terminated normally`
  - no parsed `*ERROR` codes
  - required output artifacts (`F06`, `OP2`)

### Full deck smoke

- `scripts/smoke_test.ps1` (or `node tools/smoke_test.js full`) runs wasm and native reference over selected benchmark decks
- Checks:
  - per-deck wasm and native run outcomes (timeouts/runtime aborts/process errors)
  - required output generation (`F06` plus non-empty result artifacts)
  - wasm/native parity checks (outcome class, termination marker, error code, OP2 presence)
- Reports one terminal line per deck and a final summary line
- Writes no smoke artifacts to host disk (no `smoke_run` folder or host-side deck outputs)

## Technical References

- Source/dependency provenance: [SOURCES.md](./SOURCES.md)
- Patch inventory: [PATCHING.md](./PATCHING.md)
- Third-party notices: [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)

## Environment Variables

`scripts/build.ps1` forwards:

- `WEBMYSTRAN_DEBUG_STACKS`
- `WEBMYSTRAN_TRACE_MALLOC`
- `WEBMYSTRAN_PROFILE_CHECKPOINTS`

`scripts/smoke_test.ps1` accepts smoke arguments directly.

## License

- Project/package: MIT ([LICENSE](./LICENSE))
- Upstream MYSTRAN source is MIT (see `sources/MYSTRAN/LICENSE.txt`)
- Additional notices: [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)
