import type { ResearchClaim } from './types';

export const researchClaims = [
  { id: 'C-BDH-01', text: 'BDH represents learned parameters in graph topology/weights and describes inference state as evolving edge reweighting.', sourceIds: ['S3'], evidence: 'author-reported preprint', caveat: 'Architecture description from its authors; not reproduced here.' },
  { id: 'C-CQ-01', text: 'BDH-CQ processes demonstrations into recurrent contextual memory, then iterates a separate latent query workspace before decoding.', sourceIds: ['S4'], evidence: 'author-reported preprint', caveat: 'The paper withholds dimensions, exact updates, and parts of the training recipe.' },
  { id: 'C-LATENT-01', text: 'Recurrent depth and Coconut illustrate two other ways to add internal computation without requiring a natural-language step for every update.', sourceIds: ['S1', 'S2'], evidence: 'conceptual comparison', caveat: 'These mechanisms are related research directions, not interchangeable architectures.' },
] as const satisfies readonly ResearchClaim[];
