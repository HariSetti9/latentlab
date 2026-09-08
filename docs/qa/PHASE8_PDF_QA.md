# Phase 8 Independent PDF Red-Team

The committed PDFs were reopened independently of the Phase 7 record, page-count/text/link structure was rechecked, all pages were re-rendered with Poppler, and every rendered page was visually inspected.

| PDF | Result | Red-team conclusion |
|---|---|---|
| `concept-summary.pdf` | PASS - exactly 1 page, 4 link annotations | Central claim is in the first third; mechanism, depth contrast, fixed-point limit, BFS independence, BDH non-equivalence, evidence maturity, limitations, and takeaway are self-contained; body/citations remain readable with no clipping or crowding defect |
| `blog.pdf` | PASS after fix - 3 pages, 4 link annotations | Initial reinspection caught adjacent source bullets running together on page 3; generator spacing was fixed, both PDFs regenerated, and all pages rechecked with no orphan page/heading, markdown artifact, broken glyph, clipping, overlap, malformed citation, or excessive whitespace |

Phase 8 changed only list spacing in the PDF generator; prose and claims were unchanged. Both binaries were regenerated from their Markdown sources and the concept brief remained exactly one page.

The generator now uses ReportLab invariant mode. Two consecutive generations produced identical SHA-256 values for each PDF; CI regenerates them and fails if either committed binary changes.
