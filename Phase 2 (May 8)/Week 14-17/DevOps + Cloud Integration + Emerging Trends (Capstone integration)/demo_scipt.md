# QueueLess — Demo Script (5–7 minutes)
**Version:** v1.0 | **Team:** Novus

---

## Before You Start (Setup Checklist)

- [ ] Backend live on Render — open https://queueless-backend-n1jg.onrender.com/
- [ ] Frontend live on Vercel — open https://queue-less-phi.vercel.app/
- [ ] Admin console open — https://queueless-backend-n1jg.onrender.com/admin/
- [ ] GitHub repo open on the `main` branch
- [ ] Browser notifications allowed on the demo device
- [ ] Two browser tabs ready: one for the "customer" view, one for admin

---

## Segment 1 — Problem (0:00–0:45)

> *"Imagine you're at the Civil Service Commission. You take a physical queue ticket — say number 42 — and you have no idea how long the wait is. Do you sit and stare at the counter? Do you leave and risk missing your turn? That's the problem QueueLess solves."*

- No slides needed — just say it.

---

## Segment 2 — Solution Demo (0:45–2:30)

> *"QueueLess lets you track your queue position remotely using just your physical ticket number."*

**Live demo steps:**

1. Open the frontend → show the institution list loading from the live API.
2. Select **Civil Service Commission** → show the live queue stats (serving number, people waiting).
3. Enter a queue number (e.g., `42`) → click **Track My Queue**.
4. Show the tracker screen:
   - Current serving number
   - People ahead counter
   - Progress bar
   - Status badge
5. Point out: *"This is polling the backend every 5 seconds. No manual refresh needed."*

---

## Segment 3 — Pipeline (2:30–3:45)

> *"Every line of code goes through an automated pipeline before it reaches production."*

Switch to GitHub → show the Actions tab.

1. Point to the latest green CI run.
2. Briefly show the steps: install → lint → pytest → typecheck.
3. Say: *"If any of these fail, the merge is blocked. Nothing broken reaches main."*

> *"We also containerized the backend with Docker — so the environment in CI, in development, and on the server is identical. No 'works on my machine' issues."*

- Show the `Dockerfile` briefly if time allows.

---

## Segment 4 — Deployment (3:45–4:45)

> *"Deployment is automatic. Once CI passes and code merges to main, Render picks it up, runs migrations, and starts the new instance — no manual steps."*

1. Open the Render dashboard → show the deploy history.
2. Point to: *"Migrations run before the server starts. Rolling restart keeps the app live during deploys."*
3. Open the Vercel dashboard → show the frontend deploy tied to the same Git push.

> *"Frontend on Vercel, backend on Render, database and Redis also on Render — all connected via environment variables, no hardcoded credentials anywhere."*

---

## Segment 5 — Metrics and Monitoring (4:45–5:30)

> *"We don't have a full observability stack, but we have the basics in place."*

1. Show Render live logs — point to the auto-tick log lines and request logs.
2. Mention UptimeRobot (or equivalent) pinging the backend every 5 minutes.
3. Point to the architecture doc: *"We documented the auto-tick hybrid design — it drives queue advancement from frontend polls so we don't need a paid always-on worker."*

---

## Segment 6 — Lessons Learned (5:30–6:30)

> *"Three things we'd do differently or carry forward:"*

1. **Docker earlier** — we added containerization late. Starting with it would have made local setup and CI more consistent from day one.

2. **Redis for the auto-tick lock** — in the free tier, the in-memory cache lock doesn't coordinate across multiple Render instances. For production scale we'd enforce Redis from the start.

3. **Notification permission flow** — `Notification.requestPermission()` must be called from a user gesture. We learned this the hard way when push silently failed; always wire permission requests to a button click, not an effect.

---

## Closing (6:30–7:00)

> *"QueueLess v1.0 is live, tested, containerized, and documented. The pipeline is green, the tag is cut, and the system is ready for real users."*

- Show the v1.0 tag on GitHub if time allows.
- Open to questions.

---

## Fallback — If Live Demo Breaks

- Use the admin console to seed data: `/admin/` → add a QueueEntry manually.
- If Render is cold-starting, open the backend URL 2 minutes before the demo.
- The architecture diagram in `docs/architecture.md` can substitute for a live demo if needed.