# Generated Artifact Manifest

| File | How generated | Source code | Deterministic? | Used in UI? | Purpose |
|---|---|---|---|---|---|
| `evaluation-results.json` | `pnpm evaluate --write` | Evaluator, corpus, engine, oracle | Yes | No | Complete machine-readable evaluation |
| `evaluation-results.csv` | `pnpm evaluate --write` | Same as JSON | Yes | No | Tabular inspection |
| `metrics.json` | `pnpm evaluate --write` | Same as JSON | Yes; compatibility copy | No | Existing tooling entry point |
| `preset-verification.json` | `pnpm verify:presets --write` | Presets, engine, oracle | Yes | No | Assert showcase semantics |
| `checksums.txt` | `pnpm checksums` | Checksum generator | Yes | No | SHA-256 integrity chain |
| `reproduction-report.json` (generated, gitignored) | `pnpm reproduce` | Reproduction orchestrator | No: timestamp/commit/environment | No | Compact run status for the exact checkout |
| `model-card.md` | Maintained with engine changes | Documentation | N/A | No | Scope and limitations |

QA screenshots are precomputed visual evidence, not scientific results, and are excluded from checksums. `dist/` is reproducible output but ignored rather than committed.
