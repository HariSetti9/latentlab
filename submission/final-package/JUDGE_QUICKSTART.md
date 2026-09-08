# Judge Quickstart — Two Minutes

Public app: `<PUBLIC_APP_URL_PENDING>`  
Repository: `<PUBLIC_REPOSITORY_URL_PENDING>`

Placeholders are intentional until publication.

1. Open `?fixture=depth-matters-winding&depth=4`; observe incomplete estimate beside BFS.
2. Change to 6, or open `?fixture=depth-matters-winding&depth=6`; observe agreement.
3. Open `?fixture=limitation-island&depth=16`; observe stability at step 3.
4. Open `#evidence`; inspect the non-equivalence warning, comparison, and sources.
5. Run:

```sh
corepack prepare pnpm@11.19.0 --activate
pnpm install --frozen-lockfile
pnpm reproduce
```

Expected ending: `Reproduction PASS`. Start the UI with `pnpm dev`.
