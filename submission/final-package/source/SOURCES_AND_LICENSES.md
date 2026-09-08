# Sources and Licenses

## Project license

Original LATENTLAB code and documentation are released under the MIT License in `LICENSE`.

## Research sources

Research papers are cited and paraphrased; no paper figures or substantial text are redistributed.

| Source | Authors | URL | Use |
|---|---|---|---|
| Recurrent depth | Geiping et al. | https://arxiv.org/abs/2502.05171 | Architecture comparison |
| Coconut | Hao et al. | https://arxiv.org/abs/2412.06769 | Continuous-state feedback comparison |
| BDH / Dragon Hatchling | Kosowski et al. | https://arxiv.org/abs/2509.26507 | BDH architecture context |
| BDH-CQ | Engdahl et al. | https://arxiv.org/abs/2608.09888 | Recurrent memory/workspace context |

## Direct software dependencies

Versions and licenses were read from installed package metadata resolved by the committed lockfile on 2026-09-08.

| Package | Resolved version | License | Project URL |
|---|---:|---|---|
| React / React DOM | 19.2.8 | MIT | https://react.dev/ |
| Vite | 7.3.6 | MIT | https://vite.dev/ |
| Vitest | 3.2.7 | MIT | https://vitest.dev/ |
| TypeScript | 5.9.3 | Apache-2.0 | https://www.typescriptlang.org/ |
| ESLint | 9.39.5 | MIT | https://eslint.org/ |
| jsdom | 26.1.0 | MIT | https://github.com/jsdom/jsdom |
| tsx | 4.23.13 | MIT | https://tsx.is/ |
| Vite React plugin | 5.2.0 | MIT | https://github.com/vitejs/vite-plugin-react |
| Testing Library React | 16.3.3 | MIT | https://testing-library.com/ |
| Testing Library user-event | 14.6.7 | MIT | https://testing-library.com/docs/user-event/intro/ |
| Testing Library jest-dom | 6.10.0 | MIT | https://github.com/testing-library/jest-dom |

Transitive packages retain their own licenses. `pnpm check:licenses` inspected 266 resolved package/version records in Phase 8 and found no missing license metadata; the machine-readable inventory is `artifacts/license-audit.json`.

## Fonts, icons, assets, data, and reuse

- Fonts: CSS system-font stack only; no font binaries redistributed.
- Icons: none; controls use text and CSS shapes.
- Images: no external product images; screenshots are generated from the app.
- Diagrams/charts: original HTML, CSS, and SVG; no paper graphics copied.
- Data: no downloaded dataset. Toy grids and evaluation fixtures were created for this project.
- Weights: none.
- Reused components or external snippets: none.
- PDF tooling: ReportLab (BSD-3-Clause), pypdf (BSD-3-Clause), pdfplumber (MIT), and Poppler are generation/QA tools, not bundled with the app.

No unverified external asset license remains in the current product surface.
