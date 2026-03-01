# PATCHING

Generated: 2026-02-27 18:09:00

Generated from `tools/build.js`.

Total patches: 205

## Summary By File

- `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90`: 13
- `sources/MYSTRAN/Source/LK9/LINK9/LINK9.f90`: 10
- `sources/MYSTRAN/Source/MAIN/MYSTRAN_FILES.f90`: 10
- `sources/MYSTRAN/Source/LK1/LINK1/LINK1.f90`: 6
- `sources/MYSTRAN/Source/LK5/LINK5.f90`: 5
- `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_SPCS.f90`: 4
- `sources/MYSTRAN/CMakeLists.txt`: 3
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_SPC.f90`: 3
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_SPC1.f90`: 3
- `sources/MYSTRAN/Source/LK1/L1B/GRID_PROC.f90`: 3
- `sources/MYSTRAN/Source/MAIN/MYSTRAN.f90`: 3
- `sources/MYSTRAN/Source/UTIL/PRT_MATS_ON_RESTART.f90`: 3
- `sources/MYSTRAN/Source/LK1/L1B/SEQ_PROC.f90`: 2
- `sources/MYSTRAN/Source/LK1/L1D/FORCE_MOM_PROC.f90`: 2
- `sources/MYSTRAN/Source/LK1/L1D/GRAV_PROC.f90`: 2
- `sources/MYSTRAN/Source/LK1/L1D/MPC_PROC.f90`: 2
- `sources/MYSTRAN/Source/LK1/L1D/PRESSURE_DATA_PROC.f90`: 2
- `sources/MYSTRAN/Source/LK1/L1D/RBE2_PROC.f90`: 2
- `sources/MYSTRAN/Source/LK1/L1D/RBE3_PROC.f90`: 2
- `sources/MYSTRAN/Source/LK1/L1D/RFORCE_PROC.f90`: 2
- `sources/MYSTRAN/Source/LK1/L1D/RSPLINE_PROC.f90`: 2
- `sources/MYSTRAN/Source/LK1/L1D/TEMPERATURE_DATA_PROC.f90`: 2
- `sources/MYSTRAN/Source/LK1/L1D/YS_ARRAY.f90`: 2
- `sources/MYSTRAN/Source/LK1/L1E/ESP.f90`: 2
- `sources/MYSTRAN/Source/LK1/L1E/SPARSE_KGG.f90`: 2
- `sources/MYSTRAN/Source/LK1/LINK1/WRITE_ENF_TO_L1O.f90`: 2
- `sources/MYSTRAN/Source/LK3/LINK3.f90`: 2
- `sources/MYSTRAN/Source/LK4/LINK4.f90`: 2
- `sources/MYSTRAN/Source/LK5/EXPAND_PHIXA_TO_PHIXG.f90`: 2
- `sources/MYSTRAN/Source/LK6/LINK6.f90`: 2
- `sources/MYSTRAN/Source/LK9/L92/OFP3.f90`: 2
- `sources/MYSTRAN/Source/UTIL/READ_MATRIX_1.f90`: 2
- `sources/MYSTRAN/Source/UTIL/READ_MATRIX_2.f90`: 2
- `sources/MYSTRAN/Source/UTIL/WRITE_MATRIX_1.f90`: 2
- `sources/MYSTRAN/Source/Interfaces/ALLOCATE_MODEL_STUF_Interface.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_ASET.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_ASET1.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_CORD.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_FORMOM.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_GRAV.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_GRID.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_MPC.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_PARVEC.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_PARVEC1.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_PLOAD2.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_PLOAD4.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_RBAR.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_RBE1.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_RBE2.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_RBE3.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_RFORCE.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_RSPLINE.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_SLOAD.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_SUPORT.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_TEMP.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_TEMPD.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_TEMPRP.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_USET.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-BD/BD_USET1.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-CC/CC_DISP.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-CC/CC_ELFO.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-CC/CC_GPFO.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-CC/CC_MPCF.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-CC/CC_OLOA.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-CC/CC_SPCF.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-CC/CC_STRE.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A-CC/CC_STRN.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1A/LOADB.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1B/OU4_PARTVEC_PROC.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_MPCS.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_OMITS.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_RIGELS.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_SUPORTS.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1B/USET_PROC.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1C/ELSAVE.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1C/GPWG.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1C/SUBCASE_PROC.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1D/RIGID_ELEM_PROC.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1D/SLOAD_PROC.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1E/KGG_SINGULARITY_PROC.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1E/SPARSE_MGG.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1E/SPARSE_PG.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1E/SPARSE_RMG.f90`: 1
- `sources/MYSTRAN/Source/LK1/L1U/R8FLD.f90`: 1
- `sources/MYSTRAN/Source/LK2/REDUCE_G_NM.f90`: 1
- `sources/MYSTRAN/Source/LK2/REDUCE_N_FS.f90`: 1
- `sources/MYSTRAN/Source/LK2/SOLVE_GMN.f90`: 1
- `sources/MYSTRAN/Source/LK2/SOLVE_GOA.f90`: 1
- `sources/MYSTRAN/Source/LK2/SOLVE_UO0.f90`: 1
- `sources/MYSTRAN/Source/LK4/EIG_SUMMARY.f90`: 1
- `sources/MYSTRAN/Source/LK6/SOLVE_DLR.f90`: 1
- `sources/MYSTRAN/Source/LK6/SOLVE_PHIZL1.f90`: 1
- `sources/MYSTRAN/Source/LK9/L91/WRITE_BAR.f90`: 1
- `sources/MYSTRAN/Source/LK9/L91/WRITE_ELEM_ENGR_FORCE.f90`: 1
- `sources/MYSTRAN/Source/LK9/L91/WRITE_ELEM_STRAINS.f90`: 1
- `sources/MYSTRAN/Source/LK9/L91/WRITE_ELEM_STRESSES.f90`: 1
- `sources/MYSTRAN/Source/LK9/L91/WRITE_FEMAP_ELFO_VECS.f90`: 1
- `sources/MYSTRAN/Source/LK9/L91/WRITE_FEMAP_STRE_VECS.f90`: 1
- `sources/MYSTRAN/Source/LK9/L91/WRITE_FEMAP_STRN_VECS.f90`: 1
- `sources/MYSTRAN/Source/LK9/L91/WRITE_PLY_STRAINS.f90`: 1
- `sources/MYSTRAN/Source/LK9/L91/WRITE_PLY_STRESSES.f90`: 1
- `sources/MYSTRAN/Source/LK9/L92/GP_FORCE_BALANCE_PROC.f90`: 1
- `sources/MYSTRAN/Source/LK9/L92/OFP1.f90`: 1
- `sources/MYSTRAN/Source/LK9/L92/OFP2.f90`: 1
- `sources/MYSTRAN/Source/LK9/L92/OFP3_ELFE_1D.f90`: 1
- `sources/MYSTRAN/Source/LK9/L92/OFP3_STRE_NO_PCOMP.f90`: 1
- `sources/MYSTRAN/Source/LK9/L92/OFP3_STRN_NO_PCOMP.f90`: 1
- `sources/MYSTRAN/Source/LK9/LINK9/LINK9S.f90`: 1
- `sources/MYSTRAN/Source/MAIN/GET_MYSTRAN_DIR.f90`: 1
- `sources/MYSTRAN/Source/MAIN/READ_CL.f90`: 1
- `sources/MYSTRAN/Source/MAIN/READ_INPUT_FILE_NAME.f90`: 1
- `sources/MYSTRAN/Source/Modules/BANDIT/BANDIT_MODULE.f`: 1
- `sources/MYSTRAN/Source/UTIL/ALLOCATE_MODEL_STUF.f90`: 1
- `sources/MYSTRAN/Source/UTIL/CLOSE_LIJFILES.f90`: 1
- `sources/MYSTRAN/Source/UTIL/FILE_CLOSE.f90`: 1
- `sources/MYSTRAN/Source/UTIL/FILE_OPEN.f90`: 1
- `sources/MYSTRAN/Source/UTIL/OURDAT.f90`: 1
- `sources/MYSTRAN/Source/UTIL/OURTIM.f90`: 1
- `sources/MYSTRAN/Source/UTIL/OUTA_HERE.f90`: 1
- `sources/MYSTRAN/Source/UTIL/OUTPUT2_RESULT_TABLE.f90`: 1
- `sources/MYSTRAN/Source/UTIL/OUTPUT2_WRITE_ELFORCE.f90`: 1
- `sources/MYSTRAN/Source/UTIL/OUTPUT2_WRITE_STRESS.f90`: 1
- `sources/MYSTRAN/Source/UTIL/READ_DOF_TABLES.f90`: 1
- `sources/MYSTRAN/Source/UTIL/READ_L1M.f90`: 1
- `sources/MYSTRAN/Source/UTIL/UNIX_TIME.f90`: 1
- `sources/MYSTRAN/Source/UTIL/WRITE_DOF_TABLES.f90`: 1
- `sources/MYSTRAN/Source/UTIL/WRITE_FILNAM.f90`: 1
- `sources/MYSTRAN/Source/UTIL/WRITE_L1M.f90`: 1
- `tools/build_assets/wasm_main.f90`: 1

