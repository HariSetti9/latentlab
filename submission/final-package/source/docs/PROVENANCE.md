# Provenance

| Material | Source / owner | License or status | URL | How used |
|---|---|---|---|---|
| Application source | LATENTLAB contributors, AI-assisted | MIT | Repository source | Original React/TypeScript implementation |
| Recurrent algorithm | LATENTLAB contributors | MIT; standard local propagation concept | `src/core/recurrent-engine.ts` | Original project implementation |
| BFS oracle | LATENTLAB contributors | MIT; standard BFS concept | `src/core/oracle.ts` | Independently implemented reference |
| Showcase fixtures | LATENTLAB contributors | MIT | `src/core/presets.ts` | Deterministically selected/generated toy grids |
| Evaluation corpus | LATENTLAB contributors | MIT | `src/core/evaluation-fixtures.ts` | Seven hand-constructed fixtures plus showcases; no external dataset |
| Evaluation artifacts | Generated locally | Derived project evidence | `pnpm evaluate --write` | Reproducible JSON/CSV and metrics |
| Research sources | Listed paper authors/publishers | Linked primary-source terms; no figures copied | `research/SOURCES.md` | Paraphrased, cited context |
| In-app diagrams | LATENTLAB contributors, AI-assisted | MIT | `ResearchModule.tsx` | Original simplified HTML/CSS illustration |
| Icons | None | Not applicable | - | Text, letters, and CSS shapes only |
| Product graphics | LATENTLAB contributors | MIT | CSS/SVG in repository | Original grid, chart, patterns, and layout |
| Fonts | User operating system | System font terms | CSS system stack | No font files redistributed |
| QA screenshots | Generated from LATENTLAB | Project evidence | `docs/qa/` | Deterministic local browser captures |
| Third-party packages | Their maintainers | Verified metadata; see license record | Package homepages | Runtime/build/test tooling |
| External code snippets | None copied | Not applicable | - | Algorithms implemented for this repository |
| Generated PDFs | LATENTLAB contributors, AI-assisted; ReportLab tooling | Project text MIT; tooling BSD-3-Clause | `scripts/generate-pdfs.py` | Programmatic summary/blog exports |
| AI-assisted work | OpenAI Codex | Disclosed process contribution | `docs/AI_DISCLOSURE.md` | Planning, code, tests, research organization, copy, QA |

No model weights, external datasets, stock media, browser profiles, analytics data, personal data, or secrets are included.
