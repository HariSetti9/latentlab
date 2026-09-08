# Internal Heuristic Learning Test

**Classification: INTERNAL HEURISTIC LEARNING TEST. No external participants were used.** This verifies the production interface against the intended learning path; it is not user-research evidence.

| Time | Expected learner action | Question answered |
|---|---|---|
| 0-10 s | Read the opening and “Reasoning depth” legend | The controlled variable is the number of real recurrent updates |
| 10-25 s | Inspect depth 4 and the task-relevant state | Information advances through a fixed-size integer state; the goal is not reached yet |
| 25-35 s | Click depth 6 | The same input now reaches the goal at distance 6 |
| 35-45 s | Read the side-by-side BFS card and oracle note | BFS independently evaluates; it does not feed recurrence |
| 45-55 s | Select “Limitation - More work, same answer” | The state reaches a fixed point; additional requested updates can saturate |
| 55-60 s | Read the evidence transition/non-equivalence warning | LATENTLAB is an algorithmic toy, not BDH or BDH-CQ |

- Direct control actions: 2 (depth button, preset selection); scrolling/reading is not counted as a click.
- Key insight reached: update count can causally change the toy’s state and answer without a longer text trace, but extra updates need not keep changing useful state.
- Friction found: “TOY MODEL” could suggest a trained model; replaced with “ALGORITHMIC TOY.” The 360 px research map overflowed by 3 px; fixed.
- Remaining friction: the research section cannot fit inside the first minute; the non-equivalence warning is the required stopping point, with the detailed paper module as follow-up.
- Production verification: query fixtures, controls, limitation, and evidence anchor passed in Chrome and Edge at 360-1440 px.
