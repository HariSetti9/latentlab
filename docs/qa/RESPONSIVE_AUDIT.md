# Phase 8 Responsive and Visual Audit

| Width / mode | Result | Finding |
|---|---|---|
| 360 px | PASS after fix | Initial run exposed 3 px document overflow from research-map intrinsic sizing; `min-width: 0` fixed it |
| 390 px | PASS | Experiment, controls, cards, and research content stack without clipping |
| 768 px | PASS | Tablet layout retains readable grids, cards, and controls |
| 1024 px | PASS | Two-column areas remain balanced; table stays inside its scroll container |
| 1440 px | PASS | Maximum-width layout avoids excessive line length and whitespace |
| 200% root text | PASS | No document-level horizontal overflow; control names remain readable |
| Reduced motion | PASS | Smooth scrolling and transitions are suppressed |

Specific checks: chart labels remain inside cards; depth buttons wrap; the grid preserves its square aspect; long research titles wrap; the comparison table scrolls within a named focusable region; focus rings are not clipped; no sticky element obscures content.
