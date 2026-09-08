# Phase 8 Production Browser Matrix

Production files were served with `vite preview`. Each tested engine loaded the app, changed depth 4 to 6, switched to the limitation preset, reached the research module, produced no console/page errors, and passed document-overflow checks at 360, 390, 768, 1024, and 1440 CSS px.

| Browser | Engine/build source | Result | Notes |
|---|---|---|---|
| Google Chrome | Installed stable Chromium executable | PASS | 5 widths, query fixture, depth, limitation, evidence, console, semantics |
| Microsoft Edge | Installed stable Chromium executable | PASS | Same 5-width production matrix |
| Firefox | No compatible local executable | UNTESTED | Must be checked in Phase 9 or CI/browser service if available |
| Safari | Unavailable on Windows | UNTESTED | Requires macOS/iOS |

External citation URLs were validated separately against the four live arXiv abstract pages. “Browser compatibility” in the release gate means the two tested Chromium browsers only.
