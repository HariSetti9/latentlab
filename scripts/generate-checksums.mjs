import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const targets = [
  'artifacts/evaluation-results.csv',
  'artifacts/evaluation-results.json',
  'artifacts/metrics.json',
  'artifacts/preset-verification.json',
  'src/core/evaluation-fixtures.ts',
  'src/core/oracle.ts',
  'src/core/presets.ts',
  'src/core/recurrent-engine.ts',
  'src/core/trace.ts',
];

const lines = ['# SHA-256. Regenerate with `pnpm checksums`.', '# Volatile reproduction-report.json and screenshots are intentionally excluded.'];
for (const target of targets) {
  const digest = createHash('sha256').update(await readFile(new URL(`../${target}`, import.meta.url))).digest('hex').toUpperCase();
  lines.push(`${digest}  ${target}`);
}
await writeFile(new URL('../artifacts/checksums.txt', import.meta.url), `${lines.join('\n')}\n`, 'utf8');
console.log(`Wrote ${targets.length} SHA-256 entries.`);
