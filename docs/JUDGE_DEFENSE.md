# LATENTLAB Judge Defense

## Why isn't this just BFS?

The recurrent estimator uses synchronous local whole-grid updates; BFS uses a queue and visited/predecessor state. They answer the same grid question through separate algorithms so the learner can compare a depth-limited process with completed truth.

## Why use BFS at all?

Correctness needs a transparent independent reference. BFS evaluates the recurrence; it never feeds or guides it.

## What exactly is the hidden state?

A fixed-size matrix storing `-1` for unknown/blocked cells and the earliest-known integer distance for reached cells. It is the actual task-relevant state used for prediction.

## Why call this latent computation?

The algorithm repeatedly changes internal state before reading the answer and emits no intermediate reasoning text. This is a narrow mechanism-level use of "latent," not a claim of neural equivalence.

## Is the system learned?

No. It is deterministic, parameter-free, and algorithmic.

## What changes with depth?

The exact number of recurrence applications, the reached-cell state, changed-cell count, convergence delta, compute proxy, and sometimes the goal estimate.

## Does more depth always improve performance?

No. The default fixture needs six updates, but the disconnected fixture stabilizes at step 3 and later updates do nothing useful.

## What is the operation proxy, and why isn't it FLOPs?

It is requested depth times traversable cells: a count of cell-update opportunities. It ignores instruction mix, hardware, optimization, memory, and parallelism, so it is not FLOPs, latency, energy, tokens, or cost.

## Is this BDH or BDH-CQ?

No. LATENTLAB lacks learned graph weights, neural activations, recurrent contextual memory, in-context learning, language generation, candidate ranking, and ARC evaluation.

## What is the research connection?

BDH-CQ's authors describe recurrent memory followed by iterative latent query computation. The shared concept is repeated internal computation before output; the architectures and evidence are different.

## What evidence is ours versus published?

Our evidence: engine, BFS, traces, fixtures, tests, evaluation corpus, screenshots, and checksums. Published evidence: cited authors' descriptions/results for recurrent depth, Coconut, BDH, and BDH-CQ. The mechanism diagram is an educational illustration.

## Did you reproduce BDH-CQ?

No. Exact updates and dimensions are proprietary, and this project did not run its model or ARC evaluation.

## Why is the limitation scientifically useful?

It makes the non-guarantee observable and prevents "more compute always helps" from becoming an unfalsifiable slogan.

## What would you build next?

After release QA, a useful research extension would compare several transparent recurrent rules or a tiny trained recurrent model while preserving an independent oracle and explicit evidence labels.

## Could the team explain every core component without Codex?

That is the live-defense standard: recurrence, BFS, trace assembly, metrics, fixtures, research boundaries, and build scripts are intentionally small and documented. AI assistance is disclosed; the team remains responsible for understanding and defending the submission.
