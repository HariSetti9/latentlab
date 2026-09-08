import { spawnSync } from 'node:child_process';

const script = process.argv[2];
if (!script) throw new Error('Usage: node scripts/run-python.mjs <script.py>');

const candidates = [process.env.PYTHON, 'python3', 'python'].filter(Boolean);
for (const command of candidates) {
  const result = spawnSync(command, [script], { stdio: 'inherit', shell: false });
  if (!result.error && result.status === 0) process.exit(0);
  if (!result.error && result.status !== null) process.exit(result.status);
  if (result.error?.code !== 'ENOENT') throw result.error;
}

console.error('Python 3 was not found. Set PYTHON to a Python 3 executable and retry.');
process.exit(1);
