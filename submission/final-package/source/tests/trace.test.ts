import { describe, expect, it } from 'vitest';
import { depthMattersPreset } from '../src/core/presets';
import { runExperiment } from '../src/core/trace';

describe('trace contract', () => {
  it('contains initialization plus exactly one state per update', () => {
    const result = runExperiment(depthMattersPreset, 8);
    expect(result.steps).toHaveLength(9);
    expect(result.steps.map(({ step }) => step)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('contains honest bounded convergence metrics and correctness', () => {
    const result = runExperiment(depthMattersPreset, 8);
    for (const step of result.steps) {
      expect(step.convergenceDelta).toBeGreaterThanOrEqual(0);
      expect(step.convergenceDelta).toBeLessThanOrEqual(1);
      expect(typeof step.correctness).toBe('boolean');
    }
    expect(result.finalCorrectness).toBe(true);
  });

  it('is JSON serializable', () => {
    expect(() => JSON.parse(JSON.stringify(runExperiment(depthMattersPreset, 8)))).not.toThrow();
  });
});
