# System Architecture — QueueLess
**Version:** v1.0  
**Last Updated:** May 2026  
**Prepared by:** Novus Team

---

## 1. Overview

QueueLess is a two-tier web application that allows customers to track their physical queue position remotely. The system is composed of a React single-page application (frontend) and a Django REST Framework backend, connected via a REST API and a Web Push notification pipeline.

---

## 2. Architecture Diagram (ASCII)

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                               │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐     │
│   │              React SPA  (Vite + TypeScript)              │     │
│   │                                                          │     │
│   │  ┌────────────┐  ┌────────────┐  ┌──────────────────┐  │     │
│   │  │  Institution│  │  Queue     │  │  Tracker Page    │  │     │
│   │  │  Select UI  │  │  Join UI   │  │  (Live Polling)  │  │     │
│   │  └────────────┘  └────────────┘  └──────────────────┘  │     │
│   │                                                          │     │
│   │  ┌─────────────────────────────────────────────────┐   │     │
│   │  │  Service Worker (sw.js) — Web Push Handler      │   │     │
│   │  └─────────────────────────────────────────────────┘   │     │
│   └──────────────────────────────────────────────────────────┘     │
│                  │ HTTPS REST (fetch / polling)                     │
│                  │ VAPID Web Push (via FCM)                         │
└──────────────────┼──────────────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────────────┐
│                         API LAYER (Render)                          │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐     │
│   │            Django 6 + Django REST Framework              │     │
│   │                                                          │     │
│   │  /api/institutions/     → InstitutionViewSet             │     │
│   │  /api/queue/join/       → QueueJoinView                  │     │
│   │  /api/queue/entries/*/  → Status / CheckIn / Cancel      │     │
│   │  /api/notifications/*/  → List / Acknowledge / Subscribe │     │
│   │  /api/queue/auto-tick/  → QueueAutoTickView (Admin)      │     │
│   │                                                          │     │
│   │  ┌──────────────────┐   ┌───────────────────────────┐  │     │
│   │  │  queue_tracker   │   │      notifications        │  │     │
│   │  │  (services.py)   │   │  (utils.py + pywebpush)   │  │     │
│   │  └──────────────────┘   └───────────────────────────┘  │     │
│   └──────────────────────────────────────────────────────────┘     │
│          │ ORM (psycopg2)          │ Cache (Redis)                  │
└──────────┼─────────────────────────┼───────────────────────────────┘
           │                         │
┌──────────▼──────────┐   ┌──────────▼──────────┐
│  PostgreSQL (Render) │   │  Redis (Render)      │
│  - Institution       │   │  - Auto-tick locks   │
│  - QueueEntry        │   │  - Throttle windows  │
│  - Notification      │   │  - Channel layers    │
│  - PushSubscription  │   └─────────────────────┘
└─────────────────────┘
```

---

## 3. Component Descriptions

### 3.1 Frontend — React SPA (Vercel)

The frontend is a Vite + TypeScript single-page application deployed on Vercel. It uses hash-based routing (`useRouter.ts`) to navigate between two views: the institution selection / queue join flow, and the live tracker page.

All API communication goes through a centralized `apiFetch` client (`src/api/clients.ts`) that reads `VITE_API_URL` from environment variables, making it trivial to point at a local, staging, or production backend without code changes.

**Key frontend hooks:**

- `useLiveQueue` — polls `GET /api/queue/entries/{session_id}/status/` every 5 seconds and calls `autoTick` to drive queue advancement in hybrid mode.
- `useNotifications` — polls `GET /api/notifications/entries/{session_id}/notifications/` every 15 seconds and fires browser Notification API alerts on undelivered events.
- `useTrackerState` — orchestrates all tracker UI state, including push subscription setup, audio cues, cancel flow, and modal management.

**Service Worker (`public/sw.js`):**

The service worker intercepts Web Push events from the backend (delivered via VAPID + pywebpush). It renders OS-level notifications with contextual vibration patterns and action buttons depending on the event type (`near_turn`, `turn_called`, `session_expired`).

---

### 3.2 Backend — Django REST Framework (Render)

The backend is organized into three Django apps:

**`mock_api`** manages the `Institution` model. It exposes a read-only `InstitutionViewSet` that annotates each institution with live queue summary fields (`queue_waiting_count`, `current_serving_number`, `next_queue_number`) using a single annotated queryset — avoiding N+1 queries.

**`queue_tracker`** owns the core `QueueEntry` model and all queue lifecycle logic. The service layer (`services.py`) handles:

- Queue join with optimistic retry and `select_for_update` locking to prevent duplicate queue number allocation under concurrent requests.
- `simulate_queue_tick_for_institution` — a transactional function that expires stale SERVING entries, transitions checked-in entries to SERVED, advances the `current_serving_number`, promotes WAITING entries to SERVING, and triggers near-turn notifications — all in a single DB transaction.
- `maybe_auto_tick_institution` — a Redis-backed throttle and lock mechanism that prevents duplicate ticks from concurrent frontend pollers hitting the same institution simultaneously.
- `auto_tick_active_institutions` — called by the admin `POST /api/queue/auto-tick/` endpoint to drive all active institutions in a single pass.

**`notifications`** manages the `Notification` and `PushSubscription` models. Web Push delivery (`utils.py`) uses `pywebpush` with VAPID authentication. Notifications are created synchronously inside the DB transaction and dispatched via `transaction.on_commit()` to avoid sending pushes for transactions that roll back.

---

### 3.3 Data Flow — Queue Tracking Lifecycle

```
Customer arrives at institution
        │
        ▼
