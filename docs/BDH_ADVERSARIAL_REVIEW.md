# BDH and Adjacent Research Adversarial Review

| Connection | Classification | Defense / action |
|---|---|---|
| Recurrent-depth models repeat a hidden core at test time | DIRECTLY SUPPORTED | Primary abstract and architecture sections support this author-reported mechanism; the toy does not inherit its empirical results |
| Coconut feeds a last hidden state back as continuous input | DIRECTLY SUPPORTED | Primary source supports the mechanism; it is explicitly presented as distinct from recurrent depth |
| LATENTLAB and these systems can spend compute without one emitted word per update | REASONABLE CONCEPTUAL ANALOGY | Retained as the narrow common axis; state, training, tasks, and outputs differ |
| BDH uses learned local graph/state dynamics and evolving edge state | DIRECTLY SUPPORTED | Retained as author-reported architecture context, not reproduced behavior |
| BDH-CQ separates demonstration-conditioned memory from iterative query computation | DIRECTLY SUPPORTED | Retained with proprietary-update and non-reproduction caveats |
| LATENTLAB’s grid cells map to BDH neurons, memory, or tensors | REMOVE | Never claimed; diagram labels itself original and simplified |
| Toy depth predicts BDH-CQ depth, accuracy, cost, or ARC performance | REMOVE | Explicitly denied in UI and documentation |
| Saturation in the toy demonstrates overthinking in learned systems | WEAK ANALOGY | Not used; limitation is framed only as a toy fixed point |
| BDH-CQ’s co-author-involved audit is unrelated replication | REMOVE | Explicitly rejected |

Conclusion: the surviving bridge is conceptual and useful, but narrow. It supports a teaching question about internal recurrent computation; it does not transfer architecture, representation, performance, or biological claims.
