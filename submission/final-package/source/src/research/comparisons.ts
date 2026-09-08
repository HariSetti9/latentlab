import type { ComparisonRow } from './types';

export const comparisonRows = [
  { dimension: 'Internal state', toy: 'One inspectable distance value per grid cell', bdh: 'Learned graph/neuron state; evolving edge weights', bdhCq: 'Contextual memory S plus query workspace H' },
  { dimension: 'Repeated computation', toy: 'Same deterministic local rule, N times', bdh: 'Local learned dynamics over its state', bdhCq: 'Iterative learned update of the query workspace' },
  { dimension: 'Learning from demonstrations', toy: 'None', bdh: 'Not the claim tested by this toy', bdhCq: 'Demonstrations update contextual memory at inference' },
  { dimension: 'Output', toy: 'Reachability and distance estimate', bdh: 'Sequence-model output', bdhCq: 'Ranked candidate grids in the reported ARC system' },
  { dimension: 'Evidence here', toy: 'Live code + separate BFS oracle + tests', bdh: 'Author-reported preprint; not reproduced', bdhCq: 'Author-reported preprint; evaluation not reproduced' },
] as const satisfies readonly ComparisonRow[];
