# CI/CD Pipeline Diagram

This diagram illustrates the automated workflow for the QueueLess Backend, from code push to deployment and verification.

```mermaid
graph TD
    A[Push to main] --> B[GitHub Actions]
    subgraph CI ["Continuous Integration"]
        B --> C[Setup Environment]
        C --> D[Install Dependencies]
        D --> E[Linter Check]
        E --> F[Run Unit Tests]
    end
    F --> G{Tests Pass?}
    G -- Yes --> H[Auto-Deploy to Staging/Prod]
    G -- No --> I[Notify Developers]
    subgraph CD ["Continuous Deployment"]
        H --> J[Run Database Migrations]
        J --> K[Restart Services]
    end
    K --> L[Smoke Tests]
    L --> M{Smoke Tests Pass?}
    M -- Yes --> N[Deployment Successful]
    M -- No --> O[Rollback]
```

### Pipeline Steps:
1. **Source Control**: Developers push code to the `main` branch.
2. **Build & Test**: GitHub Actions installs dependencies and runs the test suite (Pytest).
3. **Deployment**: If tests pass, the application is deployed to the target environment.
4. **Verification**: A smoke test script verifies that the application is alive and responding.
