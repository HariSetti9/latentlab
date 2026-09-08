# Phase 8 Cross-Platform Audit

| Check | Result | Evidence / action |
|---|---|---|
| npm scripts | PASS | Node/Python entry points; no PowerShell, Bash chaining, or backslash-only commands in `package.json` |
| Python discovery | PASS by inspection/Windows run | `run-python.mjs` accepts `PYTHON`, then tries `python3` and `python` |
| Paths/casing | PASS | Git-tracked paths inspected; imports match case; Node scripts use URL/path APIs |
| Line endings | PASS | PDFs/PNGs are explicitly binary in `.gitattributes`; source scripts do not depend on CRLF |
| Executable bits | PASS by design | CI invokes scripts through Node/Python/pnpm; no repository script requires executable permission |
| Windows reserved names | PASS | None found |
| Linux CI definition | PASS syntax/local equivalence | Ubuntu workflow pins Node 20, pnpm 11.19.0, Python 3.12 and runs full gates |
| Actual Linux-hosted run | BLOCKED | GitHub Actions cannot execute until the repository is published/pushed |

No Windows-only production dependency remains. Local browser audit configuration uses environment variables and is not part of the production runtime.
