# Technical Debt Log - QueueLess Backend

This document tracks technical debt and architectural improvements needed for the long-term health of the system.

## 1. Identified Technical Debts

1.  **God Function in `services.py`**: The `simulate_queue_tick_for_institution` function handles four distinct business processes (expiry, serving, advancing, and notifying) in one massive block. This makes it hard to test individual parts.
2.  **Redundant DB Refreshes**: In `views.py`, the status view calls `refresh_from_db()` multiple times unnecessarily, leading to extra database overhead.
3.  **Missing Database Indexing**: The `phone_number` field is not indexed. As the database grows, administrative lookups for specific customers will become significantly slower.
4.  **Hardcoded Notification Strings**: Notification messages are hardcoded inside the service logic. These should be moved to a template system or a dedicated constants file for easier localization.
5.  **Inefficient Serving Number Calculation**: We calculate the "current serving number" by performing a `Max()` aggregation over all queue entries for an institution. This will become a performance bottleneck as the history grows.

## 2. Selected Debt for Resolution
**Debt #1: Refactoring the God Function.**
- **Goal**: Break down `simulate_queue_tick_for_institution` into private, modular functions.
- **Benefit**: Improves readability, allows for unit testing of sub-processes, and makes the logic easier to maintain.
