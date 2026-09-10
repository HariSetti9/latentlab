# Risk Register

| ID | Risk | Likelihood | Impact | Mitigation / gate | Current status |
|---|---|---:|---:|---|---|
| R-01 | Research claim is inaccurate or citation is weak/fabricated | Medium | Critical | Primary-source ledger; full-text audit; typed sources; placeholder scan | Reduced in Phase 5; final audit remains |
| R-02 | Learner mistakes toy substrate for BDH/BDH-CQ | High | Critical | Persistent toy label; early warning; comparison table; skeptical-copy audit | Mitigated in Phase 5 UI and tests |
| R-03 | Additional iterations do not produce an instructive change | Medium | High | Explore fixtures before UI; publish all fixed evaluation items; choose a task whose propagation depth is real | Mitigated in Phase 3: distance-6 fixture fails through depth 4 and succeeds at 6 |
| R-04 | A claimed over-iteration failure is manufactured | Medium | Critical | Only show saturation/oscillation/interference measured by committed code; otherwise teach saturation rather than harm | Mitigated in Phase 3: enumerated disconnected case stabilizes at step 3; framed only as saturation |
| R-05 | Ground truth is not independent | Low | Critical | Separate BFS module and tests that prevent estimator dependency | Mitigated in Phase 3: separate queue/predecessor oracle; inference has no oracle import |
| R-06 | Mobile computation or visualization is slow | Low | High | Small grids, no heavy runtime, performance budget, measured mobile E2E | Reduced: production Chrome/Edge matrix passes five widths; hosted device remains |
| R-07 | Visualization is inaccessible | Medium | High | Semantic controls, focus, contrast, text state table, patterns/icons beyond color, reduced motion | Reduced in Phase 8; native screen-reader audit remains |
| R-08 | Deployment is brittle or deep links/assets break | Medium | High | Static build, configurable Vite base, Linux CI, production smoke test | Reduced; actual Pages deployment remains Phase 9 |
| R-09 | Results cannot be reproduced | Medium | Critical | Deterministic fixtures, pinned package manager/lockfile, one-command checks, clean-copy reproduction | Mitigated; hosted Ubuntu CI passes |
| R-10 | BDH or BDH-CQ primary material is unavailable/ambiguous | Medium | High | Primary papers reviewed; disclose proprietary gaps and reproduction boundary | Reduced; exact BDH-CQ updates remain undisclosed |
| R-11 | PDF deliverables overflow or become unreadable | Medium | Medium | Render every PDF to PNG and visually inspect; one-page word/layout budget | Mitigated in Phase 7: all four rendered pages visually inspected; concept is exactly one page |
| R-12 | Public GitHub/deployment authentication unavailable | Medium | High | Prepare complete repository/config; request only the minimum user authorization at Phase 9; never invent URLs | Open |
| R-13 | Demo video cannot be recorded or opened publicly | High | Medium | Shot list, public upload, Incognito playback verification, and final link audit | Closed; public recording verified |
| R-14 | License/provenance gaps | Medium | High | Inventory every code/data/weight/asset/font source and run dependency-license audit | Mitigated in Phase 8: 266 resolved package records, no missing metadata; assets/provenance audited |
| R-15 | Scope creep harms the one-minute lesson | Medium | High | Every screen/control maps to a learning objective and rubric row; delete unmatched work | Mitigated in Phase 7 judge path and timed demo script |
