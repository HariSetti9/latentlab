# Architecture and Research Decisions

This log is append-only in spirit: superseded decisions remain recorded with their replacement.

## D-001: Use one narrow falsifiable claim

- Status: accepted
- Decision: Every interaction and document supports the claim in `PROJECT_CHARTER.md`.
- Why: The rubric rewards a reproducible learning moment and technical depth over feature count.
- Rejected: a broad latent-reasoning dashboard or chatbot, because either obscures the causal variable and weakens defensibility.

## D-002: Start with deterministic grid-state recurrence

- Status: provisional until Phase 3 experiment gate
- Decision: Implement recurrent reachability/distance propagation on small mazes with a fixed-size state and independently tested BFS truth.
- Why: It gives real recurrent computation, direct control over update count, visible state, deterministic reproduction, browser-speed execution, and interpretable failure/saturation behavior.
- Alternative: train a small neural recurrent model. This may be adopted only if reproducible training and honest failure cases materially improve the lesson.
- Alternative: use prerecorded model traces. Rejected as the primary interaction because the specification requires live meaningful computation.

## D-003: Static browser-first architecture

- Status: accepted
- Decision: Vite, React, TypeScript, semantic HTML, and lightweight SVG/CSS; Vitest and Playwright; GitHub Actions and GitHub Pages.
- Why: No backend is needed for deterministic local inference. This minimizes latency, credentials, cost, privacy risk, and deployment fragility.
- Deployment fallback: Vercel only if static hosting proves incompatible.

## D-004: Separate evidence classes in both UI and repository

- Status: accepted
- Decision: Use explicit labels for `LIVE COMPUTATION`, `ALGORITHMIC TOY`, `OUR EXPERIMENT`, `PRECOMPUTED RESULT`, `PUBLISHED RESULT`, and `ILLUSTRATION`.
- Why: Prevents the toy substrate from being mistaken for BDH/BDH-CQ and makes provenance judge-verifiable.

## D-005: Independently compute truth

- Status: accepted
- Decision: BFS/transparent graph search will not import or call the recurrent estimator implementation.
- Why: A shared implementation could make agreement circular and undermine the falsifiable comparison.

## D-006: Research before learner-facing scientific copy

- Status: accepted
- Decision: Phase 1 creates a primary-source ledger before technical claims or BDH copy are implemented.
- Why: BDH/BDH-CQ terminology is niche and must be verified rather than inferred from names or secondary summaries.

## D-007: Derive UI from experiment results

- Status: accepted
- Decision: React stores learner choices, not duplicated computation. The complete result is derived through `runExperiment`.
- Why: Prevents stale UI state and makes every visible value traceable to Phase 3 code.

## D-008: One small convergence chart

- Status: accepted
- Decision: Use a dependency-free SVG line of changed cells per real recurrent step.
- Why: It makes propagation and the limitation fixed point visible without decorative telemetry.

## D-009: Keep sandbox secondary but complete

- Status: accepted
- Decision: Place a validated 4x4 editor after the guided comparison.
- Why: It makes the substrate reusable without delaying the default one-minute learning path.

## D-010: Treat BDH-CQ as a conceptual connection, not an implementation target

- Status: accepted
- Decision: Connect the toy only through repeated internal computation; compare state, learning, outputs, and evidence explicitly.
- Why: BDH-CQ's paper distinguishes recurrent contextual memory from a latent query workspace, while the toy has neither learned mechanism.

## D-011: Use typed research data and an original simplified diagram

- Status: accepted
- Decision: Source cards, claims, and comparison rows live in `src/research/`; the UI diagram is an original text/CSS synthesis.
- Why: This makes citations testable, avoids copying paper graphics, and prevents research copy from scattering through JSX.

## D-012: Do not call the BDH-CQ audit unrelated replication

- Status: accepted
- Decision: State that the paper reports a black-box audit involving paper co-authors and that this review found no unrelated third-party reproduction.
- Why: “Independent” without that qualification would overstate the evidence.

## D-013: Package a small corpus, not a benchmark

- Status: accepted
- Decision: Evaluate 10 transparent fixtures at 8 depths and retain item-level outputs without a headline accuracy percentage.
- Why: The corpus tests reproducibility and boundary behavior, but its hand construction does not support population inference.

## D-014: Separate deterministic artifacts from environment reports

- Status: accepted
- Decision: Hash evaluation, preset reports, and generating sources; exclude screenshots and the timestamped reproduction report.
- Why: Deterministic integrity should not be invalidated by honest environment metadata.

## D-015: Generate PDFs from reviewable Markdown

- Status: accepted
- Decision: Keep concept/blog source in Markdown and generate fixed judge PDFs with a checked-in ReportLab script and pinned document dependencies.
- Why: Reviewable prose and repeatable output are easier to audit than hand-edited binary deliverables.

## D-016: Keep the Phase 7 package explicitly provisional

- Status: accepted
- Decision: Assemble `submission/final-package/` without inventing public URLs, a video, a final ZIP, or submission confirmation; validate those gaps in pending mode.
- Why: Publication and final submission require later deployment and human actions, while the current materials can still be frozen and audited.

## D-017: Prefer configurable static base paths

- Status: accepted
- Decision: Use `VITE_BASE_PATH`, default `/`, and exercise a repository subpath in CI.
- Why: The same static source can deploy to GitHub Pages, a custom domain, or Vercel without hardcoded machine/repository paths.

## D-018: Treat browser and accessibility support as evidence-scoped

- Status: accepted
- Decision: Claim only Chrome/Edge and custom semantic checks locally; record Firefox, Safari, native screen reader, and hosted Linux CI as untested until those environments run.
- Why: Absence of a local executable or tool is not evidence of compatibility.
