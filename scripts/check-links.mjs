import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const files = [
  'README.md', 'JUDGE_QUICKSTART.md', 'docs/BLOG.md', 'docs/CONCEPT_SUMMARY.md',
  'submission/60_SECOND_JUDGE_PATH.md', 'submission/DEMO_SCRIPT.md',
  'submission/FINAL_LINKS.md', 'submission/SUBMISSION_CHECKLIST.md',
];
const failures = [];
const external = new Set();
for (const file of files) {
  const content = await readFile(file, 'utf8');
  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1].trim();
    if (/^https?:\/\//.test(target)) external.add(target);
    else if (!target.startsWith('#')) {
      const clean = decodeURIComponent(target.split('#')[0]);
      try { await access(resolve(dirname(file), clean)); }
      catch { failures.push(`${file}: missing local target ${target}`); }
    }
  }
}
const expectedResearch = [
  'https://arxiv.org/abs/2502.05171', 'https://arxiv.org/abs/2412.06769',
  'https://arxiv.org/abs/2509.26507', 'https://arxiv.org/abs/2608.09888',
];
for (const url of expectedResearch) if (!external.has(url)) failures.push(`Required primary-source URL absent from audited docs: ${url}`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Link structure check passed: ${files.length} documents; ${external.size} distinct external URLs (network status audited separately).`);
