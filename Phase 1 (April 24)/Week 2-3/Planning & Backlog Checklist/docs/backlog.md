# QueueLess — Product Backlog

## User Stories

---

### US-01: View Queue Status
**As a** customer,
**I want to** enter my queue number on the website and see the current serving number,
**So that** I can monitor my position in line without staying physically present.

- **Priority:** High
- **Story Points:** 3
- **Acceptance Criteria:**
  - Customer can input their queue number
  - System displays the current serving number in real time
  - Page updates automatically without manual refresh

---

### US-02: Receive Notifications When Turn is Near
**As a** customer,
**I want to** receive a browser or SMS notification when my turn is approaching,
**So that** I can return to the branch just in time without missing my number.

- **Priority:** High
- **Story Points:** 5
- **Acceptance Criteria:**
  - Customer can input their phone number or allow browser notifications
  - System triggers a notification when queue is within 3–5 numbers of theirs
  - Notification is sent only once per queue session

---

### US-03: Select Institution
**As a** customer,
**I want to** select which institution (bank, government office, utility provider) I am queuing at,
**So that** the system tracks the correct queue for my transaction.

- **Priority:** High
- **Story Points:** 2
- **Acceptance Criteria:**
  - Customer can select from a list of partner institutions
  - System loads the correct queue data for the selected institution
  - Selected institution is displayed clearly on the tracking page

---

### US-04: Real-Time Queue Progress Display
**As a** customer,
**I want to** see a visual indicator of my queue progress,
**So that** I can quickly understand how many people are ahead of me.

- **Priority:** High
- **Story Points:** 3
- **Acceptance Criteria:**
  - System displays number of people ahead of the customer
  - Progress updates in real time
  - Display is clear and readable on both mobile and desktop

---

### US-05: Mock Institution API Integration
**As a** developer,
**I want to** simulate an institution's queue API with mock data,
**So that** the system can be tested and demonstrated without a real institution API.

- **Priority:** High
- **Story Points:** 3
- **Acceptance Criteria:**
  - Mock API returns current serving number and total queue
  - Mock data updates at regular intervals to simulate real queue movement
  - Backend successfully fetches and processes mock API responses

---

### US-06: Institution Management (Admin)
**As an** admin,
**I want to** add and manage partner institutions in the system,
**So that** new institutions can be onboarded to the platform easily.

- **Priority:** Medium
- **Story Points:** 3
- **Acceptance Criteria:**
  - Admin can add a new institution with name, type, and API endpoint
  - Admin can update or remove existing institutions
  - Changes reflect immediately in the customer-facing institution list

---

### US-07: Queue Session History
**As a** customer,
**I want to** see a brief summary of my completed queue session,
**So that** I have a record of my transaction visit.

- **Priority:** Low
- **Story Points:** 2
- **Acceptance Criteria:**
  - System stores queue session data (institution, queue number, date)
  - Customer can view their most recent session summary
  - Data is cleared after 24 hours for privacy

---

### US-08: Responsive Mobile Design
**As a** customer,
**I want to** access the platform comfortably on my smartphone,
**So that** I can monitor my queue while doing errands away from the branch.

- **Priority:** High
- **Story Points:** 3
- **Acceptance Criteria:**
  - Website is fully responsive on mobile screens
  - All buttons and inputs are touch-friendly
  - Queue status is clearly visible on small screens

---

### US-09: Queue Abandonment Detection
**As a** system,
**I want to** detect when a queue number has been skipped or expired,
**So that** customers are notified if their turn has passed.

- **Priority:** Medium
- **Story Points:** 5
- **Acceptance Criteria:**
  - System detects when current serving number has passed the customer's number
  - Customer receives a notification that their number was called
  - Session is marked as expired and customer is prompted to get a new number

---

### US-10: Institution API Standardization
**As a** developer,
**I want to** define a standard API protocol that institutions must follow to integrate with QueueLess,
**So that** onboarding new institutions is consistent and scalable.

- **Priority:** Medium
- **Story Points:** 5
- **Acceptance Criteria:**
  - Standard API schema is documented (endpoints, request/response format)
  - Backend handles institutions that follow the standard protocol
  - Error handling exists for institutions with non-compliant responses

---

### US-11: Landing Page
**As a** visitor,
**I want to** see a clear and informative landing page when I visit QueueLess,
**So that** I understand what the platform does before using it.

- **Priority:** Medium
- **Story Points:** 2
- **Acceptance Criteria:**
  - Landing page explains what QueueLess does
  - Clear call-to-action button to start tracking queue
  - Page is visually appealing and mobile responsive

---

### US-12: Browser Push Notification Permission
**As a** customer,
**I want to** be prompted to allow browser push notifications when I start tracking,
**So that** I can receive alerts without providing my phone number.

- **Priority:** Medium
- **Story Points:** 3
- **Acceptance Criteria:**
  - System prompts customer to allow notifications on page load
  - If allowed, system uses browser push for queue alerts
  - If denied, system falls back to SMS notification option

---