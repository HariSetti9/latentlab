# Reproducibility

Prerequisites: Git and Node.js 20 or newer. `package.json` pins pnpm 11.19.0; activate it with Corepack.

```sh
git clone <PUBLIC_REPOSITORY_URL_PENDING>
cd <repository-directory>
corepack enable
corepack prepare pnpm@11.19.0 --activate
pnpm install --frozen-lockfile
pnpm reproduce
pnpm dev
```

The URL placeholder is intentional until publication. In the provided checkout, begin with `pnpm install --frozen-lockfile`.

`pnpm reproduce` regenerates the 80-case JSON/CSV evaluation, verifies the three showcase behaviors, runs tests/typecheck/lint/citation check/build, regenerates SHA-256 checksums, and writes an environment-stamped reproduction report. The report timestamp and commit are intentionally excluded from deterministic hashes.

Direct commands: `pnpm test`, `pnpm evaluate --write`, `pnpm verify:presets --write`, `pnpm checksums`, `pnpm check:citations`, and `pnpm build`.

Phase 6 clean-install verification copied tracked source into a fresh temporary directory without `.git`, `node_modules`, `dist`, or caches, then ran `pnpm install --frozen-lockfile` and `pnpm reproduce`. Results are recorded in the reproduction report and test matrix.