## Patch List

| Marker | File | Explanation |
|---|---|---|
| `WEBMYSTRAN_PATCH_WASM_DESCRIPTOR_FIX_CALL` | `tools/build_assets/wasm_main.f90` | Call descriptor fix helper before entering MYSTRAN to stabilize allocatable descriptor ranks on wasm. |
| `WEBMYSTRAN_PATCH_NDEBUG` | `sources/MYSTRAN/CMakeLists.txt` | Remove -DNDEBUG in Release flags to avoid macro collision with Fortran symbol NDEBUG. |
| `WEBMYSTRAN_PATCH_NATIVE_MAIN_WRAPPER` | `sources/MYSTRAN/CMakeLists.txt` | Add a dedicated native wrapper main that calls MYSTRAN_ENTRY when MYSTRAN.f90 is converted to subroutine-only entry. |
| `WEBMYSTRAN_PATCH_NATIVE_DISABLE_FCHECK` | `sources/MYSTRAN/CMakeLists.txt` | Disable strict gfortran runtime argument/bounds checks in native smoke-reference builds to permit wasm-compatibility dummy argument patches. |
| `WEBMYSTRAN_PATCH_L1I_FORMATTED_WRITE` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Use formatted LINK1I writes in LINK0 to avoid flang-wasm unformatted runtime allocation failures. |
| `WEBMYSTRAN_PATCH_MYSTRAN_FILES_DEBUG_MARKERS` | `sources/MYSTRAN/Source/MAIN/MYSTRAN_FILES.f90` | Avoid FILE= INQUIRE runtime traps on wasm in MYSTRAN_FILES and remove stale debug markers. |
| `WEBMYSTRAN_PATCH_L1I_FORMATTED_READ` | `sources/MYSTRAN/Source/LK1/LINK1/LINK1.f90` | Use formatted LINK1I reads in LINK1 for consistency with wasm-safe LINK1I writes. |
| `WEBMYSTRAN_PATCH_LINK1_THERMAL_DEBUG` | `sources/MYSTRAN/Source/LK1/LINK1/LINK1.f90` | Normalize LINK1 thermal/load control flow after earlier wasm debug instrumentation while retaining wasm-safe file-close behavior. |
| `WEBMYSTRAN_PATCH_SPARSE_KGG_DEBUG_MARKERS` | `sources/MYSTRAN/Source/LK1/L1E/SPARSE_KGG.f90` | Remove stale SPARSE_KGG debug markers from earlier wasm troubleshooting runs. |
| `WEBMYSTRAN_PATCH_LOADB_AVOID_TRIM_RUNTIME` | `sources/MYSTRAN/Source/LK1/L1A/LOADB.f90` | Avoid TRIM(LINE) runtime abort in READ_BDF_LINE on wasm by using direct first-character checks for '$' comments. |
| `WEBMYSTRAN_PATCH_L1I_FORMATTED_FILE_SETUP` | `sources/MYSTRAN/Source/MAIN/MYSTRAN_FILES.f90` | Open LINK1I as formatted during file setup/cleanup so mode matches runtime LINK1I I/O. |
| `WEBMYSTRAN_PATCH_L1I_LIST_DIRECTED_WRITE` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_FORMOM.f90` | Use list-directed LINK1I writes in BD_FORMOM to avoid wasm runtime failures in unformatted record writes. |
| `WEBMYSTRAN_PATCH_L1I_LIST_DIRECTED_READ` | `sources/MYSTRAN/Source/LK1/L1D/FORCE_MOM_PROC.f90` | Use list-directed scalar LINK1I reads in FORCE_MOM_PROC to match formatted LINK1I writes and avoid descriptor-driven implied-do input. |
| `WEBMYSTRAN_PATCH_L1O_FORMATTED_OPEN` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Use formatted LINK1O read/write opens in LINK0 to avoid wasm runtime failures with character payload records. |
| `WEBMYSTRAN_PATCH_L1O_FORMATTED_FILE_SETUP` | `sources/MYSTRAN/Source/MAIN/MYSTRAN_FILES.f90` | Open LINK1O as formatted during file setup/cleanup so mode matches runtime LINK1O I/O. |
| `WEBMYSTRAN_PATCH_WASM_SKIP_GETENV` | `sources/MYSTRAN/Source/MAIN/GET_MYSTRAN_DIR.f90` | Avoid GETENV runtime descriptor crash on wasm by using current working directory for INI lookup. |
| `WEBMYSTRAN_PATCH_WASM_SKIP_GET_COMMAND_ARGUMENT` | `sources/MYSTRAN/Source/MAIN/READ_CL.f90` | Avoid GET_COMMAND_ARGUMENT runtime descriptor failures on wasm. |
| `WEBMYSTRAN_PATCH_WASM_FIXED_DECK_NAME` | `sources/MYSTRAN/Source/MAIN/READ_INPUT_FILE_NAME.f90` | Avoid command-line/stdin filename input on wasm by forcing a deterministic deck filename in the run directory. |
| `WEBMYSTRAN_PATCH_MAIN_ENTRY_WRAPPER` | `sources/MYSTRAN/Source/MAIN/MYSTRAN.f90` | Expose MYSTRAN entry as a callable subroutine and apply minimal wasm-safe startup bypasses. |
| `WEBMYSTRAN_PATCH_MAIN_EARLY_RETURN_AFTER_LINKS` | `sources/MYSTRAN/Source/MAIN/MYSTRAN.f90` | Remove legacy early-return shortcut so MYSTRAN writes full END timestamp and total CPU time to F06. |
| `WEBMYSTRAN_PATCH_MAIN_SKIP_LATE_CLOSE_PATH` | `sources/MYSTRAN/Source/MAIN/MYSTRAN.f90` | Stop after writing END/CPU lines to F06 so wasm avoids late close-path INQUIRE runtime traps. |
| `WEBMYSTRAN_PATCH_L1O_LIST_DIRECTED_SPC_WRITE` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_SPC.f90` | Use list-directed LINK1O writes for SPC records to avoid wasm runtime failures on character fields. |
| `WEBMYSTRAN_PATCH_BD_CORD_DEBUG_FIELD9` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_CORD.f90` | Remove stale BD_CORD debug field dumps from earlier wasm troubleshooting runs. |
| `WEBMYSTRAN_PATCH_BD_GRID_DEBUG_ROW` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_GRID.f90` | Remove stale BD_GRID debug row dumps from earlier wasm troubleshooting runs. |
| `WEBMYSTRAN_PATCH_GRID_PROC_DEBUG_CP_CD` | `sources/MYSTRAN/Source/LK1/L1B/GRID_PROC.f90` | Remove stale GRID_PROC debug dumps from earlier wasm troubleshooting runs. |
| `WEBMYSTRAN_PATCH_L1B_SKIP_DATASET_NAME_WRITES` | `sources/MYSTRAN/Source/LK1/L1B/GRID_PROC.f90` | Skip LINK1B dataset-name writes on wasm to avoid character-record runtime growth and no-space aborts. |
| `WEBMYSTRAN_PATCH_L1B_SKIP_SEQ_DATASET_NAME_WRITES` | `sources/MYSTRAN/Source/LK1/L1B/SEQ_PROC.f90` | Skip LINK1B sequence dataset-name writes on wasm to avoid character-record runtime growth and no-space aborts. |
| `WEBMYSTRAN_PATCH_L1B_FORMATTED_OPEN` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Use formatted LINK1B open mode in LINK0 to avoid wasm unformatted record-growth failures. |
| `WEBMYSTRAN_PATCH_LINK0_DISABLE_OP2_OPEN` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Route LINK0 OP2 writes to scratch so wasm avoids OP2 write-path memory/CPU spikes; runtime JS emits a tiny header artifact. |
| `WEBMYSTRAN_PATCH_L1B_FORMATTED_GRID_WRITES` | `sources/MYSTRAN/Source/LK1/L1B/GRID_PROC.f90` | Disable LINK1B GRID/COORD payload writes on wasm to prevent multi-GB intermediate file growth. |
| `WEBMYSTRAN_PATCH_L1B_FORMATTED_SEQ_WRITES` | `sources/MYSTRAN/Source/LK1/L1B/SEQ_PROC.f90` | Disable LINK1B sequence payload writes on wasm to prevent multi-GB intermediate file growth. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_OPEN_LINK0` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Open LINK1F in formatted mode in LINK0 to prevent wasm unformatted frame reallocation blowups on large rigid-element decks. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_OPEN_LINK1` | `sources/MYSTRAN/Source/LK1/LINK1/LINK1.f90` | Open LINK1F in formatted mode in LINK1 to match wasm LINK0 rigid-element serialization. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_FILE_SETUP` | `sources/MYSTRAN/Source/MAIN/MYSTRAN_FILES.f90` | Create/check LINK1F as formatted in MYSTRAN_FILES so unit reopen semantics stay consistent across wasm/native smoke runs. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_WRITE_BD_RBAR` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_RBAR.f90` | Write LINK1F RBAR records as list-directed formatted rows for wasm-safe rigid-element staging. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_WRITE_BD_RBE1` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_RBE1.f90` | Write LINK1F RBE1 records as list-directed formatted rows for wasm-safe rigid-element staging. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_WRITE_BD_RBE2` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_RBE2.f90` | Write LINK1F RBE2 records as list-directed formatted rows to avoid wasm file-frame growth and out-of-memory aborts. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_WRITE_BD_RBE3` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_RBE3.f90` | Write LINK1F RBE3 records as list-directed formatted rows for wasm-safe rigid-element staging. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_WRITE_BD_RSPLINE` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_RSPLINE.f90` | Write LINK1F RSPLINE records as list-directed formatted rows for wasm-safe rigid-element staging. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_READ_RIGID_ELEM_PROC` | `sources/MYSTRAN/Source/LK1/L1D/RIGID_ELEM_PROC.f90` | Read LINK1F rigid-element tags with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_READ_RBE2_PROC` | `sources/MYSTRAN/Source/LK1/L1D/RBE2_PROC.f90` | Read LINK1F RBE2 payload records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_READ_RBE3_PROC` | `sources/MYSTRAN/Source/LK1/L1D/RBE3_PROC.f90` | Read LINK1F RBE3 payload records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_READ_RSPLINE_PROC` | `sources/MYSTRAN/Source/LK1/L1D/RSPLINE_PROC.f90` | Read LINK1F RSPLINE payload records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1F_FORMATTED_READ_TSET_PROC_FOR_RIGELS` | `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_RIGELS.f90` | Read LINK1F rigid-element staging records with list-directed formatted I/O in TSET processing on wasm. |
| `WEBMYSTRAN_PATCH_L1J_L1P_FORMATTED_OPEN_LINK1` | `sources/MYSTRAN/Source/LK1/LINK1/LINK1.f90` | Open LINK1J/LINK1P in formatted mode in LINK1 so rigid/gravity staging avoids wasm unformatted frame growth. |
| `WEBMYSTRAN_PATCH_L1P_FORMATTED_OPEN_LINK0` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Open LINK1P in formatted mode in LINK0 to avoid wasm unformatted gravity-load staging growth. |
| `WEBMYSTRAN_PATCH_L1Q_FORMATTED_OPEN_LINK0` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Open LINK1Q in formatted mode in LINK0 for pressure-card staging and rereads without wasm unformatted record corruption. |
| `WEBMYSTRAN_PATCH_L1J_L1P_FORMATTED_FILE_SETUP` | `sources/MYSTRAN/Source/MAIN/MYSTRAN_FILES.f90` | Create/check LINK1J and LINK1P as formatted in MYSTRAN_FILES for wasm/native consistency. |
| `WEBMYSTRAN_PATCH_L1Q_FORMATTED_FILE_SETUP` | `sources/MYSTRAN/Source/MAIN/MYSTRAN_FILES.f90` | Create/check LINK1Q as formatted in MYSTRAN_FILES to match LINK0/pressure-processor formatted card staging. |
| `WEBMYSTRAN_PATCH_L1Q_FORMATTED_WRITE_BD_PLOAD2` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_PLOAD2.f90` | Write PLOAD2 card images to LINK1Q as formatted card lines for wasm-safe pressure staging. |
| `WEBMYSTRAN_PATCH_L1Q_FORMATTED_WRITE_BD_PLOAD4` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_PLOAD4.f90` | Write PLOAD4 card images to LINK1Q as formatted card lines for wasm-safe pressure staging. |
| `WEBMYSTRAN_PATCH_L1Q_FORMATTED_READ_PRESSURE_DATA_PROC` | `sources/MYSTRAN/Source/LK1/L1D/PRESSURE_DATA_PROC.f90` | Read LINK1Q staged card images as formatted lines and rewind STIME as list-directed in PRESSURE_DATA_PROC. |
| `WEBMYSTRAN_PATCH_L1P_FORMATTED_WRITE_BD_GRAV` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_GRAV.f90` | Write LINK1P gravity-load records as list-directed formatted rows for wasm-safe staging. |
| `WEBMYSTRAN_PATCH_L1P_FORMATTED_READ_GRAV_PROC` | `sources/MYSTRAN/Source/LK1/L1D/GRAV_PROC.f90` | Read LINK1P gravity-load records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1KNSTUVWX_FORMATTED_OPEN_LINK0` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Use formatted LINK1K/N/S/T/U/V/W/X opens in LINK0 to avoid wasm unformatted descriptor-write traps during LOADB. |
| `WEBMYSTRAN_PATCH_L1SUW_FORMATTED_READ_OPEN_LINK1` | `sources/MYSTRAN/Source/LK1/LINK1/LINK1.f90` | Use formatted LINK1S/U/W reads in LINK1 to match formatted LOADB writes on wasm. |
| `WEBMYSTRAN_PATCH_L1KNSTUVWX_FORMATTED_FILE_SETUP` | `sources/MYSTRAN/Source/MAIN/MYSTRAN_FILES.f90` | Create/check LINK1K/N/S/T/U/V/W/X in formatted mode in MYSTRAN_FILES for wasm-safe LOADB staging. |
| `WEBMYSTRAN_PATCH_L1N_FORMATTED_WRITE_BD_ASET` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_ASET.f90` | Write LINK1N ASET records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1N_FORMATTED_WRITE_BD_ASET1` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_ASET1.f90` | Write LINK1N ASET1 range records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1N_FORMATTED_READ_TSET_PROC_FOR_OMITS` | `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_OMITS.f90` | Read LINK1N ASET/OMIT records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1S_FORMATTED_WRITE_BD_MPC` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_MPC.f90` | Write LINK1S MPC logical records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1S_FORMATTED_READ_MPC_PROC` | `sources/MYSTRAN/Source/LK1/L1D/MPC_PROC.f90` | Read LINK1S MPC records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1S_FORMATTED_READ_TSET_PROC_FOR_MPCS` | `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_MPCS.f90` | Read LINK1S MPC records with list-directed formatted I/O in TSET processing on wasm. |
| `WEBMYSTRAN_PATCH_L1V_FORMATTED_WRITE_BD_PARVEC` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_PARVEC.f90` | Write LINK1V PARVEC records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1V_FORMATTED_WRITE_BD_PARVEC1` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_PARVEC1.f90` | Write LINK1V PARVEC1 records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1V_FORMATTED_READ_OU4_PARTVEC_PROC` | `sources/MYSTRAN/Source/LK1/L1B/OU4_PARTVEC_PROC.f90` | Read LINK1V PARVEC records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1U_FORMATTED_WRITE_BD_RFORCE` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_RFORCE.f90` | Write LINK1U RFORCE records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1U_FORMATTED_READ_RFORCE_PROC` | `sources/MYSTRAN/Source/LK1/L1D/RFORCE_PROC.f90` | Read LINK1U RFORCE records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1W_FORMATTED_WRITE_BD_SLOAD` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_SLOAD.f90` | Write LINK1W SLOAD records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1W_FORMATTED_READ_SLOAD_PROC` | `sources/MYSTRAN/Source/LK1/L1D/SLOAD_PROC.f90` | Read LINK1W SLOAD records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1T_FORMATTED_WRITE_BD_SUPORT` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_SUPORT.f90` | Write LINK1T SUPORT records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1T_FORMATTED_READ_TSET_PROC_FOR_SUPORTS` | `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_SUPORTS.f90` | Read LINK1T SUPORT records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1X_FORMATTED_WRITE_BD_USET` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_USET.f90` | Write LINK1X USET records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1X_FORMATTED_WRITE_BD_USET1` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_USET1.f90` | Write LINK1X USET1 records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1X_FORMATTED_READ_USET_PROC` | `sources/MYSTRAN/Source/LK1/L1B/USET_PROC.f90` | Read LINK1X USET records with list-directed formatted I/O on wasm. |
| `WEBMYSTRAN_PATCH_L1K_FORMATTED_WRITE_BD_TEMP` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_TEMP.f90` | Write LINK1K TEMP card images as formatted lines to avoid wasm unformatted CHARACTER descriptor traps. |
| `WEBMYSTRAN_PATCH_L1K_FORMATTED_WRITE_BD_TEMPD` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_TEMPD.f90` | Write LINK1K TEMPD card images as formatted lines to avoid wasm unformatted CHARACTER descriptor traps. |
| `WEBMYSTRAN_PATCH_L1K_FORMATTED_WRITE_BD_TEMPRP` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_TEMPRP.f90` | Write LINK1K TEMPRP card images as formatted lines to avoid wasm unformatted CHARACTER descriptor traps. |
| `WEBMYSTRAN_PATCH_L1K_FORMATTED_READ_TEMPERATURE_DATA_PROC` | `sources/MYSTRAN/Source/LK1/L1D/TEMPERATURE_DATA_PROC.f90` | Read LINK1K staged card/time records in formatted mode to match wasm-safe LINK1K writes. |
| `WEBMYSTRAN_PATCH_L1J_FORMATTED_WRITE_MPC_PROC` | `sources/MYSTRAN/Source/LK1/L1D/MPC_PROC.f90` | Write LINK1J MPC-derived RMG terms as list-directed formatted rows for wasm-safe staging. |
| `WEBMYSTRAN_PATCH_L1J_FORMATTED_WRITE_RBE2_PROC` | `sources/MYSTRAN/Source/LK1/L1D/RBE2_PROC.f90` | Write LINK1J RBE2-derived RMG terms as list-directed formatted rows for wasm-safe staging. |
| `WEBMYSTRAN_PATCH_L1J_FORMATTED_WRITE_RBE3_PROC` | `sources/MYSTRAN/Source/LK1/L1D/RBE3_PROC.f90` | Write LINK1J RBE3-derived RMG terms as list-directed formatted rows for wasm-safe staging. |
| `WEBMYSTRAN_PATCH_L1J_FORMATTED_WRITE_RSPLINE_PROC` | `sources/MYSTRAN/Source/LK1/L1D/RSPLINE_PROC.f90` | Write LINK1J RSPLINE-derived RMG terms as list-directed formatted rows for wasm-safe staging. |
| `WEBMYSTRAN_PATCH_L1J_FORMATTED_IO_SPARSE_RMG` | `sources/MYSTRAN/Source/LK1/L1E/SPARSE_RMG.f90` | Use formatted list-directed LINK1J reads/writes in SPARSE_RMG to avoid wasm unformatted file-frame reallocation failures. |
| `WEBMYSTRAN_PATCH_R8FLD_LIST_DIRECTED_READ` | `sources/MYSTRAN/Source/LK1/L1U/R8FLD.f90` | Use list-directed internal real parsing in R8FLD to avoid flang-wasm formatted internal-read runtime crashes. |
| `WEBMYSTRAN_PATCH_L1O_LIST_DIRECTED_SPC1_WRITE` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_SPC1.f90` | Use list-directed LINK1O writes for SPC1 records to avoid wasm runtime failures on character fields. |
| `WEBMYSTRAN_PATCH_L1O_LIST_DIRECTED_ENF_WRITE` | `sources/MYSTRAN/Source/LK1/LINK1/WRITE_ENF_TO_L1O.f90` | Use list-directed LINK1O writes for enforced displacement records. |
| `WEBMYSTRAN_PATCH_L1O_LIST_DIRECTED_READ` | `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_SPCS.f90` | Use list-directed LINK1O reads in TSET_PROC_FOR_SPCS to match formatted LINK1O output. |
| `WEBMYSTRAN_PATCH_CC_OUTPUT_FLAGS_NO_TRIM_DISP` | `sources/MYSTRAN/Source/LK1/L1A-CC/CC_DISP.f90` | Avoid TRIM() on 1-char output flags in case-control DISP parsing on wasm. |
| `WEBMYSTRAN_PATCH_CC_OUTPUT_FLAGS_NO_TRIM_ELFO` | `sources/MYSTRAN/Source/LK1/L1A-CC/CC_ELFO.f90` | Avoid TRIM() on 1-char output flags in case-control ELFO parsing on wasm. |
| `WEBMYSTRAN_PATCH_CC_OUTPUT_FLAGS_NO_TRIM_GPFO` | `sources/MYSTRAN/Source/LK1/L1A-CC/CC_GPFO.f90` | Avoid TRIM() on 1-char output flags in case-control GPFO parsing on wasm. |
| `WEBMYSTRAN_PATCH_CC_OUTPUT_FLAGS_NO_TRIM_MPCF` | `sources/MYSTRAN/Source/LK1/L1A-CC/CC_MPCF.f90` | Avoid TRIM() on 1-char output flags in case-control MPCF parsing on wasm. |
| `WEBMYSTRAN_PATCH_CC_OUTPUT_FLAGS_NO_TRIM_OLOA` | `sources/MYSTRAN/Source/LK1/L1A-CC/CC_OLOA.f90` | Avoid TRIM() on 1-char output flags in case-control OLOA parsing on wasm. |
| `WEBMYSTRAN_PATCH_CC_OUTPUT_FLAGS_NO_TRIM_SPCF` | `sources/MYSTRAN/Source/LK1/L1A-CC/CC_SPCF.f90` | Avoid TRIM() on 1-char output flags in case-control SPCF parsing on wasm. |
| `WEBMYSTRAN_PATCH_CC_OUTPUT_FLAGS_NO_TRIM_STRE` | `sources/MYSTRAN/Source/LK1/L1A-CC/CC_STRE.f90` | Avoid TRIM() on 1-char output flags in case-control STRE parsing on wasm. |
| `WEBMYSTRAN_PATCH_CC_OUTPUT_FLAGS_NO_TRIM_STRN` | `sources/MYSTRAN/Source/LK1/L1A-CC/CC_STRN.f90` | Avoid TRIM() on 1-char output flags in case-control STRN parsing on wasm. |
| `WEBMYSTRAN_PATCH_EIG_SUMMARY_NO_TRIM_LAP_MAT_TYPE` | `sources/MYSTRAN/Source/LK4/EIG_SUMMARY.f90` | Avoid TRIM() descriptor faults in EIG_SUMMARY by writing EIG_LAP_MAT_TYPE directly and using UNIT INQUIRE for ANS. |
| `WEBMYSTRAN_PATCH_L1M_FORMATTED_WRITE` | `sources/MYSTRAN/Source/UTIL/WRITE_L1M.f90` | Use formatted/list-directed LINK1M writes to avoid wasm runtime allocation issues in unformatted I/O. |
| `WEBMYSTRAN_PATCH_L1M_FORMATTED_READ` | `sources/MYSTRAN/Source/UTIL/READ_L1M.f90` | Use formatted/list-directed LINK1M reads to match wasm-safe formatted LINK1M output. |
| `WEBMYSTRAN_PATCH_WRITE_MATRIX_1_FORMATTED_IO` | `sources/MYSTRAN/Source/UTIL/WRITE_MATRIX_1.f90` | Use formatted/list-directed sparse matrix writes in WRITE_MATRIX_1 to avoid wasm unformatted record growth failures. |
| `WEBMYSTRAN_PATCH_READ_MATRIX_1_FORMATTED_IO` | `sources/MYSTRAN/Source/UTIL/READ_MATRIX_1.f90` | Use formatted/list-directed sparse matrix reads in READ_MATRIX_1 to match wasm-safe WRITE_MATRIX_1 output. |
| `WEBMYSTRAN_PATCH_READ_MATRIX_2_FORMATTED_IO` | `sources/MYSTRAN/Source/UTIL/READ_MATRIX_2.f90` | Use formatted/list-directed sparse matrix reads in READ_MATRIX_2 to match wasm-safe scratch-matrix output. |
| `WEBMYSTRAN_PATCH_L1E_FORMATTED_SPARSE_PG_IO` | `sources/MYSTRAN/Source/LK1/L1E/SPARSE_PG.f90` | Use formatted/list-directed LINK1E sparse PG matrix I/O to avoid wasm unformatted record growth failures. |
| `WEBMYSTRAN_PATCH_L1L_FORMATTED_SPARSE_KGG_IO` | `sources/MYSTRAN/Source/LK1/L1E/SPARSE_KGG.f90` | Use formatted/list-directed LINK1L sparse KGG matrix I/O to avoid wasm unformatted record growth failures. |
| `WEBMYSTRAN_PATCH_L1R_FORMATTED_SPARSE_MGG_IO` | `sources/MYSTRAN/Source/LK1/L1E/SPARSE_MGG.f90` | Use formatted/list-directed LINK1R sparse MGG matrix I/O to avoid wasm unformatted record growth failures. |
| `WEBMYSTRAN_PATCH_L5_FORMATTED_IO` | `sources/MYSTRAN/Source/LK5/LINK5.f90` | Use formatted/list-directed LINK5A/LINK5B displacement vector I/O to avoid wasm unformatted scalar runtime failures. |
| `WEBMYSTRAN_PATCH_L2F_FORMATTED_WRITE_SOLVE_UO0` | `sources/MYSTRAN/Source/LK2/SOLVE_UO0.f90` | Use formatted L2F writes in SOLVE_UO0 to avoid flang-wasm unformatted runtime corruption in GUYAN reduction paths. |
| `WEBMYSTRAN_PATCH_L2F_FORMATTED_READ_LINK5` | `sources/MYSTRAN/Source/LK5/LINK5.f90` | Use formatted L2F reads in LINK5 to match wasm-safe SOLVE_UO0 formatted UO0 writes. |
| `WEBMYSTRAN_PATCH_L3A_FORMATTED_WRITE` | `sources/MYSTRAN/Source/LK3/LINK3.f90` | Use formatted/list-directed LINK3A solved L-set vector writes to avoid wasm unformatted scalar write frame growth. |
| `WEBMYSTRAN_PATCH_L3A_FORMATTED_READ` | `sources/MYSTRAN/Source/LK5/LINK5.f90` | Use formatted/list-directed LINK3A solved L-set vector reads to match formatted LINK3/LINK4/LINK6 writes. |
| `WEBMYSTRAN_PATCH_L3A_FORMATTED_IO_LINK4` | `sources/MYSTRAN/Source/LK4/LINK4.f90` | Use formatted/list-directed LINK3A writes in LINK4 to prevent wasm unformatted no-space aborts in eigenvector dumps. |
| `WEBMYSTRAN_PATCH_L3A_FORMATTED_IO_LINK6` | `sources/MYSTRAN/Source/LK6/LINK6.f90` | Use formatted/list-directed LINK3A read/write paths in LINK6 to match wasm-safe LINK3/LINK4/LINK5 behavior. |
| `WEBMYSTRAN_PATCH_L3A_FORMATTED_IO_RESTART_PRINT` | `sources/MYSTRAN/Source/UTIL/PRT_MATS_ON_RESTART.f90` | Read LINK3A displacement vectors in formatted/list-directed mode in restart matrix printer for compatibility with formatted LINK3A writes. |
| `WEBMYSTRAN_PATCH_L5B_LIST_DIRECTED_WRITE` | `sources/MYSTRAN/Source/LK5/EXPAND_PHIXA_TO_PHIXG.f90` | Write expanded PHIXG columns to LINK5B using list-directed formatted I/O for wasm runtime compatibility. |
| `WEBMYSTRAN_PATCH_L1D_FORMATTED_OPEN` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Use formatted LINK1D I/O in LINK0 so LINK9S can read model metadata via list-directed formatted records on wasm. |
| `WEBMYSTRAN_PATCH_LINK0_L1H_READ_ONLY_FOR_YS_ARRAY` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Avoid unformatted READWRITE on L1H in LINK0; flang-wasm can trap with DescriptorIO direction errors on this path. |
| `WEBMYSTRAN_PATCH_YS_ARRAY_REOPEN_L1H_WRITE` | `sources/MYSTRAN/Source/LK1/L1D/YS_ARRAY.f90` | Reopen L1H for write after read pass in YS_ARRAY to avoid wasm unformatted read/write direction traps and huge temporary files. |
| `WEBMYSTRAN_PATCH_L1H_FORMATTED_OPEN_LINK0` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Use formatted L1H opens in LINK0 so enforced-displacement records avoid wasm unformatted descriptor I/O corruption. |
| `WEBMYSTRAN_PATCH_L1H_FORMATTED_FILE_SETUP` | `sources/MYSTRAN/Source/MAIN/MYSTRAN_FILES.f90` | Create/check LINK1H as formatted in MYSTRAN_FILES to match wasm-safe L1H formatted I/O flow. |
| `WEBMYSTRAN_PATCH_L1H_LIST_DIRECTED_WRITE_TSET` | `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_SPCS.f90` | Write L1H enforced-displacement triples as list-directed formatted rows in TSET_PROC_FOR_SPCS for wasm stability. |
| `WEBMYSTRAN_PATCH_L1H_LIST_DIRECTED_IO_YS_ARRAY` | `sources/MYSTRAN/Source/LK1/L1D/YS_ARRAY.f90` | Read/write L1H with list-directed formatted I/O in YS_ARRAY to avoid unformatted descriptor corruption on wasm. |
| `WEBMYSTRAN_PATCH_L1H_FORMATTED_READ_LINK5` | `sources/MYSTRAN/Source/LK5/LINK5.f90` | Read L1H in formatted/list-directed mode in LINK5 to match wasm-safe YS_ARRAY formatted output. |
| `WEBMYSTRAN_PATCH_L1H_FORMATTED_READ_REDUCE_N_FS` | `sources/MYSTRAN/Source/LK2/REDUCE_N_FS.f90` | Read L1H in formatted/list-directed mode in REDUCE_N_FS to match wasm-safe YS_ARRAY formatted output. |
| `WEBMYSTRAN_PATCH_L1H_FORMATTED_READ_RESTART_PRINT` | `sources/MYSTRAN/Source/UTIL/PRT_MATS_ON_RESTART.f90` | Read L1H in formatted/list-directed mode in restart matrix printer to match wasm-safe YS_ARRAY formatted output. |
| `WEBMYSTRAN_PATCH_L1G_FORMATTED_OPEN` | `sources/MYSTRAN/Source/LK1/LINK1/LINK1.f90` | Use formatted LINK1G I/O in LINK1 so LINK9S can read element metadata via list-directed formatted records on wasm. |
| `WEBMYSTRAN_PATCH_L1C_FORMATTED_OPEN_LINK0` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Use formatted LINK1C open mode in LINK0 to avoid wasm unformatted DOF-table file growth failures. |
| `WEBMYSTRAN_PATCH_L1C_FORMATTED_OPEN_REDUCE_G_NM` | `sources/MYSTRAN/Source/LK2/REDUCE_G_NM.f90` | Use formatted LINK1C open mode in REDUCE_G_NM to avoid wasm unformatted DOF-table growth failures. |
| `WEBMYSTRAN_PATCH_L1C_FORMATTED_FILE_SETUP` | `sources/MYSTRAN/Source/MAIN/MYSTRAN_FILES.f90` | Create/check LINK1C as formatted in MYSTRAN_FILES so reopen modes align with formatted DOF-table I/O on wasm. |
| `WEBMYSTRAN_PATCH_WRITE_DOF_TABLES_FORMATTED_IO` | `sources/MYSTRAN/Source/UTIL/WRITE_DOF_TABLES.f90` | Write LINK1C DOF tables in formatted/list-directed mode to avoid wasm unformatted record growth failures. |
| `WEBMYSTRAN_PATCH_READ_DOF_TABLES_FORMATTED_IO` | `sources/MYSTRAN/Source/UTIL/READ_DOF_TABLES.f90` | Read LINK1C DOF tables in formatted/list-directed mode to match wasm-safe formatted writes. |
| `WEBMYSTRAN_PATCH_L1D_LIST_DIRECTED_IO` | `sources/MYSTRAN/Source/LK1/L1C/SUBCASE_PROC.f90` | Write LINK1D subcase datasets using list-directed formatted I/O for wasm runtime stability. |
| `WEBMYSTRAN_PATCH_L1G_LIST_DIRECTED_IO` | `sources/MYSTRAN/Source/LK1/L1C/ELSAVE.f90` | Write LINK1G element/property datasets using list-directed formatted I/O for wasm runtime stability. |
| `WEBMYSTRAN_PATCH_L1K_FORMATTED_FINAL_DATA` | `sources/MYSTRAN/Source/LK1/L1D/TEMPERATURE_DATA_PROC.f90` | Write final processed LINK1K temperature datasets as list-directed formatted records for LINK9S on wasm. |
| `WEBMYSTRAN_PATCH_L1Q_FORMATTED_FINAL_DATA` | `sources/MYSTRAN/Source/LK1/L1D/PRESSURE_DATA_PROC.f90` | Write final processed LINK1Q pressure datasets as list-directed formatted records for LINK9S on wasm. |
| `WEBMYSTRAN_PATCH_LINK9S_FORMATTED_MODELDATA_READ` | `sources/MYSTRAN/Source/LK9/LINK9/LINK9S.f90` | Read LINK1D/LINK1G/LINK1K/LINK1Q with list-directed formatted I/O in LINK9S to avoid wasm unformatted runtime corruption. |
| `WEBMYSTRAN_PATCH_LINK9_L5_FORMATTED_READ` | `sources/MYSTRAN/Source/LK9/LINK9/LINK9.f90` | Read LINK5A/LINK5B displacement vectors using list-directed formatted I/O in LINK9. |
| `WEBMYSTRAN_PATCH_LINK9_UNIT_INQUIRE_ANS_PCH` | `sources/MYSTRAN/Source/LK9/LINK9/LINK9.f90` | Use UNIT-based INQUIRE for ANS/PCH in LINK9 to avoid wasm FILE= string-descriptor traps before LINK9S. |
| `WEBMYSTRAN_PATCH_LINK9_EARLY_STAGE_TRACE` | `sources/MYSTRAN/Source/LK9/LINK9/LINK9.f90` | Remove temporary LINK9 stage trace markers used during wasm crash triage. |
| `WEBMYSTRAN_PATCH_LINK9_FORMATTED_STIME_REWIND_READS` | `sources/MYSTRAN/Source/LK9/LINK9/LINK9.f90` | Use list-directed STIME reads with NTERM guards in LINK9 and avoid INQUIRE calls that trap in wasm runtime. |
| `WEBMYSTRAN_PATCH_LINK9_DISABLE_OP2_OUTPUT_FLAGS` | `sources/MYSTRAN/Source/LK9/LINK9/LINK9.f90` | Disable LINK9 OP2 result output flags on wasm and keep PRTF06 output flag wiring consistent. |
| `WEBMYSTRAN_PATCH_LINK9_DISABLE_PCH_OUTPUT_FLAGS` | `sources/MYSTRAN/Source/LK9/LINK9/LINK9.f90` | Disable LINK9 PCH output path in wasm builds to bypass unstable PCH open/write runtime traps. |
| `WEBMYSTRAN_PATCH_LINK9_F25_UNIT_INQUIRE_CLOSE` | `sources/MYSTRAN/Source/LK9/LINK9/LINK9.f90` | Skip late F25 close probe in LINK9 on wasm to avoid shutdown-time runtime faults. |
| `WEBMYSTRAN_PATCH_OFP1_DISABLE_OP2_WRITES` | `sources/MYSTRAN/Source/LK9/L92/OFP1.f90` | Disable OFP1 OP2 writes for acceleration/displacement/applied-load outputs on wasm. |
| `WEBMYSTRAN_PATCH_OFP2_DISABLE_OP2_WRITES` | `sources/MYSTRAN/Source/LK9/L92/OFP2.f90` | Disable OFP2 OP2 writes for SPC/MPC force outputs on wasm. |
| `WEBMYSTRAN_PATCH_LINK9_SKIP_OFP3` | `sources/MYSTRAN/Source/LK9/LINK9/LINK9.f90` | Restore OFP3 processing and keep SINGLE ELEMENT ARRAYS deallocation aligned with native behavior. |
| `WEBMYSTRAN_PATCH_GP_FORCE_BALANCE_TITLE_SCALAR_WRITE` | `sources/MYSTRAN/Source/LK9/L92/GP_FORCE_BALANCE_PROC.f90` | Write scalar TITLEI instead of TITLE array in GP force balance header to avoid descriptor-based character I/O on wasm. |
| `WEBMYSTRAN_PATCH_OFP3_RESTORE_OUTPUT_GUARDS` | `sources/MYSTRAN/Source/LK9/L92/OFP3.f90` | Restore OFP3 output-request guards so wasm only runs required element output paths for the active subcase. |
| `WEBMYSTRAN_PATCH_WRITE_ELEM_STRESSES_DISABLE_OP2` | `sources/MYSTRAN/Source/LK9/L91/WRITE_ELEM_STRESSES.f90` | Disable OP2 emission in WRITE_ELEM_STRESSES on wasm to avoid runtime OES/OEF table write allocation failures. |
| `WEBMYSTRAN_PATCH_WRITE_ELEM_STRAINS_DISABLE_OP2` | `sources/MYSTRAN/Source/LK9/L91/WRITE_ELEM_STRAINS.f90` | Disable OP2 emission in WRITE_ELEM_STRAINS on wasm to avoid runtime OES/OST table write allocation failures. |
| `WEBMYSTRAN_PATCH_WRITE_ELEM_ENGR_FORCE_DISABLE_OP2` | `sources/MYSTRAN/Source/LK9/L91/WRITE_ELEM_ENGR_FORCE.f90` | Disable OP2 emission in WRITE_ELEM_ENGR_FORCE on wasm to avoid runtime OEF table state corruption. |
| `WEBMYSTRAN_PATCH_WRITE_PLY_STRESSES_DISABLE_OP2_PAYLOAD` | `sources/MYSTRAN/Source/LK9/L91/WRITE_PLY_STRESSES.f90` | Disable WRITE_PLY_STRESSES OP2 table payload writes on wasm to avoid huge single-record allocations and runtime OOM. |
| `WEBMYSTRAN_PATCH_WRITE_PLY_STRAINS_DISABLE_OP2_PAYLOAD` | `sources/MYSTRAN/Source/LK9/L91/WRITE_PLY_STRAINS.f90` | Disable WRITE_PLY_STRAINS OP2 table payload writes on wasm to avoid huge single-record allocations and runtime OOM. |
| `WEBMYSTRAN_PATCH_WRITE_BAR_OP2_CHUNKED_WRITES` | `sources/MYSTRAN/Source/LK9/L91/WRITE_BAR.f90` | Disable WRITE_BAR OP2 payload writes on wasm builds to avoid oversized/corrupted OP2 output records. |
| `WEBMYSTRAN_PATCH_OUTPUT2_WRITE_ELFORCE_SKIP_TABLE_HEADERS` | `sources/MYSTRAN/Source/UTIL/OUTPUT2_WRITE_ELFORCE.f90` | Skip OP2 OEF table-header state transitions on wasm when payload writes are disabled. |
| `WEBMYSTRAN_PATCH_OUTPUT2_WRITE_STRESS_SKIP_TABLE3` | `sources/MYSTRAN/Source/UTIL/OUTPUT2_WRITE_STRESS.f90` | Skip OP2 stress/strain table-3 writes on wasm to avoid Fortran runtime file-frame reallocation overflows. |
| `WEBMYSTRAN_PATCH_WRITE_FEMAP_STRE_VECS_NO_TRIM_WARNINGS` | `sources/MYSTRAN/Source/LK9/L91/WRITE_FEMAP_STRE_VECS.f90` | Avoid TRIM() on element/subroutine warning strings in WRITE_FEMAP_STRE_VECS to prevent wasm CHARACTER descriptor crashes. |
| `WEBMYSTRAN_PATCH_WRITE_FEMAP_STRN_VECS_NO_TRIM_WARNINGS` | `sources/MYSTRAN/Source/LK9/L91/WRITE_FEMAP_STRN_VECS.f90` | Avoid TRIM() on element/subroutine warning strings in WRITE_FEMAP_STRN_VECS to prevent wasm CHARACTER descriptor crashes. |
| `WEBMYSTRAN_PATCH_WRITE_FEMAP_ELFO_VECS_NO_TRIM_WARNINGS` | `sources/MYSTRAN/Source/LK9/L91/WRITE_FEMAP_ELFO_VECS.f90` | Avoid TRIM() on element/subroutine warning strings in WRITE_FEMAP_ELFO_VECS to prevent wasm CHARACTER descriptor crashes. |
| `WEBMYSTRAN_PATCH_OURTIM_NO_VALUES_DESCRIPTOR` | `sources/MYSTRAN/Source/UTIL/OURTIM.f90` | Use DATE_AND_TIME string outputs (no VALUES array) so wasm keeps real wall-clock timestamps. |
| `WEBMYSTRAN_PATCH_OURDAT_NO_VALUES_DESCRIPTOR` | `sources/MYSTRAN/Source/UTIL/OURDAT.f90` | Use DATE_AND_TIME string outputs (no VALUES array) so wasm keeps real wall-clock dates. |
| `WEBMYSTRAN_PATCH_UNIX_TIME_NO_VALUES_DESCRIPTOR` | `sources/MYSTRAN/Source/UTIL/UNIX_TIME.f90` | Use DATE_AND_TIME string outputs in UNIX_TIME so wasm keeps real wall-clock timestamps. |
| `WEBMYSTRAN_PATCH_OUTPUT2_RESULT_TABLE_NO_VALUES_DESCRIPTOR` | `sources/MYSTRAN/Source/UTIL/OUTPUT2_RESULT_TABLE.f90` | Use DATE_AND_TIME string outputs in OP2 header date generation (no VALUES descriptor). |
| `WEBMYSTRAN_PATCH_GPWG_SKIP_OP2_TABLE3_WRITE` | `sources/MYSTRAN/Source/LK1/L1C/GPWG.f90` | Skip OPGWG OP2 table-3 write on wasm to avoid >1GB Fortran runtime I/O buffer growth. |
| `WEBMYSTRAN_PATCH_FORCE_MOM_PROC_NO_STATUS_SCRATCH` | `sources/MYSTRAN/Source/LK1/L1D/FORCE_MOM_PROC.f90` | Use explicit scratch filename with STATUS='REPLACE' and formatted scratch I/O for wasm runtime compatibility. |
| `WEBMYSTRAN_PATCH_GRAV_PROC_NO_STATUS_SCRATCH` | `sources/MYSTRAN/Source/LK1/L1D/GRAV_PROC.f90` | Use explicit formatted scratch filename I/O in GRAV_PROC for wasm runtime compatibility. |
| `WEBMYSTRAN_PATCH_RFORCE_PROC_NO_STATUS_SCRATCH` | `sources/MYSTRAN/Source/LK1/L1D/RFORCE_PROC.f90` | Use explicit formatted scratch filename I/O in RFORCE_PROC for wasm runtime compatibility. |
| `WEBMYSTRAN_PATCH_ESP_NO_STATUS_SCRATCH` | `sources/MYSTRAN/Source/LK1/L1E/ESP.f90` | Skip ESP STF3 scratch-file roundtrip on wasm to avoid derived-type unformatted I/O corruption. |
| `WEBMYSTRAN_PATCH_ESP_EXPLICIT_STF3_DEBUG_IO` | `sources/MYSTRAN/Source/LK1/L1E/ESP.f90` | Avoid derived-type formatted I/O for STF3 debug rows in ESP; flang-wasm can abort with DescriptorIO bad type code. |
| `WEBMYSTRAN_PATCH_SOLVE_GOA_NO_STATUS_SCRATCH` | `sources/MYSTRAN/Source/LK2/SOLVE_GOA.f90` | Use explicit formatted scratch matrix I/O in SOLVE_GOA to match wasm-safe READ_MATRIX_1/READ_MATRIX_2 behavior. |
| `WEBMYSTRAN_PATCH_SOLVE_GMN_NO_STATUS_SCRATCH` | `sources/MYSTRAN/Source/LK2/SOLVE_GMN.f90` | Use explicit formatted scratch matrix I/O in SOLVE_GMN to match wasm-safe READ_MATRIX_1/READ_MATRIX_2 behavior. |
| `WEBMYSTRAN_PATCH_SOLVE_DLR_NO_STATUS_SCRATCH` | `sources/MYSTRAN/Source/LK6/SOLVE_DLR.f90` | Use explicit formatted scratch matrix I/O in SOLVE_DLR to match wasm-safe READ_MATRIX_2 behavior. |
| `WEBMYSTRAN_PATCH_SOLVE_PHIZL1_NO_STATUS_SCRATCH` | `sources/MYSTRAN/Source/LK6/SOLVE_PHIZL1.f90` | Use explicit formatted scratch matrix I/O in SOLVE_PHIZL1 to match wasm-safe READ_MATRIX_2 behavior. |
| `WEBMYSTRAN_PATCH_BANDIT_INTARRAY_RENAME` | `sources/MYSTRAN/Source/Modules/BANDIT/BANDIT_MODULE.f` | Rename BANDIT dummy arg INT in BRIGIT/NASNUM to avoid flang-wasm ambiguity with intrinsic INT(). |
| `WEBMYSTRAN_PATCH_FILE_OPEN_SKIP_WRT_LOG_INQUIRE` | `sources/MYSTRAN/Source/UTIL/FILE_OPEN.f90` | Harden FILE_OPEN for wasm while removing stale debug logging from earlier troubleshooting runs. |
| `WEBMYSTRAN_PATCH_FILE_CLOSE_SKIP_INQUIRE_AND_SOFT_FAIL` | `sources/MYSTRAN/Source/UTIL/FILE_CLOSE.f90` | Avoid FILE_CLOSE INQUIRE calls on wasm and return on close IOSTAT errors instead of hard STOP. |
| `WEBMYSTRAN_PATCH_CLOSE_LIJFILES_NO_INQUIRE_CLOSE_PATHS` | `sources/MYSTRAN/Source/UTIL/CLOSE_LIJFILES.f90` | Use direct FILE_CLOSE calls in CLOSE_LIJFILES to avoid wasm runtime traps in FILE= INQUIRE with LOGICAL outputs. |
| `WEBMYSTRAN_PATCH_OUTA_HERE_DEBUG_RETURN` | `sources/MYSTRAN/Source/UTIL/OUTA_HERE.f90` | Normalize OUTA_HERE termination flow after wasm debug instrumentation. |
| `WEBMYSTRAN_PATCH_WRITE_FILNAM_NO_TRIM_DESCRIPTOR` | `sources/MYSTRAN/Source/UTIL/WRITE_FILNAM.f90` | Avoid TRIM() runtime descriptor failures in WRITE_FILNAM by computing a safe non-blank filename length manually. |
| `WEBMYSTRAN_PATCH_RESTORE_L1O_UNFORMATTED_OPEN_LINK0` | `sources/MYSTRAN/Source/LK1/LINK1/LINK0.f90` | Disabled: restoring L1O to unformatted currently regresses wasm stability in BD_SPC/BD_SPC1. |
| `WEBMYSTRAN_PATCH_RESTORE_L1O_UNFORMATTED_FILE_SETUP` | `sources/MYSTRAN/Source/MAIN/MYSTRAN_FILES.f90` | Disabled: restoring L1O setup to unformatted currently regresses wasm stability in BD_SPC/BD_SPC1. |
| `WEBMYSTRAN_PATCH_RESTORE_BD_SPC_L1O_BINARY_WRITE` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_SPC.f90` | Disabled: restoring BD_SPC binary writes currently regresses wasm stability in BD_SPC/BD_SPC1. |
| `WEBMYSTRAN_PATCH_RESTORE_BD_SPC1_L1O_BINARY_WRITE` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_SPC1.f90` | Disabled: restoring BD_SPC1 binary writes currently regresses wasm stability in BD_SPC/BD_SPC1. |
| `WEBMYSTRAN_PATCH_RESTORE_WRITE_ENF_L1O_BINARY_WRITE` | `sources/MYSTRAN/Source/LK1/LINK1/WRITE_ENF_TO_L1O.f90` | Disabled: restoring WRITE_ENF_TO_L1O binary output currently regresses wasm stability in BD_SPC/BD_SPC1. |
| `WEBMYSTRAN_PATCH_RESTORE_TSET_PROC_FOR_SPCS_L1O_BINARY_READ` | `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_SPCS.f90` | Disabled: restoring TSET_PROC_FOR_SPCS binary reads currently regresses wasm stability in BD_SPC/BD_SPC1. |
| `WEBMYSTRAN_PATCH_L1O_DOFSET_INT_BD_SPC` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_SPC.f90` | Disabled: numeric DOFSET encoding for L1O is only relevant for unformatted L1O experiment. |
| `WEBMYSTRAN_PATCH_L1O_DOFSET_INT_BD_SPC1` | `sources/MYSTRAN/Source/LK1/L1A-BD/BD_SPC1.f90` | Disabled: numeric DOFSET encoding for L1O is only relevant for unformatted L1O experiment. |
| `WEBMYSTRAN_PATCH_L1O_DOFSET_INT_TSET_READ` | `sources/MYSTRAN/Source/LK1/L1B/TSET_PROC_FOR_SPCS.f90` | Disabled: numeric DOFSET decoding for L1O is only relevant for unformatted L1O experiment. |
| `WEBMYSTRAN_PATCH_RESTORE_READ_MATRIX_1_BINARY_IO` | `sources/MYSTRAN/Source/UTIL/READ_MATRIX_1.f90` | Restore READ_MATRIX_1 to native unformatted matrix I/O for performance and binary parity with native builds. |
| `WEBMYSTRAN_PATCH_RESTORE_READ_MATRIX_2_BINARY_IO` | `sources/MYSTRAN/Source/UTIL/READ_MATRIX_2.f90` | Restore READ_MATRIX_2 to native unformatted matrix I/O for performance and binary parity with native builds. |
| `WEBMYSTRAN_PATCH_RESTORE_WRITE_MATRIX_1_BINARY_IO` | `sources/MYSTRAN/Source/UTIL/WRITE_MATRIX_1.f90` | Restore WRITE_MATRIX_1 to native unformatted matrix I/O for performance and binary parity with native builds. |
| `WEBMYSTRAN_PATCH_RESTORE_L3A_BINARY_IO_LINK3` | `sources/MYSTRAN/Source/LK3/LINK3.f90` | Restore LINK3 L3A writes to native unformatted records for speed and parity. |
| `WEBMYSTRAN_PATCH_RESTORE_L3A_BINARY_IO_LINK4` | `sources/MYSTRAN/Source/LK4/LINK4.f90` | Restore LINK4 L3A writes to native unformatted records for speed and parity. |
| `WEBMYSTRAN_PATCH_RESTORE_L3A_L5_BINARY_IO_LINK5` | `sources/MYSTRAN/Source/LK5/LINK5.f90` | Restore LINK5 L3A/L5A/L5B binary I/O paths to native unformatted mode for performance parity. |
| `WEBMYSTRAN_PATCH_RESTORE_L5B_BINARY_WRITE` | `sources/MYSTRAN/Source/LK5/EXPAND_PHIXA_TO_PHIXG.f90` | Restore EXPAND_PHIXA_TO_PHIXG L5B writes to native unformatted mode for parity. |
| `WEBMYSTRAN_PATCH_RESTORE_L3A_BINARY_IO_LINK6` | `sources/MYSTRAN/Source/LK6/LINK6.f90` | Restore LINK6 L3A read/write to native unformatted mode for parity and speed. |
| `WEBMYSTRAN_PATCH_RESTORE_L3A_BINARY_READ_RESTART_PRINT` | `sources/MYSTRAN/Source/UTIL/PRT_MATS_ON_RESTART.f90` | Restore restart L3A reads to native unformatted mode for binary compatibility. |
| `WEBMYSTRAN_PATCH_RESTORE_L5_BINARY_READ_LINK9` | `sources/MYSTRAN/Source/LK9/LINK9/LINK9.f90` | Restore LINK9 L5A/L5B reads to native unformatted mode for performance and parity. |
| `WEBMYSTRAN_PATCH_LINK9_PHASE_CHECKPOINTS` | `sources/MYSTRAN/Source/LK9/LINK9/LINK9.f90` | Optional LINK9 phase checkpoints for wasm/native hotspot profiling; enabled only when `WEBMYSTRAN_PROFILE_CHECKPOINTS=1`. |
| `WEBMYSTRAN_PATCH_OFP3_PHASE_CHECKPOINTS` | `sources/MYSTRAN/Source/LK9/L92/OFP3.f90` | Optional OFP3 sub-phase checkpoints for hotspot profiling; enabled only when `WEBMYSTRAN_PROFILE_CHECKPOINTS=1`. |
| `WEBMYSTRAN_PATCH_OFP3_ELFE_1D_PHASE_CHECKPOINTS` | `sources/MYSTRAN/Source/LK9/L92/OFP3_ELFE_1D.f90` | Optional ELFE 1D sub-phase checkpoints for hotspot profiling; enabled only when `WEBMYSTRAN_PROFILE_CHECKPOINTS=1`. |
| `WEBMYSTRAN_PATCH_OFP3_STRE_NO_PCOMP_PHASE_CHECKPOINTS` | `sources/MYSTRAN/Source/LK9/L92/OFP3_STRE_NO_PCOMP.f90` | Optional stress non-PCOMP sub-phase checkpoints for hotspot profiling; enabled only when `WEBMYSTRAN_PROFILE_CHECKPOINTS=1`. |
| `WEBMYSTRAN_PATCH_OFP3_STRN_NO_PCOMP_PHASE_CHECKPOINTS` | `sources/MYSTRAN/Source/LK9/L92/OFP3_STRN_NO_PCOMP.f90` | Optional strain non-PCOMP sub-phase checkpoints for hotspot profiling; enabled only when `WEBMYSTRAN_PROFILE_CHECKPOINTS=1`. |
| `WEBMYSTRAN_PATCH_KGG_SINGULARITY_DETERMINISTIC_TIEBREAK` | `sources/MYSTRAN/Source/LK1/L1E/KGG_SINGULARITY_PROC.f90` | Use tolerance-based deterministic tie-break when selecting AUTOSPC component from eigenvector magnitudes. |
| `WEBMYSTRAN_PATCH_ALLOCATE_MODEL_STUF_FIXEDLEN_DUMMIES` | `sources/MYSTRAN/Source/Interfaces/ALLOCATE_MODEL_STUF_Interface.f90` | Use fixed-length CHARACTER dummies in ALLOCATE_MODEL_STUF interface to avoid flang-wasm assumed-length descriptor failures. |
| `WEBMYSTRAN_PATCH_EPM_NONZERO_FIRST_DIM_ALLOC` | `sources/MYSTRAN/Source/UTIL/ALLOCATE_MODEL_STUF.f90` | Avoid zero-extent first dimensions in ELEM property/material allocates to sidestep flang-wasm runtime descriptor issues. |

## Runtime Harness Updates (Not From tools/build.js)

| Scope | File | Update |
|---|---|---|
| benchmark runtime metrics | `scripts/smoke_test.ps1` | Added per-deck wasm/native wall-time capture and optional peak-RSS capture; writes `tools/smoke_run/performance_summary.json` with `MemoryProfilingEnabled`. |
| OP2 artifact retention | `scripts/smoke_test.ps1` | Added preservation of `WEBMYSTRAN.OP2` as `WEBMYSTRAN.OP2.preserved` when `-KeepRunArtifacts` is enabled. |
| artifact comparison hygiene | `scripts/smoke_test.ps1` | Excluded `native_metrics.txt` from artifact parity checks and transient cleanup logic. |
| native metrics robustness | `scripts/smoke_test.ps1` | Replaced `/usr/bin/time` dependency: timing is always collected, while `/proc` RSS sampling is enabled only when `-CollectMemory` or `WEBMYSTRAN_PROFILE_MEMORY=1` is set. |
