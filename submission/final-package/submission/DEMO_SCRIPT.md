# LATENTLAB Demo Script - 2:20 One-Take Plan

| Time | Narration | Screen action | Expected visible result |
|---|---|---|---|
| 0:00-0:12 | "Can an AI think longer without talking longer? LATENTLAB turns that question into one experiment you can inspect." | Open default artifact at depth 4. | Hero question and active Depth Matters puzzle. |
| 0:12-0:30 | "This is a deliberately algorithmic, non-learned toy. The control sets the exact number of recurrent updates to a fixed-size grid state." | Point to truth labels, depth control, and state grid. | `LIVE COMPUTATION`, `ALGORITHMIC TOY`, depth 4, incomplete estimate. |
| 0:30-0:52 | "At four updates, information has not crossed six edges to the goal. Change only depth to six." | Click depth 6, then scrub trace from steps 4 to 6. | Cells propagate; goal becomes reachable at estimated distance 6. |
| 0:52-1:08 | "The blue reference is separate BFS. It evaluates the estimate but never feeds recurrent inference." | Point to the estimate/reference cards and the always-visible oracle note. | BFS explanation and agreement verdict remain visible. |
| 1:08-1:28 | "More compute is not guaranteed to keep helping. This disconnected case reaches a fixed point at step three." | Select `Limitation - More work, same answer`; choose depth 16. | Stable step 3; unchanged state/output despite larger operation proxy. |
| 1:28-1:50 | "Published systems explore richer internal computation. BDH-CQ's authors distinguish recurrent contextual memory from an iterative latent query workspace. Our bridge is conceptual, not architectural." | Scroll to Evidence; show warning, diagram, comparison. | `Conceptual bridge, not a replica`; paper citations and evidence labels. |
| 1:50-2:05 | "Learners can alter a small grid, answer three checks, and explain the result in their own words." | Briefly show sandbox and self-check. | Real editor, local feedback, explain-back prompt. |
| 2:05-2:20 | "Everything important is reproducible: one command regenerates 80 item-level cases, verifies presets, runs 58 tests, builds, and checks evidence integrity." | Show README deliverables and `pnpm reproduce` command. | Verified public app, repository, CI, judge paths, and explicit pending video action. |

## Recording notes

- Use desktop viewport near 1440x900 and browser zoom 100%.
- Start at <https://harisetti9.github.io/latentlab/?fixture=depth-matters-winding&depth=4>.
- Keep pointer motion deliberate; do not accelerate or fake computation.
- Record the terminal command separately only if readable in the final cut.
- Replace the pending video marker after recording and verifying public playback.

## Phase 8 rehearsal record

Rehearsed against the production preview on 2026-09-08. Every promised UI action exists and completed without a browser error: depth 4 to 6, trace inspection, visible BFS note, limitation selection and depth 16, evidence anchor, sandbox, self-check, and README handoff. The prior instruction to open a nonexistent “Why trust the reference?” control was corrected. The narration is 151 words: about 70 seconds at 130 words per minute, leaving about 70 seconds for the measured 2:20 plan's interactions and visual pauses. No external recording or participant timing is claimed.
