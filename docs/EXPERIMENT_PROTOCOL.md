# Phase 3 Experiment Protocol

## Pre-registered hypotheses

- H1: Because one synchronous update moves information at most one grid edge, a reachable goal at shortest distance `d` will first receive a distance value at update `d`.
- H2: The recurrence and complete serialized trace will be identical for identical inputs because no random operation or external state is used.
- H3: On a disconnected puzzle, the state will reach a fixed point; further requested updates will increase the defined compute proxy but will not change the state or prediction.
- H4: BFS and recurrence agree after sufficient depth on the committed presets, while shallow depth can yield an incomplete (apparently unreachable) estimate.

These hypotheses were recorded before treating the final fixture sweep as evidence. Development observations used to build tests are not presented as blinded evaluation.

## Task and state

Each fixture is a rectangular four-neighbor grid. `0` is traversable and `1` is a wall. The recurrent state stores `-1` for unknown/unreached and a non-negative earliest-known distance for reached cells. Step zero initializes only the start to distance zero.

## Evaluation

Run:

```sh
pnpm test
pnpm evaluate
pnpm find:puzzles
```

The fixed sweep uses all committed presets at depths 0, 1, 2, 4, 6, 8, and 16. For every item it records the estimate, independently computed BFS answer, correctness, final-step changes, stable step when observed, and compute proxy.

## Independence

`oracle.ts` uses a FIFO queue, visited/predecessor map, and path reconstruction. `recurrent-engine.ts` uses synchronous whole-grid local state transforms. The engine never imports or calls the oracle. `trace.ts` invokes both as sibling computations only to annotate evaluation traces.

## Determinism

There is no randomness, training, floating-point learned parameter, API, or hardware-dependent branch. “Same seed” is therefore vacuous in Phase 3: no seed is accepted because it would be decorative. Puzzle generation enumerates integer wall masks in ascending order.

## Metrics

- Correctness requires matching oracle reachability and, when reachable, its shortest distance.
- Changed-state count is the number of cells whose stored value differs from the previous step.
- Convergence delta is changed-state count divided by traversable-cell count.
- Stable step is the first executed update with zero changed cells.
- Compute proxy is requested updates multiplied by traversable cells. It is not elapsed time, FLOPs, energy, or price.

## Timing

The evaluator prints process timing only as a diagnostic and explicitly excludes it from product claims. Browser interaction latency will be measured under the Phase 4 QA protocol with warm/cold conditions and target hardware recorded.

## Limitations

This is designed recurrence, not a trained neural network. It deterministically performs local distance propagation and therefore cannot demonstrate representation learning, language reasoning, in-context learning, calibrated confidence, or BDH/BDH-CQ behavior. The disconnected limitation demonstrates useful saturation - not an incorrect convergence or degradation in intelligence.
