import type { Preset } from './types';

/** Presets selected from the deterministic enumeration in find-interesting-puzzles.ts. */
export const easyPreset: Preset = {
  id: 'easy-corridor',
  category: 'easy',
  title: 'One turn away',
  learningPurpose: 'Show a prediction becoming correct after a shallow number of local updates.',
  grid: [[0, 0, 0], [1, 1, 0], [0, 0, 0]],
  start: { row: 0, col: 0 },
  goal: { row: 0, col: 2 },
  recommendedDepths: [0, 1, 2, 4],
  expectedObservation: 'The goal is unknown at depths 0 and 1 and reached at depth 2.',
  discovery: 'First 3x3 reachable candidate with shortest distance 2 in deterministic wall-mask order.',
};

export const depthMattersPreset: Preset = {
  id: 'depth-matters-winding',
  category: 'depth-matters',
  title: 'Six edges away',
  learningPurpose: 'Demonstrate that information needs multiple recurrent updates to cross a grid.',
  grid: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  start: { row: 0, col: 0 },
  goal: { row: 3, col: 3 },
  recommendedDepths: [1, 2, 4, 6, 8],
  expectedObservation: 'Shallow depths predict unreachable; depth 6 reaches the goal with the oracle distance.',
  discovery: 'First 4x4 candidate in deterministic wall-mask order with a shortest path of at least 6 (generated-4-0).',
};

export const limitationPreset: Preset = {
  id: 'limitation-island',
  category: 'limitation',
  title: 'More work, same answer',
  learningPurpose: 'Show a natural fixed point: extra updates cannot cross a disconnected wall barrier.',
  grid: [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
  start: { row: 0, col: 0 },
  goal: { row: 2, col: 2 },
  recommendedDepths: [1, 2, 4, 8, 16],
  expectedObservation: 'The recurrence stabilizes while the goal remains unreachable; later updates add work but no state change.',
  discovery: 'First 3x3 unreachable candidate with at least three reached cells and a fixed point by depth 8 (generated-3-28).',
};

export const presets = [easyPreset, depthMattersPreset, limitationPreset] as const;

export function getPreset(id: string): Preset {
  const preset = presets.find((candidate) => candidate.id === id);
  if (!preset) throw new Error(`Unknown preset: ${id}`);
  return preset;
}
