# Deployment Plan - QueueLess Backend

This document outlines the deployment strategy and procedures for the QueueLess Backend.

## 1. Deployment Strategy: Rolling Update
We use a **Rolling Update** strategy to ensure high availability. 
- New versions are deployed to the server environment while the old version is still running.
- Once the new version passes health checks, the traffic is switched over.
- This ensures zero-downtime deployments.

## 2. Infrastructure
- **Platform**: Render
- **Database**: Managed PostgreSQL
- **Caching**: Redis (for auto-tick locking)

## 3. Deployment Steps
1.  **Environment Sync**: Ensure `.env` variables are updated in the production dashboard.
2.  **Database Migration**: Run `python manage.py migrate` before switching traffic.
3.  **Static Files**: Run `python manage.py collectstatic --no-input`.
4.  **Health Check**: Verify the `/api/health/` (or root) endpoint returns 200 OK.

## 4. Rollback Plan
In the event of a critical failure after deployment:
1.  **Immediate Revert**: Revert the Git commit on the `main` branch to the last known stable tag (e.g., `git revert v0.5`).
2.  **Redeploy**: Trigger the CI/CD pipeline to redeploy the previous version.
3.  **Database Rollback**: If migrations were applied, run `python manage.py migrate <app_name> <previous_migration_number>`.
4.  **Verification**: Confirm system stability via logs and smoke tests.
