import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules', 'dist', 'coverage', 'tmp']);
const extensions = new Set(['.md', '.csv', '.ts', '.tsx', '.js', '.mjs', '.json', '.html']);
const forbidden = [
  new RegExp(['TODO', 'CITE'].join('_'), 'gi'),
  /\[citation\]/gi,
  /example\.com/gi,
  /INSERT[_ -]?CITATION/gi,
  /FAKE[_ -]?URL/gi,
];

async function files(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...await files(path));
    else if (extensions.has(extname(entry.name))) found.push(path);
  }
  return found;
}

const failures = [];
for (const path of await files(root)) {
  const content = await readFile(path, 'utf8');
  for (const pattern of forbidden) {
    const matches = [...content.matchAll(pattern)];
    for (const match of matches) {
      const line = content.slice(0, match.index).split('\n').length;
      failures.push(`${relative(root, path)}:${line}: ${match[0]}`);
    }
  }
}

if (failures.length) {
  console.error('Unresolved citation markers found:\n' + failures.join('\n'));
  process.exit(1);
}

console.log('Citation placeholder check passed.');
