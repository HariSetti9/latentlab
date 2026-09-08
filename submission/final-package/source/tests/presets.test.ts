import { describe, expect, it } from 'vitest';
import { depthMattersPreset, easyPreset, getPreset, limitationPreset, presets } from '../src/core/presets';
import { runExperiment } from '../src/core/trace';

describe('presets', () => {
  it('has unique ids and complete explanatory metadata', () => {
    expect(new Set(presets.map(({ id }) => id)).size).toBe(presets.length);
    for (const preset of presets) {
      expect(preset.title).not.toBe('');
      expect(preset.learningPurpose).not.toBe('');
      expect(preset.recommendedDepths.length).toBeGreaterThan(2);
      expect(preset.expectedObservation).not.toBe('');
      expect(preset.discovery).not.toBe('');
    }
  });

  it('easy preset succeeds at shallow depth', () => {
    expect(runExperiment(easyPreset, 1).finalCorrectness).toBe(false);
    expect(runExperiment(easyPreset, 2).finalCorrectness).toBe(true);
  });

  it('depth-sensitive preset changes correctness only after enough updates', () => {
    expect([1, 2, 4].map((depth) => runExperiment(depthMattersPreset, depth).finalCorrectness)).toEqual([false, false, false]);
    expect(runExperiment(depthMattersPreset, 6).finalCorrectness).toBe(true);
  });

  it('looks up presets and rejects unknown ids', () => {
    expect(getPreset(limitationPreset.id)).toBe(limitationPreset);
    expect(() => getPreset('missing')).toThrow('Unknown preset');
  });
});
