# Phase 7 Curated Screenshot Set

Captured from the live local app at a desktop viewport of 1440 x 1000 and a mobile viewport of 390 x 844. The capture script failed the run on browser console errors, page errors, or horizontal overflow; all five captures passed.

| File | Deterministic route/state shown |
|---|---|
| `phase7-depth-shallow.png` | `/?fixture=depth-matters&depth=4#experiment-lab`: incomplete recurrent estimate beside reachable BFS truth |
| `phase7-depth-solved.png` | `/?fixture=depth-matters&depth=6#experiment-lab`: same input, estimate agrees with BFS |
| `phase7-limitation.png` | `/?fixture=limitation-island&depth=8#experiment-lab`: stable fixed point |
| `phase7-research.png` | `/#evidence`: mechanism comparison and evidence-status module |
| `phase7-mobile.png` | `/?fixture=depth-matters&depth=4#experiment-lab`: core experiment at 390 x 844 |

These are curated UI evidence, not scientific results. Regenerate with `node scripts/capture-phase7.mjs` after installing Playwright or setting `PLAYWRIGHT_PATH`; override `APP_URL` and `CHROME_PATH` when needed.
