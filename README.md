# LATENTLAB

LATENTLAB is a local, inspectable learning experiment about recurrent latent computation. Change the number of hidden-state updates, compare the result with a separate BFS oracle, observe saturation, then connect the narrow lesson to recurrent-depth, Coconut, BDH, and BDH-CQ research without claiming architectural equivalence.

## Quickstart

```bash
corepack prepare pnpm@11.19.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

## Reproduce the evidence

```bash
pnpm reproduce
```

This regenerates the 10-fixture/80-case deterministic evaluation, verifies all showcase presets, runs tests/typecheck/lint/citation/path/secret checks and the production build, refreshes SHA-256 checksums, and writes a reproduction report. See [REPRODUCIBILITY.md](REPRODUCIBILITY.md) and [the artifact manifest](artifacts/MANIFEST.md).

The evaluation is a small hand-constructed reproducibility corpus, not a benchmark. Item-level JSON and CSV are committed; no aggregate accuracy headline is claimed.

## Evidence boundaries

- `LIVE COMPUTATION / OUR EXPERIMENT`: deterministic code in `src/core/`, checked against a separate BFS oracle.
- `AUTHOR-REPORTED PREPRINT`: BDH/BDH-CQ mechanisms and results reported in their primary papers; not reproduced here.
- `CONCEPTUAL COMPARISON`: a bounded mechanism-level relationship, never an implementation equivalence.
- `PRECOMPUTED BUT REPRODUCIBLE`: committed evaluation and preset artifacts regenerated from source.

The Phase 5 module is implemented in `src/components/ResearchModule.tsx` with typed content in `src/research/`. See `docs/BDH_INTEGRATION.md` and `docs/JUDGE_DEFENSE_BDH.md` for the full boundary and defense.

The browser computes the recurrence, BFS reference, traces, comparisons, and metrics live. It does not read committed evaluation JSON to produce UI results. See [live/precomputed inventory](docs/LIVE_VS_PRECOMPUTED.md), [evidence matrix](docs/EVIDENCE_MATRIX.md), [metric definitions](docs/METRICS.md), and [test matrix](docs/TEST_MATRIX.md).

## Limits

This is a transparent algorithmic grid model, not a trained neural model or BDH implementation. The corpus supports inspection of these fixtures only. Operation proxy is not latency, FLOPs, energy, tokens, or price. Exact BDH-CQ internals and published ARC results are not reproduced here.

## Primary research

- [Recurrent depth (Geiping et al.)](https://arxiv.org/abs/2502.05171)
- [Coconut (Hao et al.)](https://arxiv.org/abs/2412.06769)
- [BDH / Dragon Hatchling (Kosowski et al.)](https://arxiv.org/abs/2509.26507)
- [BDH-CQ (Engdahl et al.)](https://arxiv.org/abs/2608.09888)

No account, remote inference, analytics, or personal-data collection is used by the artifact.
