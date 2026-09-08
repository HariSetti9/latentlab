# BDH / BDH-CQ Integration

## Learning bridge

LATENTLAB demonstrates a narrow fact with live code: repeated deterministic updates can change a fixed-size internal state before an answer is read. BDH-CQ is relevant because its authors describe demonstrations updating recurrent contextual memory, followed by iterative computation in a separate latent query workspace before decoding. The bridge is repeated internal computation—not shared implementation.

## Architecture boundaries

BDH's authors describe parameters in a communication graph and inference state through evolving edge reweighting. BDH-CQ extends that research line with a system-level separation between contextual memory `S` and query workspace `H`. LATENTLAB instead propagates transparent integer distances over a hand-designed grid. It has no training, neural activations, learned memory, candidate ranking, language model, or ARC capability.

The source says BDH-CQ's dimensions, exact update rules, implementation details, and parts of its training recipe are proprietary. The integration therefore does not reverse-engineer or visually invent those internals.

## In-flow implementation

- A second depth control reruns the committed toy engine and reports reached cells and goal state.
- An original simplified three-lane diagram contrasts token emission, toy recurrence, and the public BDH-CQ interface.
- A five-row table compares internal state, repeated computation, demonstration learning, output, and evidence.
- Evidence cards separate our experiment, author-reported preprints, and the absence of unrelated reproduction.
- Four full-text-reviewed primary sources appear as keyboard-accessible links with “why cite” and reviewed-section notes.

## Evidence policy

No BDH/BDH-CQ result is presented as reproduced. The module omits the headline cost/accuracy number from its teaching path: it is unnecessary for explaining the mechanism and would invite a benchmark comparison this project did not validate. Research claims link to original arXiv records and retain caveats in typed data.
