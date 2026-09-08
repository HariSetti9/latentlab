import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const output = new URL('../submission/final-package/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(new URL('docs/', output), { recursive: true });
await mkdir(new URL('research/', output), { recursive: true });
await mkdir(new URL('artifacts/', output), { recursive: true });
await mkdir(new URL('submission/', output), { recursive: true });
const copies = [
  ['README.md', 'README.md'], ['JUDGE_QUICKSTART.md', 'JUDGE_QUICKSTART.md'], ['LICENSE', 'LICENSE'], ['SOURCES_AND_LICENSES.md', 'SOURCES_AND_LICENSES.md'], ['THIRD_PARTY_NOTICES.md', 'THIRD_PARTY_NOTICES.md'], ['requirements-docs.txt', 'requirements-docs.txt'],
  ['docs/CONCEPT_SUMMARY.md', 'docs/CONCEPT_SUMMARY.md'], ['docs/BLOG.md', 'docs/BLOG.md'], ['docs/concept-summary.pdf', 'docs/concept-summary.pdf'], ['docs/blog.pdf', 'docs/blog.pdf'], ['docs/PROVENANCE.md', 'docs/PROVENANCE.md'], ['docs/AI_DISCLOSURE.md', 'docs/AI_DISCLOSURE.md'], ['docs/EVIDENCE_MATRIX.md', 'docs/EVIDENCE_MATRIX.md'], ['docs/LIVE_VS_PRECOMPUTED.md', 'docs/LIVE_VS_PRECOMPUTED.md'], ['docs/METRICS.md', 'docs/METRICS.md'], ['docs/JUDGE_DEFENSE.md', 'docs/JUDGE_DEFENSE.md'], ['docs/CLAIM_CONSISTENCY_AUDIT.md', 'docs/CLAIM_CONSISTENCY_AUDIT.md'],
  ['research/SOURCES.md', 'research/SOURCES.md'], ['research/CLAIMS_LEDGER.csv', 'research/CLAIMS_LEDGER.csv'], ['artifacts/evaluation-results.json', 'artifacts/evaluation-results.json'], ['artifacts/preset-verification.json', 'artifacts/preset-verification.json'], ['artifacts/checksums.txt', 'artifacts/checksums.txt'],
  ['submission/DEMO_SCRIPT.md', 'submission/DEMO_SCRIPT.md'], ['submission/60_SECOND_JUDGE_PATH.md', 'submission/60_SECOND_JUDGE_PATH.md'], ['submission/SUBMISSION_CHECKLIST.md', 'submission/SUBMISSION_CHECKLIST.md'], ['submission/FINAL_LINKS.md', 'submission/FINAL_LINKS.md'],
];
for (const [source, destination] of copies) await cp(new URL(source, root), new URL(destination, output));
await writeFile(new URL('RELEASE_CANDIDATE.txt', output), 'LATENTLAB Phase 7 release candidate. Public URLs, demo video, final audit, and final ZIP remain pending.\n', 'utf8');
console.log(`Assembled release candidate with ${copies.length + 1} files.`);
