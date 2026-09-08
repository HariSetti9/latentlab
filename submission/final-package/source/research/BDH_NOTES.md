# BDH and BDH-CQ Notes

## What is directly supported

The 2025 Dragon Hatchling paper introduces BDH as a graph-based attention/state-space sequence architecture composed of locally interacting neuron particles. Its authors describe inference working memory in terms of synaptic plasticity using Hebbian learning and report sparse, positive activations. These are developer-paper claims, not findings reproduced by LATENTLAB. [S3](https://arxiv.org/abs/2509.26507)

The 2026 BDH-CQ paper introduces a model that combines in-context learning with recurrent latent reasoning. According to its abstract, inputs at inference time update recurrent memory, after which the query is processed through iterative high-dimensional latent computation without verbalizing intermediate reasoning. [S4](https://arxiv.org/abs/2608.09888)

## Exact connection to LATENTLAB's selected concept

The direct conceptual connection is repeated internal computation before an answer is decoded. BDH-CQ explicitly names recurrent latent reasoning and exposes an iteration-like compute axis. This supports the lesson that inference compute need not be represented only as extra natural-language tokens.

The connection is conceptual, not an implementation mapping. LATENTLAB's planned grid recurrence propagates a task-relevant scalar/state field over a fixed topology. It has no learned in-context update, no BDH neuron-particle graph, no synaptic plasticity mechanism, and no claim to language modeling or ARC-AGI ability.

## BDH versus BDH-CQ

- **BDH** names the Dragon Hatchling architecture and its proposed memory/sequence-computation substrate.
- **BDH-CQ** is a later reasoning model built around in-context learning and recurrent latent computation in the BDH research line.
- We must not use the two names interchangeably. BDH's base paper supports architecture and memory claims; BDH-CQ's paper supports the recurrent-latent-query mechanism and its own reported evaluation.

## What is analogous but not equivalent

| Dimension | LATENTLAB toy | Published BDH/BDH-CQ |
|---|---|---|
| Repetition | A chosen count repeats a deterministic grid update | BDH-CQ authors describe iterative computation in latent space |
| Internal state | Fixed-size, task-specific grid values | High-dimensional learned recurrent memory/state |
| Output | Reachability/path estimate | Learned query answer |
| Learning at inference | None | BDH-CQ authors describe demonstrations updating recurrent memory |
| Architecture | Hand-designed local propagation | BDH family architecture with learned, locally interacting units |
| Evidence | Our code, fixtures, and tests | Developer paper and reported experiments |

## Unknown or deliberately unclaimed

- No independent BDH-CQ reproduction has been verified for this project.
- We have not reproduced the ARC-AGI-1 evaluation, cost calculation, or claimed Pareto comparison.
- Phase 5 full-text review supports the narrow learner-facing mechanism statements. Exact proprietary BDH-CQ updates remain unknown; no paper figure or equation is reused.
- The toy cannot establish how BDH-CQ representations encode concepts or whether more latent steps improve arbitrary tasks.

## Module learning objective

After the in-flow module, the learner can say: “My interaction repeated a transparent toy state update. BDH-CQ is relevant because its authors describe learned recurrent latent computation after demonstrations, but my toy does not implement BDH, its memory, or its published ARC evaluation.”

## Visual plan

The application uses an original three-lane mechanism map drawn from reviewed text: explicit-token reasoning, the transparent toy, and BDH-CQ as described. It labels itself simplified and never presents a paper figure as project-owned work.
