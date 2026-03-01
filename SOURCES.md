# Source Provenance (WebMYSTRAN)

This package builds MYSTRAN into WebAssembly and includes helper scripts for
fetch, patch, build, and parity validation.

If you redistribute the wasm output, keep this repository (scripts + patches)
and make the exact upstream sources available.

## Upstream Repositories

### MYSTRAN

- Name: MYSTRAN
- URL: https://github.com/MYSTRANsolver/MYSTRAN.git
- Local path: `sources/MYSTRAN`
- Resolved branch at fetch/build time: `main`
- Resolved commit: `ae40b554c76c3d27b9b0fdaf697346f8e05251ac`
- License: MIT (`sources/MYSTRAN/LICENSE.txt`)

### MYSTRAN_Benchmark

- Name: MYSTRAN_Benchmark
- URL: https://github.com/MYSTRANsolver/MYSTRAN_Benchmark.git
- Local path: `sources/MYSTRAN_Benchmark`
- Resolved branch at fetch/build time: `main`
- Resolved commit: `ad765adfcd2e2fd148743f0846d6ce6e71d33c99`
- License: see upstream repository

## Fetch and Build Chain

- Fetch script: `scripts/fetch_deps.ps1`
- Patch generator/applier: `tools/build.js`
- Containerized build driver: embedded in `tools/build.js` (`tools/build_assets/build_in_docker.sh` at runtime)
- CMake entrypoint/toolchain: embedded in `tools/build.js` (`tools/build_assets/*` at runtime)

## Patch Policy

- Patches are applied in-place to fetched sources in `sources/MYSTRAN`.
- Detailed patch inventory is maintained in `PATCHING.md`.

## Repro Note

To reproduce the same source state:

1. Clone this repository.
2. Run `scripts/fetch_deps.ps1` with matching refs (`-MystranRef`, `-BenchmarkRef`) if needed.
3. Confirm `git -C sources/MYSTRAN rev-parse HEAD` and
   `git -C sources/MYSTRAN_Benchmark rev-parse HEAD` match the commit IDs above.
