# Phase 8 Release Gate

Allowed states: `PASS`, `BLOCKED_BY_PHASE_9`, `USER_ACTION_REQUIRED`, `FAIL`.

| Gate | State | Evidence / next condition |
|---|---|---|
| Scientific correctness | PASS | Claim and BDH adversarial audits; bounded terminology |
| Recurrent engine | PASS | Deterministic engine and tests |
| Oracle independence | PASS | Separate implementation plus source-boundary regression tests |
| Research evidence | PASS | Four live primary links, typed claims, evidence labels |
| BDH non-equivalence | PASS | Warning, table, defense, adversarial classification |
| Accessibility | PASS | Production semantic/keyboard/responsive gates; no critical observed defect |
| Mobile | PASS | 360 and 390 px production checks after overflow fix |
| Browser compatibility | PASS | Chrome and Edge tested; Firefox/Safari explicitly residual |
| CI | PASS | Ubuntu workflow is present and syntax-checked; hosted execution awaits publication |
| Clean reproduction | PASS | One-command workflow includes tests, build, citations, links, licenses, hygiene, artifacts |
| PDFs | PASS | Independent Phase 8 structural/render/visual audit |
| README | PASS | Judge-facing and deliverables-first; public links explicitly pending |
| Provenance | PASS | Complete material ownership/source table |
| AI disclosure | PASS | Transparent scope and human responsibility |
| Licenses | PASS | 266 resolved package records; no missing metadata; assets covered |
| Demo readiness | PASS | Script rehearsed against production UI; recording checklist added |
| Public repository | BLOCKED_BY_PHASE_9 | Publish and verify signed-out access |
| Live deployment | BLOCKED_BY_PHASE_9 | Deploy only after this phase |
| Video URL | USER_ACTION_REQUIRED | Record/upload and verify signed-out playback |
| Strict release validation | BLOCKED_BY_PHASE_9 | Correctly rejects explicit pending markers; additionally requires three HTTPS final-link fields |
| Final ZIP | BLOCKED_BY_PHASE_9 | Must be assembled only after verified URLs/video |
| Unstop submission | USER_ACTION_REQUIRED | Human owner uploads/clicks Submit and verifies confirmation |

Overall Phase 8 gate: **PASS**. There are no `FAIL` items. Publication and human-action states are intentionally non-fail blockers.
