# Verified Primary Sources

Last verified: 2026-09-07. “Author-reported” means the source's authors report the mechanism or result; it does not imply unrelated independent reproduction. Phase 5 reviewed the linked full papers, not only their abstracts.

## S1 - Recurrent-depth latent reasoning

- Title: *Scaling up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach*
- Authors: Jonas Geiping, Sean McLeish, Neel Jain, John Kirchenbauer, Siddharth Singh, Brian R. Bartoldson, Bhavya Kailkhura, Abhinav Bhatele, Tom Goldstein
- Year: 2025
- Primary URL: https://arxiv.org/abs/2502.05171
- Identifier: arXiv:2502.05171v2; https://doi.org/10.48550/arXiv.2502.05171
- Source/evidence type: primary preprint; author-reported architecture and experiments; source page also links code/model
- Exact support reviewed: abstract; §3 architecture; §5 results and representation-collapse discussion
- Safe wording: The authors study a model that repeats a recurrent block, allowing test-time depth to vary while computation occurs in latent state rather than by emitting additional reasoning tokens.
- Do not claim: all models improve monotonically with depth; arbitrary recurrence is safe; our grid system reproduces this model; the paper independently proves a cognitive process.
- Planned use: definition of recurrent-depth test-time scaling and contrast with token-generating approaches.

## S2 - Coconut continuous thought

- Title: *Training Large Language Models to Reason in a Continuous Latent Space*
- Authors: Shibo Hao, Sainbayar Sukhbaatar, DiJia Su, Xian Li, Zhiting Hu, Jason Weston, Yuandong Tian
- Year: 2024 (COLM 2025; arXiv version 4 dated 2026)
- Primary URL: https://arxiv.org/abs/2412.06769
- Identifier: arXiv:2412.06769v4; https://doi.org/10.48550/arXiv.2412.06769
- Source/evidence type: primary paper; author-reported method and experiments
- Exact support reviewed: abstract; §3 method; §4 experiments; §6 limitations
- Safe wording: Coconut feeds a model's last hidden state back as a subsequent continuous input representation rather than decoding that intermediate state into a word token.
- Do not claim: Coconut and recurrent-depth models are architecturally identical; its reported search interpretation is established for all tasks; our BFS oracle models Coconut internals.
- Planned use: landscape comparison showing that “latent reasoning” covers more than one mechanism.

## S3 - BDH / Dragon Hatchling

- Title: *The Dragon Hatchling: The Missing Link between the Transformer and Models of the Brain*
- Authors: Adrian Kosowski, Przemysław Uznański, Jan Chorowski, Zuzanna Stamirowska, Michał Bartoszkiewicz
- Year: 2025
- Primary URL: https://arxiv.org/abs/2509.26507
- Identifier: arXiv:2509.26507v1; https://doi.org/10.48550/arXiv.2509.26507
- Source/evidence type: primary developer paper; author-reported architecture and experiments
- Exact support reviewed: abstract; §1.2–1.3; §2 graph dynamics; §3 GPU formulation; §4 and §6 analyses
- Safe wording: The paper introduces BDH (Dragon Hatchling) as a graph-based, attention-based state-space sequence architecture built from locally interacting neuron particles; the authors describe its inference working memory through synaptic plasticity/Hebbian learning and report sparse positive activations.
- Do not claim: biological equivalence is independently established; all of BDH's claimed capabilities are reproduced by its public code; our grid recurrence implements BDH; BDH itself is the same mechanism as recurrent-depth Transformer models.
- Planned use: define BDH and establish that its memory/state mechanism is materially different from our toy propagation system.

## S4 - BDH-CQ

- Title: *BDH-CQ: In-Context Learning with Recurrent Latent Reasoning*
- Authors: Björn Engdahl, Adrian Kosowski, Jan Chorowski, Zuzanna Stamirowska, Przemysław Uznański, Junlin Jiang, Rohan Phadke, Remigiusz Kinas, Richard Zhong
- Year: 2026
- Primary URL: https://arxiv.org/abs/2608.09888
- Identifier: arXiv:2608.09888v1; https://doi.org/10.48550/arXiv.2608.09888
- Source/evidence type: primary developer paper; author-reported model and ARC-AGI-1 evaluation
- Exact support reviewed: abstract; §3.1–3.3; §5 evaluation; §6 controlled behavior and failures
- Safe wording: The authors introduce BDH-CQ as combining in-context learning with recurrent latent reasoning: inference inputs update recurrent memory, followed by iterative high-dimensional latent computation without verbalized intermediate reasoning.
- Quantitative wording allowed only with evidence label: The paper reports a 150M-parameter configuration at 29.5% pass@2 and a computed inference cost of $0.0007 per ARC-AGI-1 task. This is developer-reported and not independently reproduced here.
- Do not claim: our artifact verifies those numbers; BDH-CQ is generally state of the art; the comparison covers every published system; the toy model has BDH-CQ's in-context learning or recurrent memory.
- Planned use: mandatory in-flow connection and published-evidence panel.

## Verification boundaries

- Four recent primary sources (2024-2026) are recorded, satisfying the minimum count.
- Current allowed claims are limited to authorship, dates, identifiers, and statements directly supported by the primary abstracts.
- The in-app mechanism diagram is an original textual synthesis; no paper figure or equation is copied.
- No unrelated third-party reproduction of BDH or BDH-CQ was identified. BDH-CQ reports a black-box audit involving paper co-authors, which is not relabeled as unrelated replication.
- BDH-CQ says dimensions, exact update rules, implementation details, and parts of the training recipe remain proprietary. The UI exposes this limitation.
