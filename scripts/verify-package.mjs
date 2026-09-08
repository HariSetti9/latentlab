import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, relative } from 'node:path';

const root = new URL('../submission/final-package/', import.meta.url);
const required = [
  'README.md', 'JUDGE_QUICKSTART.md', 'docs/concept-summary.pdf', 'docs/blog.pdf',
  'submission/DEMO_SCRIPT.md', 'submission/DEMO_RECORDING_CHECKLIST.md', 'submission/RELEASE_GATE.md',
  'source/package.json', 'source/pnpm-lock.yaml', 'source/src/core/recurrent-engine.ts',
  'source/src/core/oracle.ts', 'source/tests/oracle-independence.test.ts', 'source/.github/workflows/ci.yml',
];
const forbiddenSegments = new Set(['node_modules', '.git', 'dist', 'coverage', 'tmp', '.cache', '__pycache__']);
const textExtensions = new Set(['.md', '.txt', '.json', '.csv', '.ts', '.tsx', '.js', '.mjs', '.yml', '.yaml', '.html']);
const privateKeyPattern = new RegExp(['BEGIN ', 'PRIVATE KEY'].join(''));
const files = [];
const failures = [];
async function visit(url) {
  for (const entry of await readdir(url, { withFileTypes: true })) {
    if (forbiddenSegments.has(entry.name)) failures.push(`Forbidden package entry: ${entry.name}`);
    const child = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, url);
    if (entry.isDirectory()) await visit(child);
    else files.push(child);
  }
}
await visit(root);
const paths = files.map((file) => relative(new URL('.', root).pathname, file.pathname).replaceAll('\\', '/').replace(/^\/+/, ''));
for (const requiredPath of required) if (!paths.includes(requiredPath)) failures.push(`Missing required package file: ${requiredPath}`);
for (const file of files) {
  if (!textExtensions.has(extname(file.pathname))) continue;
  const content = await readFile(file, 'utf8');
  const rel = file.pathname.slice(root.pathname.length);
  if (/C:[\\/]Users[\\/]/i.test(content)) failures.push(`${rel}: absolute Windows user path`);
  if (privateKeyPattern.test(content) || /ghp_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,}/.test(content)) failures.push(`${rel}: secret-pattern match`);
  if (/https?:\/\/(?:localhost|127\.0\.0\.1)(?=[:/]|$)/i.test(content)) failures.push(`${rel}: local URL in release candidate`);
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
const report = { schemaVersion: 1, label: 'NOT_FOR_SUBMISSION', fileCount: files.length, requiredFiles: required.length, forbiddenEntries: 0, localPathsOrSecrets: 0 };
await writeFile(new URL('../artifacts/package-dry-run.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`Package dry run PASS: ${files.length} files; source snapshot and required deliverables present; no forbidden entries, local URLs, paths, or secrets.`);
