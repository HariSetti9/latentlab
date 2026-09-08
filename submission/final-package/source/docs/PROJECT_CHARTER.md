# LATENTLAB Project Charter

## Mission

Build a public, reproducible interactive laboratory that lets a technically curious learner test whether a system can spend more inference compute by repeatedly updating a fixed-size hidden state without emitting a verbal chain of thought.

## Central falsifiable claim

> A system can perform repeated latent computation without producing a verbal chain of thought; additional recurrent updates can change its prediction, but more updates are not guaranteed to help indefinitely.

The artifact must expose evidence that could contradict this claim: the recurrent update count, model state, model prediction, independently computed truth, error, and at least one honestly observed saturation, oscillation, or interference case.

## Intended learner

An average data scientist or technically curious machine-learning student who understands vectors, neural-network basics, and Transformers at a high level but has not studied recurrent latent reasoning or BDH/BDH-CQ.

## Prerequisites

- Vectors can store intermediate information.
- Neural networks transform inputs into outputs.
- Transformer language models ordinarily emit tokens sequentially.
- No graph-search, recurrent-network, or BDH knowledge is assumed.

## Learning objectives

After the guided experience, a learner should be able to:

1. Define latent-space reasoning as repeated computation in internal state without requiring intermediate natural-language tokens.
2. Explain how changing recurrent update count changes computation while hidden-state size remains fixed.
3. Compare the toy model's estimate against an independent deterministic ground truth.
4. Explain why more recurrent updates may help, saturate, oscillate, or interfere rather than guaranteeing improvement.
5. Distinguish the educational substrate from published BDH/BDH-CQ mechanisms and evidence.

## 60-second success test

Within 60 seconds, a first-time learner can:

1. See a meaningful preset already running.
2. change reasoning iterations;
3. observe a measured state and prediction change;
4. compare the result with visible ground truth;
5. try a real limitation case; and
6. explain that more hidden-state updates spend more inference compute without narrating intermediate text, while naming one limitation.

## Real computational substrate

The planned substrate is a small, deterministic recurrent state-propagation system for grid reachability/shortest-path puzzles. Each update propagates task-relevant information through a fixed-size grid state. A separate breadth-first-search solver supplies ground truth. The visible iteration control executes actual updates locally. A learned recurrent model remains an option only if Phase 1 evidence and Phase 3 experiments show that it adds educational value without reducing reproducibility.

This is a toy educational/research system. It is not BDH, BDH-CQ, a reproduction of either, or evidence about an unavailable checkpoint.

## Scope

- One guided normal case, one empirically verified limitation case, and a compact sandbox.
- Local browser computation with deterministic fixtures.
- Honest hidden-state projection and measured captions.
- In-flow, primary-sourced BDH/BDH-CQ comparison.
- Reproducible evaluation, responsive accessible interface, complete provenance, documentation, PDFs, QA evidence, deployment configuration, and ZIP-ready submission.

## Explicit non-goals

- Chatbot, chain-of-thought generator, general-purpose model playground, static slideshow, or decorative dashboard.
- Claiming cognitive equivalence, general reasoning ability, official BDH behavior, or universal benefit from extra inference compute.
- Fabricated user-study, benchmark, latency, deployment, or publication evidence.
- Backend or account system unless later proven essential.

## Success metrics

- The iteration control maps one-to-one to recurrent updates and changes measured state on tested fixtures.
- Ground truth is independently computed and visible beside the estimate.
- A normal and a limitation case are reproducible with fixed commands and seeds where applicable.
- Ordinary interaction completes under one second on representative desktop and mobile test targets when measured.
- Keyboard, contrast, text-equivalent, responsive, and reduced-motion checks pass.
- Lint, type-check, unit, E2E, build, citation, link, secret, and clean-install checks pass.
- Every strong scientific claim has verified primary-source support or an explicit toy/experiment label.
- All seven judging criteria point to concrete repository evidence.

## Operating constraints

The PDF specification is authoritative for scope and phase gates. Scientific sources are authoritative for technical claims. Public links remain explicit placeholders until verified. No secrets, private data, invented citations, or manually fabricated results may enter the repository.
