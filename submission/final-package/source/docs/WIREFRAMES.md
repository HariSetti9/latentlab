# Low-Fidelity Wireframes

## Desktop guided view

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ LATENTLAB       LIVE COMPUTATION · ALGORITHMIC TOY Evidence / Reproduce │
├──────────────────────────────────────────────────────────────────────────┤
│ Can an AI think longer without talking longer?                          │
│ Change one number. Watch a fixed-size hidden state update before output. │
│                                                                          │
│ Reasoning updates  [1] [2] [4 selected] [8] [16]   Step 1 of 5          │
├────────────────────────────────────┬─────────────────────────────────────┤
│ PUZZLE + TASK-RELEVANT STATE       │ ESTIMATE          REFERENCE         │
│ legend: start / goal / wall /      │ reachable         reachable         │
│ reached-at-step / frontier         │ distance: 7       shortest: 7       │
│                                    │ ✓ agrees          BFS, independent  │
│       interactive 9×9 grid         │                                     │
│                                    │ THIS UPDATE                         │
│ text alternative below             │ 6 cells changed; goal first reached │
├────────────────────────────────────┴─────────────────────────────────────┤
│ [Back]  Try fewer updates → observe → compare with truth       [Next]   │
└──────────────────────────────────────────────────────────────────────────┘
```

## Mobile guided view

```text
┌────────────────────────────┐
│ LATENTLAB       Evidence   │
│ Can an AI think longer     │
│ without talking longer?    │
│ [1] [2] [4] [8] [16]      │
├────────────────────────────┤
│ live 9×9 state grid        │
│ + non-color legend         │
├────────────────────────────┤
│ ESTIMATE  ↔  BFS TRUTH     │
│ distance 7    shortest 7   │
│ ✓ agrees                   │
├────────────────────────────┤
│ This update: 6 changed     │
│ [Back]             [Next]  │
└────────────────────────────┘
```

## Challenge and BDH-CQ flow

```text
CHALLENGE
[Load limitation case]
Updates: 2 → 4 → 8 → 16
Measured timeline: incorrect → correct → fixed point → same fixed point
Question: Did every extra update help? [No: some only added work]

CONNECT
┌────────────────┬──────────────────┬────────────────────────┐
│ Explicit tokens│ Our live toy     │ Published BDH / BDH-CQ │
│ visible text   │ grid state       │ learned recurrent state│
│ sequence grows │ fixed-size state │ different architecture │
└────────────────┴──────────────────┴────────────────────────┘
Prominent: “ANALOGY, NOT EQUIVALENCE”
Evidence labels and primary-source links remain in the same viewport.
```

## Sandbox

```text
PUZZLE EDITOR       UPDATES / SEED       RESULT
[keyboard grid]     [0 ───●──── 32]      estimate ↔ BFS truth
[clear] [preset]    [seed 12]            state delta / fixed point
Inline validation and always-visible text state summary.
```

## Rejected layouts

- A multi-card analytics dashboard: splits attention across decorative metrics.
- Separate “About BDH” appendix page: breaks the causal learning flow.
- Full-screen animated activation cloud: hard to interpret and inaccessible.
- Blank editor landing page: delays the first meaningful observation.

## Phase 4 implementation result

The implemented responsive layout follows these wireframes with one refinement: on desktop, the guided prompt sits beside the opening question while the live lab begins immediately below; on mobile, both stack before the experiment. Estimate and BFS reference remain paired in the same summary panel at every verified width.
