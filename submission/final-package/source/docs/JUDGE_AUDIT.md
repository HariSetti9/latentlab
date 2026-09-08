# Phase 8 Rubric Red-Team Audit

## 1. Technical correctness and depth

CATEGORY: Technical correctness and depth  
MAX POINTS: 25  
CURRENT SELF-SCORE: 24  
EVIDENCE: Deterministic synchronous recurrence, separate FIFO BFS, 10 fixtures / 80 cases, item-level artifacts, 58 tests, metrics definitions, fixed-point limitation.  
WEAKNESSES: The substrate is intentionally algorithmic and small; it does not demonstrate learned-model behavior.  
JUDGE OBJECTION: “Is this BFS visualized twice?”  
EXACT FIX: Added source-level independence regression tests and `BFS_RECURRENCE_AUDIT.md`; UI states that BFS evaluates but never feeds inference.  
STATUS: PASS

## 2. Technical ownership / live defense

CATEGORY: Technical ownership / live defense  
MAX POINTS: 15  
CURRENT SELF-SCORE: 14  
EVIDENCE: Compact typed modules, algorithm comments, model card, decision log, judge defense, and component-by-component ownership guide.  
WEAKNESSES: A document cannot prove every team member can answer live questions.  
JUDGE OBJECTION: “Can the team derive the update and operation proxy without reading notes?”  
EXACT FIX: Created `TECHNICAL_OWNERSHIP.md` with algorithms, structures, edge cases, rationale, and likely questions; team rehearsal remains a human action.  
STATUS: PASS

## 3. Learning effectiveness

CATEGORY: Learning effectiveness  
MAX POINTS: 15  
CURRENT SELF-SCORE: 14  
EVIDENCE: Default causal comparison, two-click 60-second path, persistent oracle explanation, limitation, guided journey, self-check, and explain-back prompt.  
WEAKNESSES: No external participants or learning-outcome study.  
JUDGE OBJECTION: “Is the one-minute claim tested with real learners?”  
EXACT FIX: Ran and documented an internal heuristic learning test without representing it as participant evidence. External learner testing remains future work.  
STATUS: PASS

## 4. Interactive substrate / honesty

CATEGORY: Interactive substrate / honesty  
MAX POINTS: 15  
CURRENT SELF-SCORE: 15  
EVIDENCE: Every depth control executes real updates; state, changed cells, fixed point, estimate, and independent truth are derived live; no decorative confidence or fake telemetry.  
WEAKNESSES: The operation proxy is deliberately simple.  
JUDGE OBJECTION: “Does moving the control merely reveal precomputed frames?”  
EXACT FIX: Trace generation is invoked from the live input/depth, determinism is tested, and precomputed evaluation is labeled separately.  
STATUS: PASS

## 5. BDH/BDH-CQ integration / evidence discipline

CATEGORY: BDH/BDH-CQ integration / evidence discipline  
MAX POINTS: 10  
CURRENT SELF-SCORE: 9  
EVIDENCE: Four current primary sources, typed citations/claims, in-flow diagram/table, evidence badges, proprietary-detail caveat, and repeated non-equivalence warning.  
WEAKNESSES: BDH and BDH-CQ were not reproduced; no unrelated replication was identified.  
JUDGE OBJECTION: “Is a grid propagation toy too weak an analogy?”  
EXACT FIX: Restricted the bridge to repeated internal computation before output and classified every connection; no architectural-equivalence or performance claim remains.  
STATUS: PASS

## 6. Craft / robustness / accessibility / provenance

CATEGORY: Craft / robustness / accessibility / provenance  
MAX POINTS: 10  
CURRENT SELF-SCORE: 9  
EVIDENCE: Chrome/Edge production matrix, five widths, 200% text check, semantic controls, skip link, reduced motion, focusable wide table, CI, configurable base path, provenance, AI disclosure, and 266-package license audit.  
WEAKNESSES: Firefox, Safari, a native screen reader, and Linux CI are not locally available; CI execution awaits publication.  
JUDGE OBJECTION: “Was accessibility reduced to a score?”  
EXACT FIX: Combined automated DOM gates with manual keyboard/visual review and recorded untested environments explicitly.  
STATUS: PASS

## 7. One-page concept summary

CATEGORY: One-page concept summary  
MAX POINTS: 10  
CURRENT SELF-SCORE: 10  
EVIDENCE: Exactly one A4 page; central claim appears in the first third; mechanism, two experiments, BFS, research boundary, evidence maturity, limitations, takeaway, and four linked citations are present.  
WEAKNESSES: Dense by design, though readable at normal zoom.  
JUDGE OBJECTION: “Were references made microscopic to force one page?”  
EXACT FIX: Re-rendered at 150 DPI and visually checked margins, citations, body size, clipping, and whitespace.  
STATUS: PASS

## Conservative score

| Category | Before fixes | After fixes | Lost points |
|---|---:|---:|---|
| Technical correctness | 23/25 | 24/25 | Toy is not evidence about learned systems |
| Technical ownership | 12/15 | 14/15 | Live team defense remains unobserved |
| Learning effectiveness | 12/15 | 14/15 | No external learner study |
| Interactive substrate | 14/15 | 15/15 | None after live/trace audit |
| BDH/evidence | 8/10 | 9/10 | No reproduction or unrelated replication |
| Craft/accessibility/provenance | 8/10 | 9/10 | Firefox/Safari/screen-reader/Linux CI untested locally |
| Concept summary | 9/10 | 10/10 | None after independent PDF reinspection |
| **TOTAL** | **86/100** | **95/100** | Remaining deductions are evidence limits, not fixable polish defects |

This is a self-assessment, not an organizer score.
