# Test Matrix

| Category | Proves | Does not prove | Command | Result |
|---|---|---|---|---|
| Core algorithm | Defined updates behave as tested | Learned reasoning | `pnpm test` | Pass |
| Oracle | BFS cases/path behavior | Formal verification | `pnpm test` | Pass |
| Determinism | Same inputs serialize identically | Stability after source changes | `pnpm test` | Pass |
| Boundaries | Invalid depth/grid and unreachable behavior | Every external format | `pnpm test` | Pass |
| Evaluation corpus | Reachability/density/size/distance coverage | Population accuracy | `pnpm evaluate --write` | 10 fixtures / 80 cases |
| Preset semantics | Showcase behavior emerges from engine | Learned-model behavior | `pnpm verify:presets --write` | Pass |
| Research rendering | Warnings/citations/evidence render | Published reproduction | `pnpm test` | Pass |
| Accessibility | Current semantics/keyboard/text equivalents | Full external WCAG audit | `pnpm test` | Pass |
| Responsive layout | Recorded viewports lack overflow/errors | Every device | Browser QA | Pass at 390/1440 px |
| Build | Static assets compile | Deployment availability | `pnpm build` | Pass |
| Citation integrity | No placeholder/fake markers | Source truth alone | `pnpm check:citations` | Pass |
| Reproducibility | Fresh install/full workflow execute | Every future platform | install + `pnpm reproduce` | Pass; report records environment |

Exact test count is stored in `artifacts/reproduction-report.json`.
