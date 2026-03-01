# Third-Party Notices

The generated artifacts in `dist/` and build/runtime flow may involve these
third-party components:

- Emscripten SDK (MIT License)
  - https://emscripten.org/docs/introducing_emscripten/emscripten_license.html
- LLVM Project (Apache 2.0 with LLVM Exceptions)
  - https://llvm.org/LICENSE.txt
- flang-wasm container image
  - `ghcr.io/r-wasm/flang-wasm:v20.1.4`
- MYSTRAN upstream source (MIT License)
  - https://github.com/MYSTRANsolver/MYSTRAN
- SuperLU / SuperLU_MT (via MYSTRAN submodules)
  - https://github.com/xiaoyeli/superlu
  - https://github.com/xiaoyeli/superlu_mt
- netlib f2c source (used in build toolchain)
  - https://www.netlib.org/f2c/

This repository does not redistribute the full toolchains. Use the links above
for their license texts and notices.

