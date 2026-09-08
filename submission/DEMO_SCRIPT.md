# LATENTLAB Demo Script - 3:10 One-Take Plan

| Time | Narration | Screen action | Expected visible result |
|---|---|---|---|
| 0:00-0:15 | "Can an AI think longer without talking longer? LATENTLAB turns that question into one experiment you can inspect." | Open default artifact at depth 4. | Hero question and active Depth Matters puzzle. |
| 0:15-0:40 | "This is a deliberately algorithmic, non-learned toy. The control sets the exact number of recurrent updates to a fixed-size grid state." | Point to truth labels, depth control, and state grid. | `LIVE COMPUTATION`, `TOY MODEL`, depth 4, incomplete estimate. |
| 0:40-1:15 | "At four updates, information has not crossed six edges to the goal. Change only depth to six." | Click depth 6, then scrub trace from steps 4 to 6. | Cells propagate; goal becomes reachable at estimated distance 6. |
| 1:15-1:40 | "The blue reference is separate BFS. It evaluates the estimate but never feeds recurrent inference." | Open "Why trust the reference?" and indicate estimate/reference cards. | BFS explanation and agreement verdict remain visible. |
| 1:40-2:05 | "More compute is not guaranteed to keep helping. This disconnected case reaches a fixed point at step three." | Select `Limitation - More work, same answer`; choose depth 16. | Stable step 3; unchanged state/output despite larger operation proxy. |
| 2:05-2:35 | "Published systems explore richer internal computation. BDH-CQ's authors distinguish recurrent contextual memory from an iterative latent query workspace. Our bridge is conceptual, not architectural." | Scroll to Evidence; show warning, diagram, comparison. | `Conceptual bridge, not a replica`; paper citations and evidence labels. |
| 2:35-2:55 | "Learners can alter a small grid, answer three checks, and explain the result in their own words." | Briefly show sandbox and self-check. | Real editor, local feedback, explain-back prompt. |
| 2:55-3:10 | "Everything important is reproducible: one command regenerates 80 item-level cases, verifies presets, runs 53 tests, builds, and checks evidence integrity." | Show README deliverables and `pnpm reproduce` command. | Judge paths and explicit pending publication/video links. |

## Recording notes

- Use desktop viewport near 1440x900 and browser zoom 100%.
- Start at `?fixture=depth-matters-winding&depth=4`.
- Keep pointer motion deliberate; do not accelerate or fake computation.
- Record the terminal command separately only if readable in the final cut.
- Replace pending public/video links after Phase 9 and recording.
