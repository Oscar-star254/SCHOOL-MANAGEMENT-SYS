# EduNest Engineering Decisions

## 2026-01-01 — Baseline and scope
- The host repository is an existing React 19 + Vite 8 + Tailwind 4 scaffold rather than an empty folder. Existing unrelated UI will be replaced, while host-owned `.figma/make` scripts and the already-running development server are preserved.
- React 19 is retained instead of downgrading to React 18 because it is the scaffold's supported runtime and is compatible with the requested experience.
- React Router Data Mode will own all navigation.
- No packaged design system exists, so EduNest will use a local token-driven system with reusable typed primitives. Plus Jakarta Sans and Inter are public Google fonts and are wired via CSS.
- Product copy and demo data use realistic Kenyan school language, names, KSh values, CBC classes, and M-Pesa terminology.
- External services default to deterministic sandbox behavior; production adapters are environment-selected.
- Tenant safety is a server responsibility: authenticated tenant identity overrides/rejects any client-supplied tenant field.

## 2026-01-01 — Foundation verification
- Route-level lazy loading keeps feature pages isolated; the remaining shared application bundle is under a deliberately documented 600 kB warning threshold and 176 kB gzip.
- The Figma Make development server must not be started manually. It was not reachable at localhost from the shell verification environment, so runtime verification relies on the host preview plus successful Vite compilation; no replacement server was started.

## 2026-01-01 — Backend core
- The API uses a storage boundary with an in-memory deterministic adapter for sandbox and tests. MongoDB production wiring remains an explicit delivery item; tenant enforcement already occurs centrally at the store and JWT permission boundaries.
- Backend dependencies could not be installed or executed because this host Python has neither `pip`, `ensurepip`, `uv`, nor preinstalled Flask/pytest. `compileall` passes; pytest remains deliberately unchecked in `PROGRESS.md`.

## 2026-01-01 — Containers and operations
- The root React application remains in the Figma Make canonical layout rather than moving into `/frontend`; the root Dockerfile is the frontend image. This preserves host preview compatibility while still delivering the requested monorepo services.
- Compose includes MongoDB as the production target, but the current API adapter defaults to deterministic process-local storage; durable PyMongo wiring is still unchecked. The seed process and API each initialize equivalent demo fixtures in sandbox mode.

## 2026-01-01 — Final verification environment
- `docker compose config` validates, but the host Docker daemon returns an EOF connection error, so image builds and Compose runtime checks cannot execute in this session.
- A full `tsc --noEmit` pass was added to the verification pass and caught a named lazy-export issue plus tuple inference errors; both are fixed.
