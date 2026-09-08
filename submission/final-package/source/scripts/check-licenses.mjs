import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const packages = new Map();
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await visit(path);
    else if (entry.name === 'package.json') {
      try {
        const metadata = JSON.parse(await readFile(path, 'utf8'));
        if (!metadata.name || !metadata.version) continue;
        const license = typeof metadata.license === 'string' ? metadata.license : metadata.licenses?.map((item) => item.type).join(' OR ');
        packages.set(`${metadata.name}@${metadata.version}`, license || null);
      } catch { /* Ignore non-package JSON encountered inside dependencies. */ }
    }
  }
}
await visit('node_modules');
const entries = [...packages].sort(([a], [b]) => a.localeCompare(b)).map(([packageId, license]) => ({ packageId, license }));
const missing = entries.filter((entry) => !entry.license);
if (missing.length) {
  console.error(`Packages with missing license metadata:\n${missing.map((entry) => entry.packageId).join('\n')}`);
  process.exit(1);
}
const counts = Object.fromEntries([...new Set(entries.map((entry) => entry.license))].sort().map((license) => [license, entries.filter((entry) => entry.license === license).length]));
await writeFile('artifacts/license-audit.json', `${JSON.stringify({ schemaVersion: 1, packageCount: entries.length, licenseCounts: counts, packages: entries }, null, 2)}\n`, 'utf8');
console.log(`Dependency license audit PASS: ${entries.length} resolved packages; no missing license metadata.`);
