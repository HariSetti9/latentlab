import { writeFile } from 'node:fs/promises';
import { depthMattersPreset, easyPreset, limitationPreset } from '../src/core/presets';
import { runExperiment } from '../src/core/trace';

function check(condition: boolean, message: string): void {
  if (!condition) throw new Error(`Preset verification failed: ${message}`);
}

const easyShallow = runExperiment(easyPreset, 2);
const depthShallow = [1, 2, 4].map((depth) => runExperiment(depthMattersPreset, depth));
const depthSolved = runExperiment(depthMattersPreset, 6);
const limitation = runExperiment(limitationPreset, 16);
const limitationStable = limitation.stableAtStep;

check(easyShallow.finalCorrectness && easyShallow.finalPrediction.estimatedDistance === easyShallow.oracle.shortestDistance, 'easy must succeed at depth 2');
check(depthShallow.every((result) => !result.finalCorrectness && !result.finalPrediction.reachable), 'depth-matters must remain incomplete at depths 1, 2, and 4');
check(depthSolved.finalCorrectness && depthSolved.finalPrediction.estimatedDistance === depthSolved.oracle.shortestDistance, 'depth-matters must agree with BFS at depth 6');
check(limitationStable !== null, 'limitation must reach a fixed point');
const limitationStableIndex = limitationStable ?? limitation.steps.length;
check(limitation.steps.slice(limitationStableIndex).every((step) => step.changedStateCount === 0), 'limitation state must not change after stability');
check(limitation.finalPrediction.reachable === false && limitation.oracle.reachable === false, 'limitation must remain unreachable');

const report = {
  schemaVersion: 1,
  generatedBy: 'pnpm verify:presets --write (scripts/verify-presets.ts)',
  passed: true,
  checks: {
    easy: { depth: 2, correct: easyShallow.finalCorrectness, oracleDistance: easyShallow.oracle.shortestDistance },
    depthMatters: { shallowDepths: [1, 2, 4], shallowIncomplete: true, solvedDepth: 6, oracleDistance: depthSolved.oracle.shortestDistance },
    limitation: { requestedDepth: 16, stableAtStep: limitationStable, unchangedAfterStability: true, reachable: false },
  },
};

const serialized = `${JSON.stringify(report, null, 2)}\n`;
if (process.argv.includes('--write')) await writeFile(new URL('../artifacts/preset-verification.json', import.meta.url), serialized, 'utf8');
console.log(serialized);
