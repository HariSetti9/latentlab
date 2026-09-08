# 60-Second Judge Path

| Time | Action | What to notice |
|---|---|---|
| 0-10 s | Open `?fixture=depth-matters-winding&depth=4`. | A live preset is already computed; BFS says shortest distance 6 while the depth-limited estimate is incomplete. |
| 10-25 s | Inspect the state and changed-cell readout. | The visualization is the actual task-relevant integer state, not generated reasoning text. |
| 25-35 s | Click depth `6`. | Two additional real updates reach the goal and the estimate becomes distance 6. |
| 35-45 s | Compare `LIVE COMPUTATION - TOY MODEL` with `INDEPENDENT BFS REFERENCE`. | Truth evaluates the recurrence but does not feed it. |
| 45-55 s | Select `Limitation - More work, same answer` and depth `16`. | The state stabilized at step 3; later updates add no state change. |
| 55-60 s | Read "Additional computation can saturate." | More internal computation can change an answer, but is not guaranteed to keep helping. |

Next, open `#evidence` for the sourced BDH/BDH-CQ connection and explicit non-equivalence warning.
