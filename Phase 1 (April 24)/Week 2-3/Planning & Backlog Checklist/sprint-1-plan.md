# QueueLess — Sprint 1 Plan

## Sprint Overview
- **Sprint Duration:** 2 weeks
- **Sprint Goal:** Build the core queue tracking functionality — customers can select an institution, enter their queue number, and monitor their position in real time using mock data.

---

## Selected Stories for Sprint 1

| Story ID | Title | Priority | Story Points | Assignee |
|----------|-------|----------|-------------|----------|
| US-05 | Mock Institution API Integration | High | 3 | Espina |
| US-03 | Select Institution | High | 2 | Antonio |
| US-01 | View Queue Status | High | 3 | Anino |
| US-04 | Real-Time Queue Progress Display | High | 3 | Antonio |
| US-08 | Responsive Mobile Design | High | 3 | Casia / Flores |
| US-11 | Landing Page | Medium | 2 | Casia / Flores |

**Total Story Points: 16**

---

## Sprint 1 Tasks Breakdown

### Backend (Espina)
- [ ] Set up Django project and install dependencies (DRF, CORS, Channels)
- [ ] Create `queue_tracker` and `mock_api` apps
- [ ] Build mock institution API endpoint (US-05)
- [ ] Build queue status endpoint — fetch and return current serving number (US-01)
- [ ] Set up PostgreSQL database and run migrations
- [ ] Test all API endpoints via Postman

### Frontend (Anino & Antonio)
- [ ] Set up React project with Vite
- [ ] Build institution selection page (US-03)
- [ ] Build queue tracking page with real-time updates (US-01, US-04)
- [ ] Connect frontend to backend API endpoints
- [ ] Implement polling logic (fetch queue status every 5 seconds)

### Design & UI (Casia & Flores)
- [ ] Design landing page layout and components (US-11)
- [ ] Implement responsive mobile design (US-08)
- [ ] Ensure all pages are clean and touch-friendly on mobile

---

## Definition of Done
- Feature is fully implemented and tested
- Code is pushed to the correct repository (frontend/backend)
- No console errors or broken API calls
- Mobile responsive and tested on at least one mobile screen size
- Reviewed by at least one other team member before merging

---

## Sprint 1 Goals Summary
By the end of Sprint 1, a customer should be able to:
1. Visit the Queeless landing page
2. Select a partner institution
3. Enter their queue number
4. See their position in line updating in real time (via mock data)

Notifications and admin features will be tackled in Sprint 2!