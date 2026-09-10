# Judge Quickstart — Two Minutes

Public app: <https://harisetti9.github.io/latentlab/>
Repository: <https://github.com/HariSetti9/latentlab>
Hosted CI: <https://github.com/HariSetti9/latentlab/actions/runs/34488924796>

1. Open [Depth Matters at depth 4](https://harisetti9.github.io/latentlab/?fixture=depth-matters-winding&depth=4); observe incomplete estimate beside BFS.
2. Change to 6, or open [Depth Matters at depth 6](https://harisetti9.github.io/latentlab/?fixture=depth-matters-winding&depth=6); observe agreement.
3. Open the [limitation fixture at depth 16](https://harisetti9.github.io/latentlab/?fixture=limitation-island&depth=16); observe stability at step 3.
4. Open [Evidence](https://harisetti9.github.io/latentlab/#evidence); inspect the non-equivalence warning, comparison, and sources.
5. Run:

```sh
corepack prepare pnpm@11.19.0 --activate
pnpm install --frozen-lockfile
pnpm reproduce
```

Expected ending: `Reproduction PASS`. Start the UI with `pnpm dev`.
