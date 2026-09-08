# Judge Defense: BDH and BDH-CQ

## What exactly is the connection?

Both the toy and BDH-CQ involve repeated internal updates before an answer is read. The toy makes that abstract compute axis directly manipulable and inspectable. That is the full extent of the analogy.

## Is the toy an implementation of BDH?

No. It is deterministic grid propagation with no learned weights. BDH is a learned architecture whose authors describe local graph dynamics and evolving associative edge state. BDH-CQ further separates demonstration-conditioned contextual memory from iterative query computation. The UI states this before the diagram and again in the table.

## What did the team independently verify?

We verified the toy's recurrence against a separately implemented BFS oracle and tests. We reviewed the full text of four primary papers. We did not run BDH/BDH-CQ weights, reproduce ARC-AGI-1, or verify the paper's cost point.

## Why not call the paper's audit independent reproduction?

BDH-CQ reports a black-box audit, but the named auditors appear in the paper's author list. We describe it as a co-author-reported black-box audit and state that no unrelated third-party reproduction was identified. This avoids conflating separation of access or roles with external replication.

## Why is the diagram defensible?

It is an original, deliberately simplified mechanism map derived from text, not a copied figure and not a claim about undisclosed tensors. The BDH-CQ lane shows only the public system interface: demonstrations update memory; the query workspace iterates; an answer is decoded.

## Why compare Coconut and recurrent depth?

They prevent “latent reasoning” from becoming one vague bucket. Recurrent depth repeats a hidden core; Coconut feeds the last hidden state back as a continuous input; BDH-CQ describes contextual memory plus a recurrent query workspace. The module calls them distinct approaches.

## Strongest limitation

The toy establishes an educational causal example, not a performance claim about learned systems. Exact BDH-CQ updates are proprietary, and no unrelated reproduction was identified. More internal updates can also saturate; the earlier live limitation fixture demonstrates this.
