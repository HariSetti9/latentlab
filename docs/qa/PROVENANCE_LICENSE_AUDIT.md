# Phase 8 Provenance and License Red-Team

| Area | Result | Finding |
|---|---|---|
| Original source/algorithms | PASS | Team/AI-assisted ownership and MIT status recorded; standard BFS/local propagation concepts identified |
| Research papers | PASS | Linked/paraphrased; no figure or substantial text redistributed |
| Data/fixtures | PASS | Hand-constructed project fixtures; no external dataset |
| Fonts/icons/assets | PASS | System fonts, text/CSS shapes, no external binaries or stock media |
| Diagrams/screenshots | PASS | Original HTML/CSS diagram; screenshots generated from the project |
| External code/components | PASS | No copied snippets or reused component library |
| AI assistance | PASS | Scope, human review, responsibility, and non-evidence boundary disclosed |
| JavaScript packages | PASS | Custom metadata traversal found 266 resolved package/version records and zero missing license fields |
| PDF tooling | PASS | ReportLab/pypdf/pdfplumber licenses recorded; tools are not shipped in browser bundle |

The native `pnpm licenses list` command could not use this machine’s incomplete package-index metadata, so a cross-platform checked-in metadata scanner was added and made part of reproduction/CI. No unknown asset or package license remains in the audited checkout.
