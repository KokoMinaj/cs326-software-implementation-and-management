# Key Performance Indicators (KPIs)

This document defines the 5 key metrics we track to measure the success and efficiency of the QueueLess system.

| KPI | Name | Description | Target Goal |
|-----|------|-------------|-------------|
| **KPI-01** | Average Wait Time (AWT) | Average time (in minutes) from joining the queue to being served. | < 15 mins |
| **KPI-02** | Abandonment Rate | Percentage of users who cancel or expire before reaching the counter. | < 10% |
| **KPI-03** | Service Velocity | Average number of tickets processed per hour per institution. | > 20/hour |
| **KPI-04** | Notification Accuracy | Percentage of users who check-in within the 3-minute grace period. | > 85% |
| **KPI-05** | API Reliability | Percentage of successful API requests (Status 2xx) vs. Server Errors (5xx). | > 99.9% |

## Measurement Collection
Data is collected through database timestamps (`issued_at`, `turn_called_at`, `checked_in_at`, `served_at`) and API access logs.
