# Experiment Protocol

## Purpose and hypotheses

Test a narrow educational claim: repeated synchronous local updates can propagate task-relevant state farther before an answer is read, while excess updates can eventually stop changing that state.

- H1: A reachable goal at BFS distance `d` first receives a distance value at update `d`.
- H2: Identical puzzle/depth inputs produce identical serialized traces.
- H3: A finite disconnected component reaches a fixed point; later requested updates change neither state nor prediction.
- H4: Recurrence and separate BFS agree after sufficient depth; shallow depth may remain incomplete.

These were recorded before Phase 3's final fixture sweep. They are test conditions, not assumed results.

## Input space and presets

Rectangular four-neighbor grids use `0` for traversable cells and `1` for walls. Inputs contain in-bounds traversable start and goal coordinates. Phase 6's hand-constructed corpus contains 10 fixtures (3 showcases plus 7 evaluation fixtures), sizes 1×1 through 5×5, reachable/unreachable cases, distances 0–8, and obstacle densities 0–0.5.

- Easy: `easy-corridor`; intended shallow success.
- Depth Matters: `depth-matters-winding`; intended shallow incompleteness then deeper success.
- Limitation: `limitation-island`; intended unreachable fixed-point saturation.

`scripts/verify-presets.ts` computes these behaviors from engine output. It does not modify the solver.

## Recurrent depths and reference oracle

Every fixture runs at depths `0, 1, 2, 4, 6, 8, 12, 16`: 80 deterministic cases. `oracle.ts` uses BFS with its own queue, visited/predecessor tracking, and path reconstruction. `recurrent-engine.ts` does not import the oracle; `trace.ts` invokes both as sibling computations.

## Metrics

Each case records grid dimensions, obstacle density, depth, oracle/predicted reachability and distance, correctness, final-step changed cells, first observed stable step, and operation proxy. Definitions and non-claims are in `docs/METRICS.md`.

## Procedure

1. Validate each committed fixture.
2. Compute the BFS reference.
3. Initialize recurrent state and apply exactly the requested synchronous updates.
4. Compare final prediction with BFS.
5. Serialize ordered JSON and CSV outputs.
6. Run preset assertions and tests.
7. Hash deterministic artifacts and their generating sources.

## Expected conditions versus observed results

Expected: depth below a reachable goal's shortest distance remains incomplete; sufficient depth agrees with BFS; disconnected finite components stabilize; identical runs serialize identically.

Observed: generated Phase 6 artifacts contain 80 cases across 10 fixtures. Easy succeeds at depth 2, Depth Matters is incomplete at 1/2/4 and succeeds at 6, and Limitation stabilizes at step 3 with no later state change. These are computed outputs; verification fails if they drift.

## Failure and limitation criteria

Verification fails for invalid fixtures, nondeterministic reruns, any corpus fixture disagreeing with BFS at depth 16, or showcase semantic drift. Shallow incompleteness is an expected bounded-compute outcome, not benchmark error. This corpus is small and hand-constructed; no population accuracy or learned-model performance inference is valid.

## Reproduction and artifacts

Run `pnpm reproduce`. It writes `evaluation-results.json`, `evaluation-results.csv`, `metrics.json`, `preset-verification.json`, `checksums.txt`, and volatile `reproduction-report.json`, all described in `artifacts/MANIFEST.md`.
