# Technical Ownership Guide

## Recurrent engine

WHAT IT DOES: Propagates known start distance through an open-cell grid.  
WHY IT EXISTS: Makes an internal recurrent state and exact update count inspectable.  
CORE ALGORITHM: Initialize start to 0 and other cells to -1. On each synchronous round, an unknown open cell adopts one plus the minimum known four-neighbor distance from the prior state.  
KEY DATA STRUCTURE: Fixed-shape `number[][]`; walls and unknowns are -1, reached cells are non-negative.  
EDGE CASES: Invalid/ragged grids, wall endpoints, shape mismatch, depth 0, unreachable components, and fixed points.  
WHY THIS DESIGN: It makes information speed exactly one edge per update and avoids hidden mutable traversal state.  
WHAT A JUDGE MAY ASK: Why is an already reached value retained? To make propagation monotone and distances stable.

## BFS oracle

WHAT IT DOES: Computes reachability, shortest distance, visited count, and one shortest path.  
WHY IT EXISTS: Supplies transparent ground truth independent of the estimate.  
CORE ALGORITHM: FIFO breadth-first expansion with first-visit predecessor recording, then reverse path reconstruction.  
KEY DATA STRUCTURE: `Point[]` queue plus `Map<string, Point | null>`.  
EDGE CASES: Start equals goal, unreachable goal, obstacles, invalid endpoints.  
WHY THIS DESIGN: BFS is conventional, auditable, and structurally different from synchronous recurrence.  
WHAT A JUDGE MAY ASK: Is BFS used to guide inference? No; `updateState` never receives or imports oracle output.

## Trace generation

WHAT IT DOES: Runs both sibling algorithms and records every actual recurrent state through requested depth.  
WHY IT EXISTS: Drives playback, metrics, estimate/reference comparison, and reproducible artifacts.  
CORE ALGORITHM: Initialize, append step 0, repeat `updateState`, count exact cell changes, derive prediction/metrics, and record first zero-change step.  
KEY DATA STRUCTURE: Immutable-looking array of `StepTrace` records containing state, prediction, changes, delta, and evaluation fields.  
EDGE CASES: Depth 0; optional early stop; fixed point; missing final step is guarded.  
WHY THIS DESIGN: One trace is the shared factual substrate for UI and evaluation.  
WHAT A JUDGE MAY ASK: Are animation frames fabricated? No; playback indexes stored engine outputs.

## Operation proxy

WHAT IT DOES: Counts requested cell-update opportunities as `depth x traversable cells`.  
WHY IT EXISTS: Gives a deterministic within-toy work axis.  
CORE ALGORITHM: Integer multiplication; per-step display uses current step times traversable cells.  
KEY DATA STRUCTURE: Number.  
EDGE CASES: Depth 0; work continues to count after saturation because updates were requested.  
WHY THIS DESIGN: It is reproducible across hardware.  
WHAT A JUDGE MAY ASK: Why not FLOPs? The implementation/runtime can optimize or parallelize operations; the proxy does not measure hardware execution.

## Convergence metric

WHAT IT DOES: Reports changed cells and `changed / traversable cells`.  
WHY IT EXISTS: Shows whether the state is moving and when it reaches a fixed point.  
CORE ALGORITHM: Elementwise comparison of consecutive matrices.  
KEY DATA STRUCTURE: Integer change count and normalized number in [0,1].  
EDGE CASES: Step 0 is defined as zero; puzzle validation guarantees at least one traversable endpoint.  
WHY THIS DESIGN: It is exact and visually explainable.  
WHAT A JUDGE MAY ASK: Is it loss or confidence? No.

## Preset discovery

WHAT IT DOES: Provides easy, depth-sensitive, and limitation showcase fixtures chosen from deterministic exploration and then committed.  
WHY IT EXISTS: Guarantees a fast lesson while retaining reproducible selection evidence.  
CORE ALGORITHM: The discovery script enumerates candidate grids/depth behavior; committed presets are normal engine inputs, not special cases.  
KEY DATA STRUCTURE: Typed `Preset` objects with grid, endpoints, recommended depths, and expected observation.  
EDGE CASES: Preset verification reruns semantics and fails drift.  
WHY THIS DESIGN: Demo reliability without runtime randomness.  
WHAT A JUDGE MAY ASK: Is the limitation manufactured? The fixture is selected, but its step-3 fixed point is computed and verified.

## Research claim data layer

WHAT IT DOES: Centralizes papers, bounded claims, evidence type, caveat, and comparison rows.  
WHY IT EXISTS: Prevents unsupported research wording from spreading through components.  
CORE ALGORITHM: Typed lookup/rendering; citation tests ensure every ID resolves and external links use the recorded primary URL.  
KEY DATA STRUCTURE: Read-only TypeScript records plus CSV ledger.  
EDGE CASES: Proprietary BDH-CQ details and absent unrelated reproduction are explicit.  
WHY THIS DESIGN: Claims become inspectable data rather than decorative prose.  
WHAT A JUDGE MAY ASK: Which evidence is ours? Only toy code, traces, tests, fixtures, and derived artifacts.

## Comparison diagram

WHAT IT DOES: Contrasts explicit-token output, the toy recurrence, and the published BDH-CQ system-level description.  
WHY IT EXISTS: Teaches the shared compute axis and the architectural breaks together.  
CORE ALGORITHM: None; it is original semantic HTML/CSS populated by real toy depth and reviewed research copy.  
KEY DATA STRUCTURE: Three labeled lanes and a separate comparison table.  
EDGE CASES: It must not imply tensor correspondence; “simplified” and non-equivalence appear before it.  
WHY THIS DESIGN: No paper figure or undisclosed detail is copied.  
WHAT A JUDGE MAY ASK: Is the BDH-CQ lane a reproduction? No.

## Reproducibility pipeline

WHAT IT DOES: Regenerates evaluation/preset artifacts, runs tests/typecheck/lint/citation/link/license/hygiene checks, builds, hashes deterministic artifacts, and writes an environment report.  
WHY IT EXISTS: Makes the exact checkout independently auditable.  
CORE ALGORITHM: Node orchestrator invokes pnpm scripts synchronously and stops on the first failure.  
KEY DATA STRUCTURE: JSON/CSV artifacts, SHA-256 manifest, and a non-deterministic environment report.  
EDGE CASES: Missing pnpm invocation, subprocess failure, platform executable discovery, timestamp/environment metadata.  
WHY THIS DESIGN: One command covers the scientific and engineering evidence chain.  
WHAT A JUDGE MAY ASK: Which outputs are deterministic? Evaluation, preset report, and checksums; the environment report records time/machine context and is excluded from deterministic hashes.
