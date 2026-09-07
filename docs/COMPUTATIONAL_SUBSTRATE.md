# Computational Substrate

## What is computed

LATENTLAB's Phase 3 substrate is a deterministic recurrent cellular system over a small maze. It is deliberately simpler than a neural model so every transition can be inspected and defended.

For traversable cell `i`, let `h_i^t` be its earliest-known distance from the start after `t` synchronous updates. Unknown cells and walls are represented by `-1`. Initialization sets the start to zero and every other cell to `-1`.

For an unreached traversable cell:

```text
h_i^(t+1) = 1 + min(h_j^t for reached four-neighbors j)
```

If no neighbor was reached in the previous state, the cell remains `-1`. Already reached cells retain their value. Because the update is synchronous, information advances at most one edge per recurrence. The state always has the same grid shape; increasing depth repeats computation rather than appending text.

## Output head

The output head reads only the goal cell. A non-negative value predicts reachable and supplies an estimated shortest distance. A `-1` value predicts “not yet reached by this depth.” It does not produce probability or confidence.

At shallow depth, “not yet reached” can disagree with the completed BFS reference. The UI must phrase this as the current depth-limited estimate, not a proof that no path exists.

## Independent reference

The oracle performs conventional BFS using a queue and predecessor map, then reconstructs a shortest path. It is isolated in `src/core/oracle.ts`; recurrent inference cannot import or call it. The experiment runner calls both only to put the live estimate beside the reference and mark correctness.

## Serializable trace

`runExperiment` returns the initialized step plus every executed recurrence. Each step contains the full numeric state, prediction, changed-cell count, normalized convergence delta, correctness, and defined distance error. The result also contains the independent oracle output, final prediction, fixed-point step when observed, and the explicitly defined compute proxy.

## Presets and computational discovery

`scripts/find-interesting-puzzles.ts` enumerates wall masks in ascending integer order. It found:

- `generated-4-0`: a reachable 4x4 case with shortest distance 6, selected for depth sensitivity;
- `generated-3-28`: a disconnected 3x3 case whose reachable component contains three cells and becomes stable at update 3, selected for the limitation.

The easy corridor is a minimal teaching case whose distance-2 outcome is still computed, not controlled by its explanatory metadata. Metadata never enters inference.

## Honest limitation

The limitation preset reaches a fixed point before the requested maximum depth. Updates 4 through 16 repeat the same fixed state and answer: additional compute adds no information. This supports “more updates are not guaranteed to help indefinitely.” It is not presented as harmful overthinking or an error: both recurrence and BFS correctly classify the disconnected goal.

## Explicit non-equivalence

This system is `LIVE COMPUTATION` and a `TOY MODEL`. It is not BDH, BDH-CQ, a reproduction of either paper, a language model, or evidence about frontier-model cognition. The analogy is only that a fixed-size internal state is updated repeatedly before output is read.
