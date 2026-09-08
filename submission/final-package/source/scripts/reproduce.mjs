import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';

const packageManager = process.env.npm_execpath;
if (!packageManager) throw new Error('Run this command through pnpm: pnpm reproduce');

function run(script, args = []) {
  const result = spawnSync(process.execPath, [packageManager, 'run', script, ...args], { encoding: 'utf8', stdio: ['inherit', 'pipe', 'pipe'] });
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
  if (result.status !== 0) throw new Error(`${script} failed with exit code ${result.status}`);
  return `${result.stdout}\n${result.stderr}`;
}

run('evaluate', ['--write']);
const presetOutput = run('verify:presets', ['--write']);
const testOutput = run('test');
run('typecheck');
run('lint');
run('check:citations');
run('check:links');
run('check:licenses');
run('check:hygiene');
run('build');
run('checksums');

const evaluation = JSON.parse(await readFile(new URL('../artifacts/evaluation-results.json', import.meta.url), 'utf8'));
const checksumLines = (await readFile(new URL('../artifacts/checksums.txt', import.meta.url), 'utf8')).split('\n').filter((line) => /^[A-F0-9]{64}\s{2}/.test(line));
const git = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' });
const ansiPattern = new RegExp(`${String.fromCharCode(27)}\\[[0-?]*[ -/]*[@-~]`, 'g');
const testMatch = testOutput.replaceAll(ansiPattern, '').match(/Tests\s+(\d+) passed/);
const report = {
  schemaVersion: 1,
  gitCommit: git.status === 0 ? git.stdout.trim() : 'unavailable',
  generatedAt: new Date().toISOString(),
  nodeVersion: process.version,
  packageManager: `pnpm@${process.env.npm_config_user_agent?.match(/pnpm\/([^ ]+)/)?.[1] ?? 'unknown'}`,
  testsPassed: true,
  testCount: Number(testMatch?.[1] ?? 0),
  evaluationCaseCount: evaluation.evaluatedCases,
  evaluationFixtureCount: evaluation.fixtureCount,
  presetVerification: /"passed": true/.test(presetOutput) ? 'passed' : 'unknown',
  artifactChecksums: Object.fromEntries(checksumLines.map((line) => [line.slice(66), line.slice(0, 64)])),
  buildStatus: 'passed',
};
await writeFile(new URL('../artifacts/reproduction-report.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`Reproduction PASS: ${report.testCount} tests; ${report.evaluationCaseCount} evaluation cases; ${checksumLines.length} checksums.`);
