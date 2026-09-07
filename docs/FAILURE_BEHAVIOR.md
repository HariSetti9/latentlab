# Failure Behavior

| Condition | Behavior | Interpretation |
|---|---|---|
| Invalid puzzle | Core throws a specific validation error; sandbox blocks invalid edits with inline alert | Rejected input, not result |
| No path | BFS returns unreachable; recurrence stabilizes without reaching goal | Valid negative case |
| Recurrence stabilizes | First zero-change step recorded; later states remain identical | Fixed point / saturation |
| Depth too shallow | Goal may be unknown while BFS says reachable; UI labels incomplete | Bounded propagation |
| Depth exceeds useful updates | State/output unchanged while operation proxy rises | Extra work, no extra state change |
| Malformed URL fixture/depth | Unknown fixture falls back to Depth Matters; invalid depth falls back to 4 | Safe default |
| Application reset | Trace view returns to step 0 | View reset only |
| Unsupported sandbox edit | Start/goal cannot become walls; last valid computation remains | No silent coercion |
| Negative/non-integer engine depth | Engine throws a depth contract error | Invalid programmer/input call |

Core computation requires no remote service or loading state.
