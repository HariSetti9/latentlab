# DataForge Pathway Scorecard

Statuses: `NOT STARTED`, `IN PROGRESS`, `EVIDENCED`, `BLOCKED`.

| Criterion | Points | Implementation target | Concrete evidence | Status |
|---|---:|---|---|---|
| Technical correctness and depth | 25 | Verified claims; real recurrent updates; independent truth; equations, code, metrics, and limitations agree | `research/`, `src/lib/`, `tests/`, `evaluation/`, `docs/RESULTS.md` | IN PROGRESS |
| Technical ownership and live defense | 15 | Small inspectable architecture; model card; decision log; commands and component roles documented | `docs/DECISIONS.md`, `docs/EXPERIMENT_PROTOCOL.md`, `artifacts/model-card.md`, `README.md` | IN PROGRESS |
| Learning effectiveness | 15 | Guided 60-second flow, explicit learner/objectives, self-check, explain-back prompt | `docs/PROJECT_CHARTER.md`, `docs/PRODUCT_SPEC.md`, `docs/LEARNING_TEST.md`, E2E test | IN PROGRESS |
| Interactive substrate and honesty | 15 | Live iteration control, visible measured state, estimate beside truth, evidence labels, fast feedback | application, unit/E2E tests, `docs/qa/` | NOT STARTED |
| BDH/BDH-CQ integration and evidence | 10 | Primary-sourced in-flow module; direct/adjacent/non-equivalent distinctions; published vs own evidence | `research/BDH_NOTES.md`, claims ledger, application module | IN PROGRESS |
| Craft, robustness, accessibility, provenance | 10 | Mobile/keyboard/reduced motion; clean load/error states; reproducibility; credits/licenses | QA reports, Playwright, provenance and license files, CI | NOT STARTED |
| One-page concept summary | 10 | Readable, self-contained, comparative, evidence-aware, primary-sourced, precise | `docs/CONCEPT_SUMMARY.md`, `docs/concept-summary.pdf` | NOT STARTED |
| **Total** | **100** | No self-score until evidence exists | `docs/JUDGE_AUDIT.md` in Phase 8 | IN PROGRESS |

## Exceptional-work target

The default live preset must let a learner reproduce the central claim and encounter its limitation in under one minute. The substrate, fixtures, evaluation, and teaching copy should remain useful after the event.
