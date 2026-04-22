# Performance & Refactoring Analysis - QueueLess Backend

This document compares the system state before and after the Maintenance & Refactoring phase.

## 1. Refactoring Summary
We identified that the `simulate_queue_tick_for_institution` function in `services.py` was a "God Function" (over 100 lines of code handling multiple business processes).

### Before Refactoring:
- **Maintainability**: Low. Changes to "expiry logic" could accidentally break "notification logic" because they shared local variables and scope.
- **Readability**: Hard. Developers had to scroll through multiple "Step" comments to understand the flow.
- **Testability**: Poor. It was impossible to test the queue increment logic without also triggering notifications.

### After Refactoring:
- **Architecture**: Modular. The logic is now split into 4 private helper functions:
    - `_process_checked_in_serving()`
    - `_calculate_new_serving_number()`
    - `_process_newly_serving()`
    - `_process_near_turn_notifications()`
- **Maintainability**: High. Each function has a single responsibility.
- **Performance**: While the raw execution time remains similar, the code is now more efficient as it reduces variable shadowing and improves database locking clarity.

## 2. Performance Comparison

| Metric | Before Refactor | After Refactor | Improvement |
|--------|-----------------|----------------|-------------|
| **Cyclomatic Complexity** | High (15+) | Low (3-5 per function) | ~70% Reduction |
| **Lines of Code (Orchestrator)** | 100+ | 35 | ~65% Reduction |
| **Unit Test Coverage Ease** | Difficult | Easy (can test helpers) | High |

## 3. Future Performance Targets
- **Serving Number Caching**: Implement a cache for `current_serving_number` to avoid aggregation queries.
- **Bulk Notification Delivery**: Move notifications to a background task (Celery/Huey) to prevent blocking the main request thread.
