# Metric Definitions and Non-Claims

| Metric | Formula / unit | Interpretation | It is not |
|---|---|---|---|
| Requested depth | Non-negative integer updates | Recurrence applications requested | Human or BDH-CQ thought depth |
| Reached cells | Traversable cells with state ≥ 0 | Current propagation extent | Neural activation count |
| Predicted reachability | Goal state ≥ 0 | Whether recurrence reached goal | Probability/confidence |
| Predicted distance | Goal's state value | Current toy estimate | General planning quality |
| Oracle distance | BFS edges or null | Grid reference | Learned-model label |
| Correctness | Exact reachability and reachable-distance match | Per-case BFS agreement | Benchmark accuracy/statistical estimate |
| Changed-state count | Cells different from prior state | State altered this step | FLOPs/useful reasoning steps |
| Convergence delta | Changed ÷ traversable cells | Normalized change `[0,1]` | Loss/confidence |
| Stable step | First zero-change update | First observed fixed point | Neural convergence guarantee |
| Operation proxy | Depth × traversable cells; cell-update opportunities | Relative deterministic work | Time, FLOPs, energy, tokens, dollars, hardware cost |
| Obstacle density | Wall cells ÷ all cells | Fixture description | Difficulty score |

No aggregate headline is promoted: the 10-fixture corpus is small and hand-constructed. Evaluator timing is a machine-dependent diagnostic only. Bundle size is build engineering data, not model efficiency.
