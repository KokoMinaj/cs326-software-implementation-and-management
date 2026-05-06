# DevOps Practices — QueueLess
**Version:** v1.0
**Last Updated:** May 2026
**Prepared by:** Novus Team

---

## 1. Overview

This document describes the DevOps practices adopted by the QueueLess project, covering automation, collaboration workflows, deployment strategy, monitoring, and the feedback loop used throughout development.

---

## 2. Version Control and Collaboration

The project uses **Git** with a feature-branch workflow hosted on GitHub.

- All changes are developed on dedicated branches and merged into `main` via pull requests.
- Commit messages follow a conventional format: `feat:`, `fix:`, `docs:`, `chore:`, `test:` prefixes to keep history readable and scannable.
- The `main` branch is treated as the production-ready branch — no direct pushes.
- Release versions are marked with annotated Git tags (e.g., `v1.0`).

---

## 3. Continuous Integration (CI)

CI is handled via **GitHub Actions** (`.github/workflows/`).

### What the pipeline does on every push and pull request:

1. **Dependency install** — `pip install -r requirements.txt`
2. **Lint check** — `flake8` for Python style enforcement
3. **Unit and integration tests** — `pytest` with an in-memory SQLite database (`IS_TEST_ENV` flag in `settings.py` automatically switches the DB)
4. **Frontend type check** — `tsc --noEmit` via `npm run typecheck`
5. **Frontend lint** — `eslint` on `src/`

A green CI pipeline is required before any merge to `main`. This prevents broken code from reaching the deployment branch.

---

## 4. Containerization

The application is containerized using **Docker** to ensure environment consistency across development, CI, and production.

- A `Dockerfile` at the project root defines the backend image: Python 3.12 slim base, dependency install, static file collection, and a `gunicorn` entrypoint.
- A `.dockerignore` excludes `__pycache__`, `.env`, `db.sqlite3`, and test artifacts to keep the image lean.
- The container exposes port `8000` and reads all configuration from environment variables — no hardcoded secrets.

This means any team member can run `docker build` and get an identical environment regardless of their local OS.

---

## 5. Deployment Strategy

### Frontend — Vercel

The React SPA is deployed on **Vercel** with automatic deployments triggered on every push to `main`. Vercel handles CDN distribution, HTTPS, and edge caching with zero configuration.

Environment variables (`VITE_API_URL`, `VITE_VAPID_PUBLIC_KEY`, `VITE_ADMIN_USER`, `VITE_ADMIN_PASS`) are configured in the Vercel project dashboard and injected at build time.

### Backend — Render

The Django backend is deployed on **Render** as a web service. Render automatically pulls from the connected GitHub repository on every push to `main` and runs:

```
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn queueless_backend.wsgi:application
```

Managed **PostgreSQL** and **Redis** instances are provisioned on Render and connected via `DATABASE_URL` and `CACHE_URL` environment variables — no manual database setup required.

### Zero-Downtime Approach

Render performs rolling restarts, meaning the old instance stays alive until the new one passes its health check. Database migrations are run before the new process starts, keeping schema and code in sync.

---

## 6. Environment Configuration

All configuration is driven by environment variables with safe defaults for local development:

| Variable | Purpose | Default |
|---|---|---|
| `SECRET_KEY` | Django secret key | Dev-only insecure key |
| `DEBUG` | Debug mode toggle | `True` |
| `DATABASE_URL` | PostgreSQL connection string | SQLite fallback |
| `CACHE_URL` | Redis connection string | In-memory cache |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | Empty (allow-all in dev) |
| `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` | Web Push authentication | None (push disabled) |
| `QUEUE_AUTO_TICK_INTERVAL_SECONDS` | Auto-tick throttle window | `15` |
| `QUEUE_GRACE_PERIOD_SECONDS` | SERVING entry expiry window | `180` |

The `settings.py` enforces that `SECRET_KEY`, `ALLOWED_HOSTS`, and `DATABASE_URL` must be explicitly set when `DEBUG=False`, preventing accidental insecure production deployments.

---

## 7. Monitoring and Observability

### Application-Level Logging

Django's built-in logging is configured to emit structured logs for:

- Web Push delivery failures (`notifications/utils.py` — `logger.error`)
- Auto-tick lock acquisition and release
- Unexpected errors in background commit callbacks

### Render Dashboard

Render provides:

- **Live log streaming** for the web service and worker processes
- **Automatic restart** on crash with configurable health check endpoints
- **Deploy history** with rollback capability to any previous successful deploy

### Uptime Monitoring

An external uptime monitor (e.g., UptimeRobot free tier) pings the backend landing page every 5 minutes. This also serves the secondary purpose of keeping the Render free-tier instance warm, preventing cold-start delays for demo sessions.

---

## 8. Feedback Loop

The development feedback loop followed by the team:

```
Write code (feature branch)
       │
       ▼
Run tests locally (pytest / eslint / tsc)
       │
       ▼
Push → GitHub Actions CI runs automatically
       │
  ┌────▼────┐
  │ CI pass?│
  └────┬────┘
   No  │  Yes
   │   ▼
   │  Merge to main
   │       │
   ▼       ▼
Fix    Auto-deploy to Vercel + Render
           │
           ▼
   Verify on live URLs
           │
           ▼
   Document changes → update CHANGELOG / docs
```

This loop keeps the time between a code change and a live, verifiable deployment under 5 minutes for frontend changes and under 10 minutes for backend changes (including Render's build time).

---

## 9. Testing Strategy

| Layer | Tool | Scope |
|---|---|---|
| Backend unit tests | `pytest` + `django.test` | Service functions, model constraints |
| Backend API tests | `rest_framework.test.APIClient` | Endpoint contracts, status codes, error responses |
| Frontend type safety | TypeScript (`tsc --noEmit`) | Type correctness across all hooks and API clients |
| Frontend lint | ESLint | Code style and common error patterns |

Tests use an **in-memory SQLite database** in CI (`IS_TEST_ENV=True`), keeping the test suite fast without requiring a live PostgreSQL instance in the pipeline.

---

## 10. Release Process

1. Ensure CI is green on `main`.
2. Verify the live deployment on Vercel and Render.
3. Run the full test suite one final time locally.
4. Create an annotated Git tag:
   ```bash
   git tag -a v1.0 -m "Release v1.0 — capstone submission"
   git push origin v1.0
   ```
5. Update `docs/architecture.md` if any architectural decisions changed.