Gets physical ticket (#42) from the teller machine
        │
        ▼
Opens QueueLess → selects institution → enters #42
        │
        ▼
POST /api/queue/join/  →  QueueEntry created (status: waiting)
        │
        ▼
Frontend polls GET /api/queue/entries/{session_id}/status/ every 5s
   └── Each poll also calls POST /api/queue/auto-tick/ (throttled)
        │
        ▼
Auto-tick advances current_serving_number
   └── When current_serving_number approaches queue_number:
       → status: notified  (near_turn notification created)
       → push sent to browser / Service Worker fires OS alert
        │
        ▼
current_serving_number reaches queue_number
   → status: serving  (turn_called notification created)
   → Frontend auto-calls PATCH /api/queue/entries/{id}/check-in/
   → expires_at set (grace period timer starts)
        │
        ▼
Next tick detects checked_in_at is set → status: served
   → session_completed notification created
   → Frontend navigates to done screen
```

---

### 3.4 Auto-Tick Hybrid Architecture

Because the team does not use a paid always-on background worker in production, queue advancement is driven by a hybrid mechanism:

**Request-driven ticks:** Every call to `GET /api/queue/entries/{session_id}/status/` and `GET /api/notifications/...` triggers `maybe_auto_tick_institution`. The throttle window (default: 15 seconds) and Redis lock ensure only one tick fires per institution per interval, even when dozens of customers are polling simultaneously.

**Scheduled ticks:** A periodic cron job or external ping to `POST /api/queue/auto-tick/` (admin-authenticated) ensures queues progress even during low-traffic periods.

This design keeps hosting costs at the free/starter tier while maintaining acceptable queue movement cadence for demonstration and real-world use.

---

## 4. Database Schema (Key Tables)

```
Institution
├── id, name, institution_type, address
├── status (open / closed / paused)
└── is_active

QueueEntry
├── session_id (UUID, public-facing identifier)
├── institution_id (FK → Institution)
├── queue_number, current_serving_number
├── status (waiting → notified → serving → served / expired / cancelled)
├── near_turn_threshold, near_turn_notified
├── issued_at, turn_called_at, checked_in_at, served_at, expires_at
└── phone_number, browser_push_opt_in

Notification
├── queue_entry_id (FK → QueueEntry)
├── channel (browser / sms / system)
├── event_type (near_turn / turn_called / session_expired / session_completed)
├── message, delivered, sent_at
└── external_reference, error_detail

PushSubscription
├── queue_entry_id (FK → QueueEntry)
├── endpoint, p256dh, auth
└── created_at, updated_at
```

**Key constraints:**
- `UniqueConstraint` on `(institution, queue_number)` where `status IN (waiting, notified, serving)` — prevents duplicate active tracking of the same ticket.
- `CheckConstraint` on `current_serving_number >= 0`.
- Composite indexes on `(institution, status)` and `(institution, queue_number)` for fast queue lookups.

---

## 5. External Services

| Service | Purpose | Plan Used |
|---|---|---|
| Vercel | Frontend hosting (React SPA) | Free / Hobby |
| Render | Backend hosting (Django) | Starter |
| Render PostgreSQL | Managed relational database | Starter |
| Render Redis | Cache + channel layer | Starter |
| Firebase Cloud Messaging | Web Push delivery relay | Free |
| VAPID (pywebpush) | Push authentication | Self-hosted keys |