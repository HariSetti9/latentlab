# LATENTLAB

> Can an AI think longer without talking longer?

LATENTLAB is a one-minute interactive experiment about recurrent latent-space reasoning. A learner changes the number of real, local hidden-state updates in a deterministic grid system, watches information propagate, and compares its depth-limited estimate with an independently computed BFS reference.

## Deliverables

| Deliverable | Link |
|---|---|
| Live interactive artifact | [harisetti9.github.io/latentlab](https://harisetti9.github.io/latentlab/) |
| Source repository | [github.com/HariSetti9/latentlab](https://github.com/HariSetti9/latentlab) |
| Hosted CI | [GitHub Actions final-closure workflow](https://github.com/HariSetti9/latentlab/actions/runs/34488924796) |
| Demo video | [DATA Forge.mp4 — public Google Drive viewer](https://drive.google.com/file/d/1oL_ZrvSv_TnQjrAhmGorMHfysxlVev8X/view) |
| One-page concept summary | [docs/concept-summary.pdf](docs/concept-summary.pdf) |
| Blog | [docs/blog.pdf](docs/blog.pdf) |
| Judge quickstart | [JUDGE_QUICKSTART.md](JUDGE_QUICKSTART.md) |

## The claim

> A system can perform repeated latent computation without producing a verbal chain of thought; additional recurrent updates can change its prediction, but more updates are not guaranteed to help indefinitely.

Try it in 60 seconds: open the default **Depth Matters** puzzle at depth 4, where the goal is not yet reached; change depth to 6 and observe the estimate agree with BFS; then load **More work, same answer**, where the state stabilizes at step 3 even if depth 16 is requested. These are live outputs from a deliberately algorithmic, non-learned toy - not scripted animation or a benchmark claim.

## Learner and objectives

LATENTLAB is for an average data scientist or technically curious ML student familiar with vectors, neural-network basics, and Transformers at a high level. Graph search, recurrence, and BDH are explained in context.

After the guided flow, a learner should be able to describe recurrent latent computation, connect update count to visible state change, compare an estimate with independent truth, distinguish internal updates from generated reasoning tokens, and explain why extra computation may saturate.

## What the learner manipulates

The **reasoning depth** control maps one-to-one to synchronous updates of a fixed-size grid state. At each update, traversable cells receive the smallest neighbor distance plus one; no natural-language intermediate steps are generated. The visualization shows the task-relevant state itself, plus changed cells, convergence delta, current prediction, and exact update count.

```text
Puzzle -> initialize fixed-size state -> repeat local update N times -> read goal estimate
                                        |
                                        +-> compare with separate BFS reference
```

The React UI derives every result from the same typed engine used by tests and evaluation. Core modules separate validation, recurrence, trace assembly, metrics, presets, and BFS. See [UI architecture](docs/UI_ARCHITECTURE.md) and [computational substrate](docs/COMPUTATIONAL_SUBSTRATE.md).

## Evidence and examples

- **Depth sensitive:** [depth 4](https://harisetti9.github.io/latentlab/?fixture=depth-matters-winding&depth=4) is incomplete; [depth 6](https://harisetti9.github.io/latentlab/?fixture=depth-matters-winding&depth=6) reaches the goal at BFS distance 6.
- **Saturation:** [depth 16 limitation](https://harisetti9.github.io/latentlab/?fixture=limitation-island&depth=16) reaches a fixed point at step 3; later requested updates raise the operation proxy but do not alter state or output.
- **Reference:** BFS is implemented separately and is never consumed by recurrent inference.
- **Evaluation:** a small hand-constructed reproducibility corpus covers 10 fixtures at 8 depths (80 item-level cases). It is not a benchmark and supports no population accuracy headline.

Major claims, evidence, and limitations are mapped in the [evidence matrix](docs/EVIDENCE_MATRIX.md). Metric formulas and non-claims are in [METRICS.md](docs/METRICS.md).

## BDH and BDH-CQ

The conceptual bridge is repeated internal computation before decoding an answer. BDH's authors describe learned graph/local dynamics and evolving inference state [S3](https://arxiv.org/abs/2509.26507). BDH-CQ's authors distinguish demonstration-conditioned recurrent contextual memory from an iterative latent query workspace [S4](https://arxiv.org/abs/2608.09888).

**LATENTLAB is not BDH or BDH-CQ.** It has no learned weights, neural latent workspace, in-context learning, language model, or ARC evaluation. Published mechanisms and results are author-reported and were not reproduced here. See [BDH integration](docs/BDH_INTEGRATION.md).

## What is live and what is not

| Category | Project material |
|---|---|
| **LIVE COMPUTATION** | Recurrence, BFS, trace, grid, metrics, depth comparisons |
| **PRECOMPUTED BUT REPRODUCIBLE** | Evaluation JSON/CSV, preset report, QA screenshots |
| **REGENERATABLE LOCAL ARTIFACT** | Checksums, PDFs, reproduction report |
| **PUBLISHED RESULT** | Cited BDH/BDH-CQ and adjacent research claims |
| **EDUCATIONAL ILLUSTRATION** | Original simplified research mechanism diagram |

The browser never reads committed evaluation artifacts to determine live outcomes. Full inventory: [LIVE_VS_PRECOMPUTED.md](docs/LIVE_VS_PRECOMPUTED.md).

## Setup and reproduction

Requirements: Node.js 22.13+ and pnpm 11.19.0.

```sh
corepack prepare pnpm@11.19.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm reproduce
```

PDF regeneration additionally requires Python 3 and `pip install -r requirements-docs.txt`; set the `PYTHON` environment variable if Python is not on `PATH`.

This regenerates evaluation artifacts, verifies preset semantics, runs 58 tests plus typecheck/lint/citation/link/license/hygiene checks and the production build, refreshes SHA-256 checksums, and writes an environment report. See [REPRODUCIBILITY.md](REPRODUCIBILITY.md), [artifact manifest](artifacts/MANIFEST.md), [test matrix](docs/TEST_MATRIX.md), and [CI workflow](.github/workflows/ci.yml).

## Limitations

The substrate is a specialized algorithm over tiny symbolic grids, not a trained neural model. It demonstrates a mechanism-level possibility, not language reasoning, cognition, calibrated confidence, general inference-time scaling, or BDH/BDH-CQ behavior. The operation proxy is depth times traversable cells - not latency, FLOPs, energy, tokens, or price. The limitation fixture shows saturation, not harmful overthinking. No participant study is claimed.

## Research, provenance, and licenses

Primary sources: [recurrent depth](https://arxiv.org/abs/2502.05171), [Coconut](https://arxiv.org/abs/2412.06769), [BDH](https://arxiv.org/abs/2509.26507), and [BDH-CQ](https://arxiv.org/abs/2608.09888). Exact supported wording and caveats live in [research/SOURCES.md](research/SOURCES.md) and the [claims ledger](research/CLAIMS_LEDGER.csv).

Application code, fixtures, diagrams, and documentation were created for LATENTLAB with AI assistance. There are no downloaded datasets, model weights, copied paper figures, external code snippets, icon packs, or image assets in the product UI. System fonts are used. See [PROVENANCE.md](docs/PROVENANCE.md), [AI_DISCLOSURE.md](docs/AI_DISCLOSURE.md), [SOURCES_AND_LICENSES.md](SOURCES_AND_LICENSES.md), and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Project code and original documentation are released under the [MIT License](LICENSE).

The team reviewed the implementation and accepts responsibility for every submitted claim; AI output was never treated as scientific evidence.
