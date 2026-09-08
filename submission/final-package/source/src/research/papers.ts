import type { ResearchPaper } from './types';

export const papers = [
  { id: 'S1', shortName: 'Recurrent depth', title: 'Scaling up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach', year: 2025, url: 'https://arxiv.org/abs/2502.05171', reviewedSections: 'Abstract; §3 architecture; §5 results and representation-collapse discussion', whyCite: 'Defines a prelude–recurrent-core–coda architecture whose inference depth can vary.', evidence: 'author-reported preprint' },
  { id: 'S2', shortName: 'Coconut', title: 'Training Large Language Models to Reason in a Continuous Latent Space', year: 2024, url: 'https://arxiv.org/abs/2412.06769', reviewedSections: 'Abstract; §3 method; §4 experiments; §6 limitations', whyCite: 'Shows a different latent mechanism: feeding the last hidden state back as a continuous input.', evidence: 'author-reported preprint' },
  { id: 'S3', shortName: 'BDH', title: 'The Dragon Hatchling: The Missing Link between the Transformer and Models of the Brain', year: 2025, url: 'https://arxiv.org/abs/2509.26507', reviewedSections: 'Abstract; §1.2–1.3; §2 dynamics; §3 GPU formulation; §4 and §6 analyses', whyCite: 'Primary description of BDH graph dynamics, evolving edge state, and GPU-oriented formulation.', evidence: 'author-reported preprint' },
  { id: 'S4', shortName: 'BDH-CQ', title: 'BDH-CQ: In-Context Learning with Recurrent Latent Reasoning', year: 2026, url: 'https://arxiv.org/abs/2608.09888', reviewedSections: 'Abstract; §3 system; §5 evaluation; §6 controlled experiments and limitations', whyCite: 'Separates evolving contextual memory from iterative query reasoning in a latent workspace.', evidence: 'author-reported preprint' },
] as const satisfies readonly ResearchPaper[];

export const paperById = Object.fromEntries(papers.map((paper) => [paper.id, paper])) as Record<ResearchPaper['id'], ResearchPaper>;
