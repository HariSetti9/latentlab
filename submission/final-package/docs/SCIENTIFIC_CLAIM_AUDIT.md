# Phase 8 Scientific Claim Red-Team

Scope: README, production UI, concept brief, blog, judge defenses, research ledger, and submission scripts.

| Term / claim family | Classification | Red-team conclusion |
|---|---|---|
| “Can an AI think longer…” | Framing question | Acceptable hook only because adjacent copy immediately identifies an algorithmic, non-learned toy and makes no cognition claim |
| reasoning / latent | Mechanism-level terminology | Bounded to repeated internal state updates before output without emitted intermediate text; no neural equivalence claimed |
| model | Potentially misleading for the toy | Prominent `TOY MODEL` label removed; “model” remains only when discussing published learned models or explicitly negating a trained model |
| cost / efficiency / scaling | High-risk quantitative language | Operation proxy is always depth x traversable cells and explicitly not FLOPs, latency, energy, tokens, dollars, or universal efficiency |
| accuracy / better | Performance risk | No headline accuracy or broad improvement claim; 10 fixtures / 80 cases remain a hand-constructed reproducibility corpus, not a benchmark |
| confidence | Calibration risk | No confidence UI; documents explicitly deny calibrated confidence |
| brain / memory / attention / Transformer | Published-system terminology | Retained only in sourced BDH/paper titles or author-description context; no biological equivalence |
| BDH / BDH-CQ / in-context learning | Equivalence risk | Repeated non-equivalence, author-reported evidence, proprietary details, and non-reproduction caveats remain visible |

Fixes: changed the opening evidence badge to `ALGORITHMIC TOY`; corrected demo narration that referred to a nonexistent disclosure control; added source-level oracle separation tests. No unsupported high-impact phrase remains in release-facing copy.
