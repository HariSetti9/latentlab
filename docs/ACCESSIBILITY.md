# Accessibility and Responsive QA

## Implemented

- Semantic landmarks, heading hierarchy, fieldset/legend, labels, native buttons, select, and range controls.
- Visible 3px focus treatment and 44px minimum button height; primary journey targets are 44×44px.
- Sandbox cells are keyboard-focusable native buttons with a visible focus overlay.
- Invalid sandbox changes are rejected with an immediate `role="alert"` explanation.
- Grid visualization exposes a complete plain-language accessible name; a persistent sentence summarizes estimate versus BFS truth.
- Correctness has text and symbols, not color alone. Walls use pattern and `×`; paths use an outline.
- `prefers-reduced-motion: reduce` removes meaningful transition duration and smooth scrolling.
- Playback shows only stored engine states and can be paused/reset.
- No account, persistence, analytics, or personal-data collection.

## Responsive browser checks

Verified with installed Chrome in headless mode at 360, 390, 768, 1024, and 1440 CSS pixels. At every width:

- no document-level horizontal overflow;
- depth 6 produced the engine-derived distance-6 agreement;
- switching to the limitation preset rendered the engine-derived step-3 plateau;
- no console errors or Vite error overlay appeared.

Screenshots:

- `docs/qa/desktop-depth6.png`
- `docs/qa/mobile-390.png`
- `docs/qa/tablet-768.png`

## Remaining formal audits

Phase 8 will run the dedicated automated accessibility audit and a final manual keyboard/screen-reader pass. Phase 4 covers foundational semantics, focus, text alternatives, motion preference, touch sizing, and responsive behavior.
