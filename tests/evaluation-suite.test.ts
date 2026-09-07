import { describe, expect, it } from 'vitest';
import { evaluationDepths, evaluationFixtures } from '../src/core/evaluation-fixtures';
import { runExperiment } from '../src/core/trace';

describe('deterministic evaluation corpus', () => {
  it('covers reachable, unreachable, zero-distance, obstacles, and varied grid sizes', () => {
    const atFullDepth = evaluationFixtures.map(({ puzzle }) => runExperiment(puzzle, 16));
    expect(atFullDepth.some((result) => result.oracle.reachable)).toBe(true);
    expect(atFullDepth.some((result) => !result.oracle.reachable)).toBe(true);
    expect(atFullDepth.some((result) => result.oracle.shortestDistance === 0)).toBe(true);
    expect(new Set(evaluationFixtures.map(({ puzzle }) => puzzle.grid.length)).size).toBeGreaterThan(2);
    expect(evaluationFixtures.some(({ obstacleDensity }) => obstacleDensity >= 0.375)).toBe(true);
  });

  it('produces identical serialized results for repeated runs', () => {
    const evaluate = () => JSON.stringify(evaluationFixtures.flatMap(({ puzzle }) => evaluationDepths.map((depth) => runExperiment(puzzle, depth))));
    expect(evaluate()).toBe(evaluate());
  });

  it('agrees with the oracle at sufficient depth for every corpus fixture', () => {
    for (const { puzzle } of evaluationFixtures) expect(runExperiment(puzzle, 16).finalCorrectness).toBe(true);
  });
});
