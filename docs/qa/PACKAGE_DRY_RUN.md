# Phase 9 Final-Package Verification

The publication-complete project is assembled into a final release package with judge documents, PDFs, evaluation evidence, release materials, and a reproducible source snapshot.

Checks performed by `pnpm verify:package`:

- required README, quickstart, PDFs, demo/release files, source modules, tests, lockfile, and CI workflow exist;
- source snapshot includes the recurrent engine, separate oracle, regression tests, and reproduction scripts;
- no `node_modules`, `.git`, `dist`, coverage, cache, temporary, or Python-cache directory;
- no absolute user path, secret-pattern match, or local/development URL in release-facing files;
- `RELEASE.txt` identifies the final release while preserving the demo-video and Unstop user actions;
- the deterministic final ZIP is created from this verified directory and checked independently.

The final package is rebuilt after every release-facing change before archive generation.
