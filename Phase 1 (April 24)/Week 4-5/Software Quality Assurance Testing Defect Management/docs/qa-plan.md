# Quality Assurance Plan - QueueLess Backend

This document outlines the testing strategy and quality assurance procedures for the QueueLess Backend project.

## 1. Introduction
The goal of this QA plan is to ensure the reliability, stability, and correctness of the queue tracking system.

## 2. Test Types

### Unit Testing
- **Description**: Tests individual components (functions, models, serializers) in isolation.
- **Scope**: Service logic, model methods, and data validation rules.
- **Tool**: `pytest` with `pytest-django`.

### Integration Testing
- **Description**: Tests how different components work together, including database interactions and API endpoints.
- **Scope**: REST API views, multi-service workflows (e.g., ticking the queue and notifying users).
- **Tool**: Django's `TestCase` and `APIClient`.

## 3. Testing Tools
- **Framework**: `pytest`
- **Django Integration**: `pytest-django`
- **Code Quality**: `flake8`, `black`, `isort`

## 4. Test Strategy
- Maintain high coverage for core queue logic.
- Run tests on every significant change.
- Use mock objects for external dependencies (like the mock API).

## 5. Execution
Tests are executed using the following command:
```powershell
.\.venv\Scripts\pytest.exe
```
