# Test Matrix

| Category | Proves | Does not prove | Command | Result |
|---|---|---|---|---|
| Core algorithm | Defined updates behave as tested | Learned reasoning | `pnpm test` | Pass |
| Oracle | BFS cases/path behavior | Formal verification | `pnpm test` | Pass |
| Oracle independence | Recurrent source has no oracle/traversal dependency | Runtime/module tampering outside source | `pnpm test` | Pass |
| Determinism | Same inputs serialize identically | Stability after source changes | `pnpm test` | Pass |
| Boundaries | Invalid depth/grid and unreachable behavior | Every external format | `pnpm test` | Pass |
| Evaluation corpus | Reachability/density/size/distance coverage | Population accuracy | `pnpm evaluate --write` | 10 fixtures / 80 cases |
| Preset semantics | Showcase behavior emerges from engine | Learned-model behavior | `pnpm verify:presets --write` | Pass |
| Research rendering | Warnings/citations/evidence render | Published reproduction | `pnpm test` | Pass |
| Accessibility | Rendered semantics, skip link, labels, keyboard focus, text equivalents | Native screen-reader study | tests + production browser audit | Pass |
| Responsive layout | Recorded viewports lack overflow/errors | Every device | `pnpm audit:browser` | Pass at 360/390/768/1024/1440 px in Chrome/Edge |
| Build | Static assets compile | Deployment availability | `pnpm build` | Pass |
| Citation integrity | No placeholder/fake markers | Source truth alone | `pnpm check:citations` | Pass |
| Link integrity | Internal targets and required primary URLs are present | Future network availability | `pnpm check:links` | Pass |
| License metadata | Resolved packages declare license metadata | Legal interpretation | `pnpm check:licenses` | 266 packages; no missing field |
| Package dry run | Required source/docs exist; forbidden content absent | Final URLs/archive | `pnpm verify:package` | Pass |
| Reproducibility | Fresh install/full workflow execute | Every future platform | install + `pnpm reproduce` | Pass; report records environment |

Exact test count is stored in `artifacts/reproduction-report.json`.
