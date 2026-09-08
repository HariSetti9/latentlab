import { describe, expect, it } from 'vitest';
import { limitationPreset } from '../src/core/presets';
import { runExperiment } from '../src/core/trace';

describe('naturally computed limitation', () => {
  it('reaches a fixed point without reaching a disconnected goal', () => {
    const result = runExperiment(limitationPreset, 16);
    expect(result.oracle.reachable).toBe(false);
    expect(result.finalPrediction.reachable).toBe(false);
    expect(result.finalCorrectness).toBe(true);
    expect(result.stableAtStep).not.toBeNull();
    expect(result.steps.at(-1)?.changedStateCount).toBe(0);
  });

  it('shows that later updates add compute but do not alter a converged state', () => {
    const depth4 = runExperiment(limitationPreset, 4);
    const depth16 = runExperiment(limitationPreset, 16);
    expect(depth16.computeProxy).toBeGreaterThan(depth4.computeProxy);
    expect(depth16.finalPrediction).toEqual(depth4.finalPrediction);
    expect(depth16.steps.at(-1)?.state).toEqual(depth4.steps.at(-1)?.state);
  });

  it('can stop early while reporting requested depth honestly', () => {
    const result = runExperiment(limitationPreset, 16, { stopWhenStable: true });
    expect(result.depth).toBe(16);
    expect(result.steps.length).toBeLessThan(17);
    expect(result.steps.at(-1)?.changedStateCount).toBe(0);
  });
});
