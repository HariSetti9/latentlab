export type EvidenceKind = 'our experiment' | 'author-reported preprint' | 'conceptual comparison';

export interface ResearchPaper {
  id: 'S1' | 'S2' | 'S3' | 'S4';
  shortName: string;
  title: string;
  year: number;
  url: string;
  reviewedSections: string;
  whyCite: string;
  evidence: EvidenceKind;
}

export interface ResearchClaim {
  id: string;
  text: string;
  sourceIds: ResearchPaper['id'][];
  evidence: EvidenceKind;
  caveat: string;
}

export interface ComparisonRow {
  dimension: string;
  toy: string;
  bdh: string;
  bdhCq: string;
}
