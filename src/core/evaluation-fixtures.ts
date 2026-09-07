import type { Puzzle } from './types';

export interface EvaluationFixture {
  readonly puzzle: Puzzle;
  readonly construction: 'showcase preset' | 'hand-constructed evaluation fixture';
  readonly obstacleDensity: number;
}

function fixture(puzzle: Puzzle, construction: EvaluationFixture['construction'] = 'hand-constructed evaluation fixture'): EvaluationFixture {
  const cells = puzzle.grid.flat();
  return { puzzle, construction, obstacleDensity: cells.filter((cell) => cell === 1).length / cells.length };
}

export const evaluationFixtures = [
  fixture({ id: 'eval-adjacent', title: 'Adjacent goal', learningPurpose: 'Minimum non-zero path.', grid: [[0, 0]], start: { row: 0, col: 0 }, goal: { row: 0, col: 1 }, recommendedDepths: [0, 1, 2], expectedObservation: 'First succeeds at depth 1.' }),
  fixture({ id: 'eval-start-is-goal', title: 'Start equals goal', learningPurpose: 'Zero-distance edge case.', grid: [[0]], start: { row: 0, col: 0 }, goal: { row: 0, col: 0 }, recommendedDepths: [0, 1], expectedObservation: 'Correct at initialization.' }),
  fixture({ id: 'eval-open-3x3', title: 'Open 3x3', learningPurpose: 'Multiple equal shortest paths.', grid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], start: { row: 0, col: 0 }, goal: { row: 2, col: 2 }, recommendedDepths: [2, 4, 8], expectedObservation: 'First succeeds at depth 4.' }),
  fixture({ id: 'eval-detour-4x4', title: 'Obstacle detour', learningPurpose: 'Longer path with medium obstacle density.', grid: [[0, 1, 0, 0], [0, 1, 0, 1], [0, 0, 0, 1], [1, 1, 0, 0]], start: { row: 0, col: 0 }, goal: { row: 3, col: 3 }, recommendedDepths: [4, 6, 8], expectedObservation: 'Requires the computed detour distance.' }),
  fixture({ id: 'eval-blocked-2x2', title: 'Blocked 2x2', learningPurpose: 'Tiny unreachable case.', grid: [[0, 1], [1, 0]], start: { row: 0, col: 0 }, goal: { row: 1, col: 1 }, recommendedDepths: [0, 1, 4], expectedObservation: 'Remains unreachable and stabilizes.' }),
  fixture({ id: 'eval-dense-unreachable', title: 'Dense barrier', learningPurpose: 'Unreachable case with high obstacle density.', grid: [[0, 0, 1, 0], [1, 0, 1, 0], [0, 0, 1, 0], [0, 1, 1, 0]], start: { row: 0, col: 0 }, goal: { row: 3, col: 3 }, recommendedDepths: [2, 4, 8], expectedObservation: 'Left and right components remain disconnected.' }),
  fixture({ id: 'eval-narrow-5x5', title: 'Narrow 5x5 route', learningPurpose: 'Longer path in the largest evaluation grid.', grid: [[0, 1, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 1, 0], [1, 1, 0, 1, 0], [0, 0, 0, 0, 0]], start: { row: 0, col: 0 }, goal: { row: 4, col: 4 }, recommendedDepths: [4, 8, 12], expectedObservation: 'Shallow depth is incomplete; sufficient depth agrees with BFS.' }),
] as const satisfies readonly EvaluationFixture[];

export const evaluationDepths = [0, 1, 2, 4, 6, 8, 12, 16] as const;
