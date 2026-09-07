import { runExperiment } from '../src/core/trace';
import type { Cell, Puzzle } from '../src/core/types';

type Candidate = { puzzle: Puzzle; distance: number | null; stableAt: number | null };

function puzzleFromMask(size: number, mask: number): Puzzle {
  const grid: Cell[][] = Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => {
      const index = row * size + col;
      if (index === 0 || index === size * size - 1) return 0;
      return ((mask >> (index - 1)) & 1) as Cell;
    }),
  );
  return {
    id: `generated-${size}-${mask}`,
    title: 'Generated candidate',
    learningPurpose: 'Candidate enumeration only.',
    grid,
    start: { row: 0, col: 0 },
    goal: { row: size - 1, col: size - 1 },
    recommendedDepths: [1, 2, 4, 8, 16],
    expectedObservation: 'Computed after enumeration; never controls inference.',
  };
}

function traversableReach(puzzle: Puzzle, depth: number): number {
  return runExperiment(puzzle, depth).steps.at(-1)?.state.flat().filter((value) => value >= 0).length ?? 0;
}

function find(size: number): { depthSensitive?: Candidate; plateau?: Candidate } {
  const variableCells = size * size - 2;
  const limit = 2 ** variableCells;
  let depthSensitive: Candidate | undefined;
  let plateau: Candidate | undefined;
  for (let mask = 0; mask < limit && (!depthSensitive || !plateau); mask += 1) {
    const puzzle = puzzleFromMask(size, mask);
    const result = runExperiment(puzzle, 16);
    if (!depthSensitive && result.oracle.reachable && (result.oracle.shortestDistance ?? 0) >= size + 2) {
      depthSensitive = { puzzle, distance: result.oracle.shortestDistance, stableAt: result.stableAtStep };
    }
    if (!plateau && !result.oracle.reachable && traversableReach(puzzle, 16) >= 3 && result.stableAtStep !== null && result.stableAtStep <= 8) {
      plateau = { puzzle, distance: null, stableAt: result.stableAtStep };
    }
  }
  return { depthSensitive, plateau };
}

function render(candidate: Candidate | undefined): object | null {
  if (!candidate) return null;
  return {
    id: candidate.puzzle.id,
    grid: candidate.puzzle.grid,
    shortestDistance: candidate.distance,
    stableAtStep: candidate.stableAt,
  };
}

const three = find(3);
const four = find(4);
console.log(JSON.stringify({
  easyOrPlateau3x3: render(three.plateau),
  depthSensitive4x4: render(four.depthSensitive),
  plateau4x4: render(four.plateau),
}, null, 2));
