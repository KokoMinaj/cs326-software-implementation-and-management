
# Software Security Checklist

This document tracks the security measures implemented in the QueueLess Backend to ensure data integrity and system safety.

## 1. Input Validation
We use Django REST Framework (DRF) Serializers to enforce strict input validation.
- **Example 1**: `institution_id` in `QueueJoinSerializer` is enforced as a positive integer (`min_value=1`).
- **Example 2**: `near_turn_threshold` is validated to be between 1 and 10 to prevent logical abuse or excessive notification triggers.

## 2. Basic Authentication & Authorization
- **Admin Protection**: Sensitive admin endpoints (like viewing full institution queue status) are protected by `permissions.IsAdminUser`.
- **Public API Safety**: Public endpoints (joining a queue) do not expose PII and use session IDs for tracking rather than primary keys.

## 3. Protection of Sensitive Values
- **Environment Variables**: All sensitive configuration (Database URLs, Secret Keys, VAPID Keys) are stored in `.env` files and loaded via `python-dotenv`.
- **Secret Key Handling**: The `SECRET_KEY` is never hardcoded and defaults to a developer-only key with a warning in non-production environments.

## 4. Dependency Audit
We use `pip-audit` to regularly scan for known vulnerabilities in our dependencies.

## 5. Security Risks (Risk Register)
| Risk ID | Description | Impact | Mitigation Strategy |
|---------|-------------|--------|---------------------|
| RISK-SEC-01  | Brute-force guessing of Session IDs | Medium | Use long, non-sequential UUIDs for session tracking. |
| RISK-SEC-02  | Denial of Service (DoS) via Join API | High | Implement rate limiting (Throttling) on join endpoints. |
| RISK-SEC-03  | Dependency Vulnerabilities | Medium | Regular scans with `pip-audit` and automated dependency updates. |
| RISK-SEC-04  | Sensitive Data Leakage in Logs | Low | Ensure `DEBUG=False` in production and scrub PII from logs. |
