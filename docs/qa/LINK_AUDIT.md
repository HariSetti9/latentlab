# Phase 8 Link Audit

| Class | Result | Evidence |
|---|---|---|
| Internal Markdown links | VALID | `pnpm check:links` resolves links across README, quickstart, concept/blog sources, and submission documents |
| In-app hash links | VALID | `#experiment`, `#sandbox`, and `#evidence` target rendered IDs; production browser test reaches evidence |
| Query fixtures | VALID | Depth-sensitive and limitation routes load deterministically |
| S1 recurrent depth | VALID | Live arXiv abstract page and title verified 2026-09-08 |
| S2 Coconut | VALID | Live arXiv abstract page and title verified 2026-09-08 |
| S3 BDH | VALID | Live arXiv abstract page and title verified 2026-09-08 |
| S4 BDH-CQ | VALID | Live arXiv abstract page and title verified 2026-09-08 |
| GitHub/live artifact | VALID | Public repository, Pages root, three fixture URLs, Evidence anchor, and hosted CI run verified 2026-09-08 |
| Demo video | VALID | Public Google Drive file metadata and download access rechecked; release owner verified Incognito playback without sign-in |

No unnoticed invalid link was found. Network validation is point-in-time; external availability remains outside repository control.
