# EduNest

EduNest is a multi-school operating system for Kenyan schools. This repository contains a React/Vite PWA, a tenant-aware Flask API, a Celery worker, and local MongoDB/Redis infrastructure.

## Quick start

1. Install Docker Desktop or Docker Engine with Compose.
2. Copy environment defaults: `cp .env.example .env`.
3. Start everything: `docker compose up --build`.
4. Open [http://localhost:8080](http://localhost:8080).

The Compose stack starts the web app, API, MongoDB, Redis, background worker and seed job. External services default to local mock behavior.

## Local frontend checks

The Figma Make development server is host-managed. Do not start a second Vite server in that environment.

```bash
pnpm install
pnpm test
pnpm build
```

## Backend checks

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r backend/requirements.txt
cd backend && pytest -q
```

## Demo credentials

All demo accounts use password `Demo@123`.

| Role | Baraka Hills Academy |
|---|---|
| Super Admin | `superadmin@edunest.co.ke` |
| School Admin | `schooladmin@bha.demo` |
| Principal | `principal@bha.demo` |
| Deputy Principal | `deputyprincipal@bha.demo` |
| Accountant | `accountant@bha.demo` |
| Teacher | `teacher@bha.demo` |
| Class Teacher | `classteacher@bha.demo` |
| Librarian | `librarian@bha.demo` |
| Nurse | `nurse@bha.demo` |
| Transport Manager | `transportmanager@bha.demo` |
| Parent | `parent@bha.demo` |
| Student | `student@bha.demo` |

For Lakeview Junior School, replace `@bha.demo` with `@ljs.demo`.

## Useful routes

- `/` public website
- `/login` school login
- `/register` school onboarding
- `/app` school workspace
- `/platform` EduNest platform console
- `/demo` personal demo request
- `/api/v1/health` API health

## Architecture notes

See `SPEC.md`, `DECISIONS.md`, and `PROGRESS.md`. Deployment operations are documented in `docs/DEPLOYMENT.md`; the user guide outline is in `docs/USER-MANUAL.md`.
