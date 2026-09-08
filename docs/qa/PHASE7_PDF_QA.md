# Phase 7 PDF QA

Generated on 2026-09-08 from `docs/CONCEPT_SUMMARY.md` and `docs/BLOG.md` with `scripts/generate-pdfs.py` (ReportLab). Validation used `scripts/verify-pdfs.py` (pypdf), followed by Poppler PNG renders and visual inspection of every page.

| PDF | Pages | Machine check | Visual check |
|---|---:|---|---|
| `docs/concept-summary.pdf` | 1 | Readable text on the required single page | PASS: two-column layout, no clipping/overlap, footer and citations readable |
| `docs/blog.pdf` | 3 | Readable text on all pages | PASS after revision: balanced pagination, no orphan page, clipping, overlap, or markdown fence artifact |

Hyperlinked source labels are rendered from the Markdown source. The PDFs use built-in Helvetica/Courier faces and contain no externally sourced imagery.
