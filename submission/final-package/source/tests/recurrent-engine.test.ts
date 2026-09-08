import { describe, expect, it } from 'vitest';
import { depthMattersPreset, easyPreset } from '../src/core/presets';
import { initializeState, updateState } from '../src/core/recurrent-engine';
import { runExperiment } from '../src/core/trace';

describe('recurrent engine', () => {
  it('defines depth zero as initialization only', () => {
    const result = runExperiment(easyPreset, 0);
    expect(result.steps).toHaveLength(1);
    expect(result.steps[0]?.state[0]).toEqual([0, -1, -1]);
    expect(result.finalPrediction.reachable).toBe(false);
  });

  it('propagates at most one edge in one update', () => {
    const result = runExperiment(easyPreset, 1);
    expect(result.steps).toHaveLength(2);
    expect(result.steps[1]?.state[0]).toEqual([0, 1, -1]);
    expect(result.steps[1]?.changedStateCount).toBe(1);
  });

  it('uses larger depth to reach a distant goal', () => {
    expect(runExperiment(depthMattersPreset, 4).finalCorrectness).toBe(false);
    expect(runExperiment(depthMattersPreset, 6).finalCorrectness).toBe(true);
  });

  it('does not propagate through walls', () => {
    const state = runExperiment(easyPreset, 8).finalPrediction;
    expect(state).toEqual({ reachable: true, estimatedDistance: 2 });
    expect(runExperiment(easyPreset, 8).steps.at(-1)?.state[1]?.slice(0, 2)).toEqual([-1, -1]);
  });

  it('rejects invalid depths and state shapes', () => {
    expect(() => runExperiment(easyPreset, -1)).toThrow('non-negative integer');
    expect(() => runExperiment(easyPreset, 1.5)).toThrow('non-negative integer');
    expect(() => updateState(easyPreset, [[0]])).toThrow('shape');
  });

  it('initializes only the start, even when start equals goal', () => {
    const puzzle = { ...easyPreset, goal: easyPreset.start };
    expect(initializeState(puzzle)[0]?.[0]).toBe(0);
    expect(runExperiment(puzzle, 0).finalCorrectness).toBe(true);
  });
});
