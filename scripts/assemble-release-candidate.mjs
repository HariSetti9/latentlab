import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const output = new URL('../submission/final-package/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(new URL('docs/', output), { recursive: true });
await mkdir(new URL('research/', output), { recursive: true });
await mkdir(new URL('artifacts/', output), { recursive: true });
await mkdir(new URL('submission/', output), { recursive: true });
await mkdir(new URL('source/', output), { recursive: true });
await mkdir(new URL('source/scripts/', output), { recursive: true });
const copies = [
  ['README.md', 'README.md'], ['JUDGE_QUICKSTART.md', 'JUDGE_QUICKSTART.md'], ['LICENSE', 'LICENSE'], ['SOURCES_AND_LICENSES.md', 'SOURCES_AND_LICENSES.md'], ['THIRD_PARTY_NOTICES.md', 'THIRD_PARTY_NOTICES.md'], ['requirements-docs.txt', 'requirements-docs.txt'],
  ['docs/CONCEPT_SUMMARY.md', 'docs/CONCEPT_SUMMARY.md'], ['docs/BLOG.md', 'docs/BLOG.md'], ['docs/concept-summary.pdf', 'docs/concept-summary.pdf'], ['docs/blog.pdf', 'docs/blog.pdf'], ['docs/PROVENANCE.md', 'docs/PROVENANCE.md'], ['docs/AI_DISCLOSURE.md', 'docs/AI_DISCLOSURE.md'], ['docs/EVIDENCE_MATRIX.md', 'docs/EVIDENCE_MATRIX.md'], ['docs/LIVE_VS_PRECOMPUTED.md', 'docs/LIVE_VS_PRECOMPUTED.md'], ['docs/METRICS.md', 'docs/METRICS.md'], ['docs/JUDGE_DEFENSE.md', 'docs/JUDGE_DEFENSE.md'], ['docs/CLAIM_CONSISTENCY_AUDIT.md', 'docs/CLAIM_CONSISTENCY_AUDIT.md'],
  ['research/SOURCES.md', 'research/SOURCES.md'], ['research/CLAIMS_LEDGER.csv', 'research/CLAIMS_LEDGER.csv'], ['artifacts/evaluation-results.json', 'artifacts/evaluation-results.json'], ['artifacts/preset-verification.json', 'artifacts/preset-verification.json'], ['artifacts/checksums.txt', 'artifacts/checksums.txt'],
  ['artifacts/evaluation-results.csv', 'artifacts/evaluation-results.csv'], ['artifacts/metrics.json', 'artifacts/metrics.json'], ['artifacts/model-card.md', 'artifacts/model-card.md'], ['artifacts/license-audit.json', 'artifacts/license-audit.json'],
  ['submission/DEMO_SCRIPT.md', 'submission/DEMO_SCRIPT.md'], ['submission/DEMO_RECORDING_CHECKLIST.md', 'submission/DEMO_RECORDING_CHECKLIST.md'], ['submission/60_SECOND_JUDGE_PATH.md', 'submission/60_SECOND_JUDGE_PATH.md'], ['submission/SUBMISSION_CHECKLIST.md', 'submission/SUBMISSION_CHECKLIST.md'], ['submission/FINAL_LINKS.md', 'submission/FINAL_LINKS.md'], ['submission/RELEASE_GATE.md', 'submission/RELEASE_GATE.md'],
  ['docs/JUDGE_AUDIT.md', 'docs/JUDGE_AUDIT.md'], ['docs/LEARNING_TEST.md', 'docs/LEARNING_TEST.md'], ['docs/TECHNICAL_OWNERSHIP.md', 'docs/TECHNICAL_OWNERSHIP.md'], ['docs/BFS_RECURRENCE_AUDIT.md', 'docs/BFS_RECURRENCE_AUDIT.md'], ['docs/SCIENTIFIC_CLAIM_AUDIT.md', 'docs/SCIENTIFIC_CLAIM_AUDIT.md'], ['docs/BDH_ADVERSARIAL_REVIEW.md', 'docs/BDH_ADVERSARIAL_REVIEW.md'], ['docs/DEPLOYMENT.md', 'docs/DEPLOYMENT.md'],
  ['package.json', 'source/package.json'], ['pnpm-lock.yaml', 'source/pnpm-lock.yaml'], ['tsconfig.json', 'source/tsconfig.json'], ['vite.config.ts', 'source/vite.config.ts'], ['eslint.config.js', 'source/eslint.config.js'], ['index.html', 'source/index.html'],
];
for (const [source, destination] of copies) await cp(new URL(source, root), new URL(destination, output));
for (const directory of ['src', 'tests', '.github']) await cp(new URL(`${directory}/`, root), new URL(`source/${directory}/`, output), { recursive: true });
for (const script of ['evaluate.ts', 'verify-presets.ts', 'generate-checksums.mjs', 'check-citations.mjs', 'check-links.mjs', 'check-licenses.mjs', 'check-hygiene.mjs', 'reproduce.mjs']) await cp(new URL(`scripts/${script}`, root), new URL(`source/scripts/${script}`, output));
for (const directory of ['docs', 'research', 'artifacts', 'submission']) {
  await mkdir(new URL(`source/${directory}/`, output), { recursive: true });
  for (const entry of await readdir(new URL(`${directory}/`, root), { withFileTypes: true })) {
    if (directory === 'artifacts' && ['browser-audit.json', 'package-dry-run.json', 'reproduction-report.json'].includes(entry.name)) continue;
    if (entry.isFile()) await cp(new URL(`${directory}/${entry.name}`, root), new URL(`source/${directory}/${entry.name}`, output));
  }
}
for (const file of ['README.md', 'JUDGE_QUICKSTART.md', 'LICENSE', 'SOURCES_AND_LICENSES.md', 'THIRD_PARTY_NOTICES.md', 'REPRODUCIBILITY.md', 'requirements-docs.txt']) await cp(new URL(file, root), new URL(`source/${file}`, output));
await writeFile(new URL('RELEASE_CANDIDATE.txt', output), 'LATENTLAB Phase 8 QA release candidate. Public URLs, demo video, strict validation, final ZIP, and submission remain pending. NOT FOR SUBMISSION.\n', 'utf8');
console.log(`Assembled Phase 8 release candidate with ${copies.length + 1} explicit files plus source snapshot directories.`);
