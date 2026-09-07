# Phase 4 Browser QA Record

Date: 2026-09-07  
Browser: installed Google Chrome, automated through bundled Playwright  
Server: local Vite development server at `127.0.0.1:4173`

| Check | Result |
|---|---|
| Default page contains meaningful preset | PASS |
| Deterministic route depth 6 | PASS - recurrent distance 6, BFS shortest 6, agrees |
| Console errors | PASS - none after local favicon fix |
| Framework error overlay | PASS - absent |
| Horizontal overflow at 360/390/768/1024/1440 | PASS - absent |
| Depth control interaction | PASS at all five widths |
| Limitation switch | PASS - fixed point reported at step 3 |
| Reduced-motion context at 390 | PASS |
| Desktop visual inspection | PASS - hierarchy, grid, reference, chart, comparison, sandbox legible |
| Mobile visual inspection | PASS - stacked flow, reachable controls, grid and chart legible |

This QA establishes local behavior only. It is not production deployment evidence.
