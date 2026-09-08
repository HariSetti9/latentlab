# DataForge Pathway Scorecard

Statuses: `NOT STARTED`, `IN PROGRESS`, `EVIDENCED`, `BLOCKED`.

| Criterion | Points | Implementation target | Concrete evidence | Status |
|---|---:|---|---|---|
| Technical correctness and depth | 25 | Verified claims; real recurrent updates; independent truth; equations, code, metrics, and limitations agree | `research/`, `src/core/`, `tests/`, `artifacts/metrics.json`, `docs/COMPUTATIONAL_SUBSTRATE.md` | EVIDENCED |
| Technical ownership and live defense | 15 | Small inspectable architecture; model card; decision log; commands and component roles documented | `docs/DECISIONS.md`, `docs/EXPERIMENT_PROTOCOL.md`, `artifacts/model-card.md`, `README.md` | EVIDENCED |
| Learning effectiveness | 15 | Guided 60-second flow, explicit learner/objectives, self-check, explain-back prompt | `docs/LEARNING_TEST.md`, `src/components/GuidedJourney.tsx`, component/browser QA | EVIDENCED: internal heuristic, no external study |
| Interactive substrate and honesty | 15 | Live iteration control, visible measured state, estimate beside truth, evidence labels, fast feedback | `src/core/`, `src/components/`, `tests/app.test.tsx`, `docs/qa/` | EVIDENCED |
| BDH/BDH-CQ integration and evidence | 10 | Primary-sourced in-flow module; direct/adjacent/non-equivalent distinctions; published vs own evidence | `research/BDH_NOTES.md`, `src/research/`, `src/components/ResearchModule.tsx`, `docs/JUDGE_DEFENSE_BDH.md` | EVIDENCED |
| Craft, robustness, accessibility, provenance | 10 | Mobile/keyboard/reduced motion; clean load/error states; reproducibility; credits/licenses | `docs/qa/ACCESSIBILITY_AUDIT.md`, `.github/workflows/ci.yml`, `docs/PROVENANCE.md` | EVIDENCED with browser/AT residuals |
| One-page concept summary | 10 | Readable, self-contained, comparative, evidence-aware, primary-sourced, precise | `docs/CONCEPT_SUMMARY.md`, `docs/concept-summary.pdf`, `docs/qa/PHASE8_PDF_QA.md` | EVIDENCED |
| **Total** | **100** | Conservative self-score after fixes: 95/100 | `docs/JUDGE_AUDIT.md` | EVIDENCED; publication blockers remain |

## Exceptional-work target

The default live preset must let a learner reproduce the central claim and encounter its limitation in under one minute. The substrate, fixtures, evaluation, and teaching copy should remain useful after the event.
