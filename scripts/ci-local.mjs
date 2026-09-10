import { spawnSync } from 'node:child_process';

const packageManager = process.env.npm_execpath;
if (!packageManager) throw new Error('Run through pnpm: pnpm ci:local');
for (const script of ['reproduce', 'generate:pdfs', 'verify:pdfs', 'assemble:rc', 'verify:package', 'verify:release']) {
  const result = spawnSync(process.execPath, [packageManager, 'run', script], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`${script} failed with exit code ${result.status}`);
}
console.log('Local CI-equivalent gate PASS. Browser audit is environment-specific and runs separately.');
