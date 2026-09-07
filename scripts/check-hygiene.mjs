import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules', 'dist', 'coverage', 'tmp', 'docs/qa']);
const extensions = new Set(['.md', '.csv', '.ts', '.tsx', '.js', '.mjs', '.json', '.html', '.yml', '.yaml']);
const patterns = [
  { name: 'Windows user path', pattern: new RegExp(['C:', '\\\\', 'Users', '\\\\'].join(''), 'i') },
  { name: 'private key', pattern: new RegExp(['BEGIN ', 'PRIVATE KEY'].join(''), 'i') },
  { name: 'GitHub token', pattern: new RegExp(['gh', 'p_[A-Za-z0-9]{20,}'].join(''), 'g') },
  { name: 'OpenAI-style key', pattern: new RegExp(['s', 'k-[A-Za-z0-9]{20,}'].join(''), 'g') },
];

async function files(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    const rel = relative(root, path).replaceAll('\\', '/');
    if (entry.isDirectory() && (ignored.has(entry.name) || ignored.has(rel))) continue;
    if (entry.isDirectory()) found.push(...await files(path));
    else if (extensions.has(extname(entry.name)) || entry.name === '.env.example') found.push(path);
  }
  return found;
}

const failures = [];
for (const path of await files(root)) {
  const content = await readFile(path, 'utf8');
  for (const { name, pattern } of patterns) if (pattern.test(content)) failures.push(`${relative(root, path)}: ${name}`);
}

if (failures.length) {
  console.error(`Repository hygiene check failed:\n${failures.join('\n')}`);
  process.exit(1);
}
console.log('Repository path and secret-pattern hygiene check passed.');
