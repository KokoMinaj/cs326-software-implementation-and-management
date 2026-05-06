# Ethical Impact Assessment

This document analyzes the potential ethical implications of the QueueLess application and identifies strategies to minimize negative impacts.

## 1. Stakeholders
- **Users (Queuers)**: Individuals who use the app to track their position in line. They seek convenience, transparency, and data privacy.
- **Institutions (Businesses/Offices)**: Entities managing the queues. They seek efficiency and customer satisfaction but may have concerns about system reliability.
- **Developers**: Responsible for the system's integrity and ethical design.
- **Service Providers (Twilio/Push Notification Services)**: Third parties involved in message delivery.

## 2. Ethical Risks & Mitigations
- **Equity and Accessibility**: 
    - *Risk*: Users without smartphones or data plans may be disadvantaged if physical queuing is completely replaced.
    - *Mitigation*: The system is designed to *augment* physical queuing, not replace it entirely. It tracks physical tickets to ensure parity.
- **Data Privacy (PII)**:
    - *Risk*: Phone numbers or names could be leaked if the database is compromised.
    - *Mitigation*: We minimize PII collection. Phone numbers are optional and only used for SMS alerts. Session IDs are used for tracking to avoid exposing user identities.
- **Algorithmic Fairness**:
    - *Risk*: The "Auto-Tick" feature could accidentally skip users if the interval is too aggressive.
    - *Mitigation*: We use a "Grace Period" and "Manual Check-in" system to ensure users aren't penalized for minor delays.
- **Addiction/Notification Fatigue**:
    - *Risk*: Excessive notifications could stress users.
    - *Mitigation*: Users can customize their "Near Turn Threshold" to receive alerts only when it's most relevant to them.
