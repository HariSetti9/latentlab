import { readFile } from 'node:fs/promises';

const allowPending = process.argv.includes('--allow-pending');
const files = ['README.md', 'JUDGE_QUICKSTART.md', 'submission/FINAL_LINKS.md', 'submission/SUBMISSION_CHECKLIST.md'];
const strictForbidden = [/example\.com/gi, /YOUR_URL/gi, /TODO_URL/gi];
const publicationPending = [/PUBLIC URL/gi, /PENDING PHASE 9/gi, /PUBLIC_APP_URL_PENDING/gi, /PUBLIC_REPOSITORY_URL_PENDING/gi];
const failures = [];
let pendingCount = 0;
let finalLinks = '';
for (const file of files) {
  const content = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
  if (file === 'submission/FINAL_LINKS.md') finalLinks = content;
  for (const pattern of strictForbidden) if (pattern.test(content)) failures.push(`${file}: forbidden fabricated/example URL marker`);
  for (const pattern of publicationPending) pendingCount += [...content.matchAll(pattern)].length;
}
if (!allowPending && pendingCount === 0) {
  for (const field of ['GitHub', 'Live Artifact', 'Hosted CI']) {
    const row = new RegExp(`\\| ${field} \\| \\[[^\\]]+\\]\\(https:\\/\\/[^)]+\\) \\|`).test(finalLinks) ||
      new RegExp(`\\| ${field} \\| https:\\/\\/\\S+ \\|`).test(finalLinks);
    if (!row) failures.push(`submission/FINAL_LINKS.md: ${field} must be a real HTTPS URL in strict mode`);
  }
  const videoIsPublic = /\| Demo Video \| \[[^\]]+\]\(https:\/\/[^)]+\) \|/.test(finalLinks) || /\| Demo Video \| https:\/\/\S+ \|/.test(finalLinks);
  const videoIsExactUserAction = /\| Demo Video \| \*\*PENDING USER ACTION\*\* \|/.test(finalLinks);
  if (!videoIsPublic && !videoIsExactUserAction) failures.push('submission/FINAL_LINKS.md: Demo Video must be a real HTTPS URL or the exact PENDING USER ACTION marker');
}
if (failures.length || (!allowPending && pendingCount > 0)) {
  console.error([...failures, ...(!allowPending && pendingCount ? [`${pendingCount} pending release URL markers remain`] : [])].join('\n'));
  process.exit(1);
}
console.log(allowPending ? `Release candidate check passed with ${pendingCount} explicit publication markers.` : 'Strict release URL gate passed: publication URLs are complete; exact pending-video exception is valid.');
