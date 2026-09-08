# BFS Versus Recurrence Red-Team

## Objection

“This is simply BFS visualized twice.”

## Finding

It is not. Both procedures solve related grid questions, but they execute different algorithms and have different roles.

| Property | Recurrent engine | BFS oracle |
|---|---|---|
| Update | Every traversable cell reads four-neighbor values from the **previous** full state | FIFO queue expands discovered points one at a time |
| State | Fixed-shape integer matrix, retained across synchronous rounds | Queue, visited/predecessor map, reconstructed path |
| Depth | User-selected number of repeated global updates | Runs to goal/exhaustion; no user depth |
| Output role | Depth-limited estimate under study | Independent reference truth |
| Information sharing | Receives only puzzle and prior recurrent state | Its distance/path never enters `updateState` or `predictFromState` |

`trace.ts` invokes the two siblings and compares their outputs. That orchestration is evaluation, not oracle leakage. The recurrent module has no oracle import, queue, predecessor map, shortest path, or shortest distance. `oracle-independence.test.ts` enforces those source boundaries; behavior tests independently cover both algorithms.

Residual caveat: for this monotone rule at sufficient depth, the recurrent distance can equal BFS shortest distance. Agreement is the measured result, not evidence that the implementations are identical.
