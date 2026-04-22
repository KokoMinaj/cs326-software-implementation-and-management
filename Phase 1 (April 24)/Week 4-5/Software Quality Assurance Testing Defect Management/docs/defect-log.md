# Defect Log

| ID | Description | Severity | Status | Date Logged | Date Fixed |
|----|-------------|----------|--------|-------------|------------|
| BUG-001 | `expires_at` field is never populated when an entry moves to `SERVING` status. | Medium | Closed | 2026-04-22 | 2026-04-22 |

## Defect Details

### BUG-001: Missing `expires_at` population
- **Observed Behavior**: When a `QueueEntry` transitions to `SERVING` status, the `expires_at` timestamp remains `null`.
- **Expected Behavior**: The `expires_at` field should be set to `turn_called_at + grace_period` to inform the client when the session will expire.
- **Root Cause**: The transition logic in `services.py` updates the status but forgets to calculate and save the `expires_at` timestamp.