# LATENTLAB

LATENTLAB is a local, inspectable learning experiment about recurrent latent computation. Change the number of hidden-state updates, compare the result with a separate BFS oracle, observe saturation, then connect the narrow lesson to recurrent-depth, Coconut, BDH, and BDH-CQ research without claiming architectural equivalence.

## Run locally

```bash
pnpm install
pnpm dev
```

Quality gate:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm check:citations
```

## Evidence boundaries

- `LIVE COMPUTATION / OUR EXPERIMENT`: deterministic code in `src/core/`, checked against a separate BFS oracle.
- `AUTHOR-REPORTED PREPRINT`: BDH/BDH-CQ mechanisms and results reported in their primary papers; not reproduced here.
- `CONCEPTUAL COMPARISON`: a bounded mechanism-level relationship, never an implementation equivalence.

The Phase 5 module is implemented in `src/components/ResearchModule.tsx` with typed content in `src/research/`. See `docs/BDH_INTEGRATION.md` and `docs/JUDGE_DEFENSE_BDH.md` for the full boundary and defense.

## Primary research

- [Recurrent depth (Geiping et al.)](https://arxiv.org/abs/2502.05171)
- [Coconut (Hao et al.)](https://arxiv.org/abs/2412.06769)
- [BDH / Dragon Hatchling (Kosowski et al.)](https://arxiv.org/abs/2509.26507)
- [BDH-CQ (Engdahl et al.)](https://arxiv.org/abs/2608.09888)

No account, remote inference, analytics, or personal-data collection is used by the artifact.
