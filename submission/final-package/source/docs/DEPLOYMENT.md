# Deployment Readiness

PREFERRED TARGET: GitHub Pages, after Phase 8 passes and the public repository exists.  
WHY: LATENTLAB is a fully static Vite application with no server, secrets, authentication, database, cookies, analytics, remote inference, or path-based client router. GitHub Pages keeps source and artifact provenance together. Vercel static hosting is the fallback if Pages organization policy or routing proves unreliable.  
BUILD COMMAND: `VITE_BASE_PATH=/<repository-name>/ pnpm build` on Linux/macOS, or set the same environment variable using the host’s UI on Windows.  
OUTPUT DIRECTORY: `dist`.  
BASE PATH REQUIREMENTS: `vite.config.ts` reads `VITE_BASE_PATH`, defaulting to `/`. A project Pages site must use `/<repository-name>/`; a custom domain or Vercel root uses `/`. CI exercises a repository-name base.  
KNOWN RISKS: Incorrect Pages base causes asset 404s; GitHub Pages/Actions cannot be proven before publication; external arXiv links can change; direct path routes are unsupported because none exist. Query parameters and hash anchors work on the single `index.html`.  
POST-DEPLOYMENT CHECKS: Open in a signed-out/private session; verify JS/CSS MIME and no 404s; run depth 4 -> 6; open limitation; test query fixture and `#evidence`; check console/network; test 360/390/768/1024/1440; open all citations; verify no sign-in; insert the exact HTTPS URL in README/final links; run strict release validation.

## Compatibility notes

- Vite-generated asset references honor the configured base path.
- The data-URI favicon has no public-file dependency.
- There is no service worker, server API, filesystem call, Node runtime dependency, or environment secret in the browser bundle.
- Refreshing a query/hash URL requests the same static root document; no rewrite is needed.
- A subpath production build was inspected and emitted `/dataforge-test/assets/...`, confirming base-path substitution.

Do not deploy from this document; deployment is Phase 9.
