# Phase 8 Final-Package Dry Run

The Phase 7 document bundle was expanded into a Phase 8 **NOT_FOR_SUBMISSION** release candidate with judge documents, PDFs, evaluation evidence, release materials, and a reproducible source snapshot.

Checks performed by `pnpm verify:package`:

- required README, quickstart, PDFs, demo/release files, source modules, tests, lockfile, and CI workflow exist;
- source snapshot includes the recurrent engine, separate oracle, regression tests, and reproduction scripts;
- no `node_modules`, `.git`, `dist`, coverage, cache, temporary, or Python-cache directory;
- no absolute user path, secret-pattern match, or local/development URL in release-facing files;
- the marker says `NOT FOR SUBMISSION` and no final ZIP was created.

The candidate must be rebuilt after Phase 9 URL insertion and before the Phase 10 deterministic archive. It is not the final submission artifact.
