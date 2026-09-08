import { readFile } from 'node:fs/promises';

const allowPending = process.argv.includes('--allow-pending');
const files = ['README.md', 'JUDGE_QUICKSTART.md', 'submission/FINAL_LINKS.md', 'submission/SUBMISSION_CHECKLIST.md'];
const strictForbidden = [/example\.com/gi, /YOUR_URL/gi, /TODO_URL/gi];
const pending = [/PUBLIC URL/gi, /PENDING PHASE 9/gi, /VIDEO URL/gi, /PENDING USER ACTION/gi, /PUBLIC_APP_URL_PENDING/gi, /PUBLIC_REPOSITORY_URL_PENDING/gi];
const failures = [];
let pendingCount = 0;
for (const file of files) {
  const content = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
  for (const pattern of strictForbidden) if (pattern.test(content)) failures.push(`${file}: forbidden fabricated/example URL marker`);
  for (const pattern of pending) pendingCount += [...content.matchAll(pattern)].length;
}
if (failures.length || (!allowPending && pendingCount > 0)) {
  console.error([...failures, ...(!allowPending && pendingCount ? [`${pendingCount} pending release URL markers remain`] : [])].join('\n'));
  process.exit(1);
}
if (allowPending && pendingCount === 0) throw new Error('Pending-mode check expected explicit Phase 9/user-action markers but found none.');
console.log(allowPending ? `Release candidate check passed with ${pendingCount} explicit pending markers.` : 'Release URL gate passed: no placeholders remain.');
