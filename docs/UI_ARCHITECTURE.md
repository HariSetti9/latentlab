# Phase 4 UI Architecture

## Data flow

`App` owns only learner choices: preset, requested depth, inspected trace step, playback state, and guided stop. `runExperiment(preset, depth)` derives the full experiment with `useMemo`. Components receive typed `ExperimentResult`, `StepTrace`, `Puzzle`, or `HiddenState` values; they do not duplicate recurrence or BFS logic.

```text
learner choice -> runExperiment -> serializable trace
                                  ├─ GridVisualizer
                                  ├─ ExperimentSummary
                                  ├─ ConvergenceChart
                                  └─ TracePlayer selects a real step
```

The comparison runs the same depth-sensitive puzzle at depths 2 and 6. The sandbox constructs a valid small `Puzzle`, then calls the same public engine. Query parameters select a real fixture/depth for deterministic QA, for example `?fixture=depth-matters-winding&depth=6`.

## Component boundaries

- `GridVisualizer`: semantic text equivalent plus task-relevant grid state and optional BFS path overlay.
- `DepthControl`: fixed meaningful depth choices; each invokes a fresh experiment.
- `TracePlayer`: selects only states already returned by the engine; playback never interpolates states.
- `ExperimentSummary`: estimate/reference separation and minimal defined metrics.
- `ConvergenceChart`: one SVG series using `changedStateCount` only.
- `ComparisonMode`: two engine runs over one input, with bounded trade-off copy.
- `GuidedJourney`: five concise prompts; it changes learning/navigation state, not results.
- `SandboxGrid`: validated 4x4 editor using the same engine and oracle.

## Visual encoding

- Green circle `S`: start.
- Rust circle `G`: goal.
- Pale green plus a numeral: earliest-known distance in recurrent state.
- Pale gray blank cell: not reached at the inspected depth.
- Dark hatched cell with `×`: wall.
- Blue inset outline: independent BFS shortest path.

The encoding uses symbols, labels, numerals, outlines, and patterns in addition to color.

## Honest value provenance

| UI value | Source |
|---|---|
| Cell distance/state | `StepTrace.state` |
| Estimate and distance | `StepTrace.prediction` |
| Correct/incomplete | `StepTrace.correctness` |
| Changed cells / delta | `StepTrace.changedStateCount` / `convergenceDelta` |
| Operation proxy | exact update step × traversable cell count |
| Reachability/path/distance | `ExperimentResult.oracle` from independent BFS |
| Stable step | first zero-change update from the trace |

No confidence, probability, FLOP count, latency claim, or hidden semantic interpretation is shown.

## React quality review

- Derived computation is memoized rather than mirrored into state.
- Playback timer has explicit cleanup and functional state updates.
- Components are module-level and typed; no component is declared during render.
- No data fetching, global state framework, chart library, animation library, or icon library.
- Direct core-module imports are used on the interactive path.
- The core experiment is synchronous and dependency-free.
