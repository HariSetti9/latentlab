import { describe, expect, it } from 'vitest';
import { depthMattersPreset } from '../src/core/presets';
import { runExperiment } from '../src/core/trace';

describe('determinism and input integrity', () => {
  it('returns byte-identical serializable traces for identical inputs', () => {
    const first = JSON.stringify(runExperiment(depthMattersPreset, 8));
    const second = JSON.stringify(runExperiment(depthMattersPreset, 8));
    expect(second).toBe(first);
  });

  it('does not mutate the puzzle input', () => {
    const before = JSON.stringify(depthMattersPreset);
    runExperiment(depthMattersPreset, 16);
    expect(JSON.stringify(depthMattersPreset)).toBe(before);
  });

  it('needs no seed because the engine has no randomness', () => {
    expect(JSON.stringify(runExperiment(depthMattersPreset, 6))).toBe(JSON.stringify(runExperiment(depthMattersPreset, 6)));
  });
});
