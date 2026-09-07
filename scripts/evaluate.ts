import { performance } from 'node:perf_hooks';
import { writeFile } from 'node:fs/promises';
import { presets } from '../src/core/presets';
import { runExperiment } from '../src/core/trace';

const depths = [0, 1, 2, 4, 6, 8, 16] as const;
const started = performance.now();
const items = presets.flatMap((preset) => depths.map((depth) => {
  const result = runExperiment(preset, depth);
  return {
    puzzleId: preset.id,
    category: preset.category,
    depth,
    oracleReachable: result.oracle.reachable,
    oracleDistance: result.oracle.shortestDistance,
    predictedReachable: result.finalPrediction.reachable,
    predictedDistance: result.finalPrediction.estimatedDistance,
    correct: result.finalCorrectness,
    changedCellsFinalStep: result.steps.at(-1)?.changedStateCount ?? 0,
    stableAtStep: result.stableAtStep,
    computeProxy: result.computeProxy,
  };
}));

const elapsed = performance.now() - started;
const report = {
  schemaVersion: 1,
  generatedBy: 'pnpm evaluate -- --write (scripts/evaluate.ts)',
  evaluatedCases: items.length,
  depths,
  items,
};
const serialized = `${JSON.stringify(report, null, 2)}\n`;
if (process.argv.includes('--write')) {
  await writeFile(new URL('../artifacts/metrics.json', import.meta.url), serialized, 'utf8');
}
console.log(serialized);
console.error(`Evaluation diagnostic: ${elapsed.toFixed(3)} ms (not a product performance claim).`);
