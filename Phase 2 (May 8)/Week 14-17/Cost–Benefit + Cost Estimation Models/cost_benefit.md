# Cost–Benefit Analysis — QueueLess
**Project:** QueueLess — Queue Tracking System  
**Prepared by:** Novus Team  
**Date:** May 2026  

---

## 1. Overview

This document estimates the total development and operational costs of the QueueLess platform and evaluates the tangible and intangible benefits it delivers to users and partner institutions. It concludes with an ROI calculation and a project recommendation.

---

## 2. Development Cost Estimation

The team is composed of 5 members working across a 17-week academic project. Cost is estimated using a standard junior developer freelance rate in the Philippines of **₱150/hour** — a conservative but realistic figure for student-level work in the Mindanao region.

### 2.1 Team Effort Breakdown

| Team Member | Role | Est. Hours/Week | Total Weeks Active | Total Hours | Cost @ ₱150/hr |
|---|---|---|---|---|---|
| Glenn Mark Anino | Project Manager & Full-Stack Dev | 12 | 17 | 204 | ₱30,600 |
| Den Jester Antonio | Full-Stack Dev & QA | 12 | 17 | 204 | ₱30,600 |
| John Jaybird Casia | Designer & Support Dev | 10 | 17 | 170 | ₱25,500 |
| John Cyril Espina | Backend Engineer & DevOps | 14 | 17 | 238 | ₱35,700 |
| Sophia Marie Flores | Designer & Support Dev | 10 | 17 | 170 | ₱25,500 |
| **TOTAL** | | | | **986 hours** | **₱148,500** |

> Note: Hours include coding, meetings, documentation, testing, and deployment tasks.

### 2.2 Tooling & Software Costs (Development Phase)

| Item | Cost |
|---|---|
| GitHub (Free tier used) | ₱0 |
| Figma (Free tier for wireframes) | ₱0 |
| Postman (Free tier for API testing) | ₱0 |
| Vercel (Free tier for frontend) | ₱0 |
| Render (Free tier for backend/staging) | ₱0 |
| **Subtotal** | **₱0** |

All tooling used during development falls within free tiers available to student teams.

### 2.3 Total Development Cost

| Category | Amount |
|---|---|
| Human Resource (Labor) | ₱148,500 |
| Tooling & Software | ₱0 |
| **Total Development Cost** | **₱148,500** |

---

## 3. Operational Cost Estimation (Annual — Post-Launch)

Once deployed to a real institution (e.g., a rural bank, LGU office, or SSS branch), the following costs apply per year.

### 3.1 Hosting Costs

| Service | Plan | Monthly Cost | Annual Cost |
|---|---|---|---|
| Vercel (Frontend) | Pro (for custom domain + analytics) | ₱1,120 (~$20) | ₱13,440 |
| Render (Backend + Worker) | Starter plan | ₱560 (~$10) | ₱6,720 |
| Managed PostgreSQL (Render) | Starter DB | ₱560 (~$10) | ₱6,720 |
| Redis (Caching for auto-tick) | Render Redis Starter | ₱280 (~$5) | ₱3,360 |
| **Hosting Subtotal** | | **₱2,520/month** | **₱30,240/year** |

> Exchange rate used: ₱56 = $1 USD (approximate as of 2026).

### 3.2 Third-Party Service Costs

| Service | Usage | Monthly Cost | Annual Cost |
|---|---|---|---|
| Twilio (SMS Notifications) | ~500 SMS/month @ ₱3.50/SMS | ₱1,750 | ₱21,000 |
| Firebase Cloud Messaging (FCM) | Free tier (push notifications) | ₱0 | ₱0 |
| **Third-Party Subtotal** | | **₱1,750/month** | **₱21,000/year** |

### 3.3 Maintenance Effort (Annual)

Post-launch maintenance is estimated at 4 hours/month for bug fixes, dependency updates, and minor feature work, handled by one developer at ₱150/hour.

| Task | Hours/Month | Monthly Cost | Annual Cost |
|---|---|---|---|
| Bug fixes & dependency updates | 2 | ₱300 | ₱3,600 |
| Minor feature additions | 2 | ₱300 | ₱3,600 |
| **Maintenance Subtotal** | 4 | **₱600/month** | **₱7,200/year** |

### 3.4 Total Annual Operational Cost

| Category | Annual Cost |
|---|---|
| Hosting | ₱30,240 |
| Third-Party Services (SMS) | ₱21,000 |
| Maintenance Labor | ₱7,200 |
| **Total Annual OpEx** | **₱58,440/year** |

---

## 4. Total Cost (Year 1)

| Phase | Cost |
|---|---|
| Development (one-time) | ₱148,500 |
| Year 1 Operations | ₱58,440 |
| **Total Year 1 Cost** | **₱206,940** |

---

## 5. Benefits

### 5.1 Tangible Benefits

These are measurable, quantifiable savings.

#### Time Saved per Customer

In a typical Philippine bank or government office scenario, customers spend an average of **45 minutes waiting** in line. QueueLess enables remote monitoring, allowing customers to arrive closer to their turn. Conservatively, the system saves **25 minutes per visit**.

| Metric | Value |
|---|---|
| Average customers served per institution per day | 80 |
| Time saved per customer | 25 minutes |
| Working days per year | 250 |
| Total person-hours saved per institution/year | 8,333 hours |
| Value of person-hour (minimum wage basis, NCR ~₱645/8hrs) | ₱80/hour |
| **Estimated Value of Time Saved (per institution/year)** | **₱666,640** |

#### Reduced Staff Overhead for Queue Management

Institutions currently assign 1 staff member to manage physical queuing (calling numbers, managing crowds). With QueueLess automating notifications and queue tracking, this role can be partially redeployed.

| Metric | Value |
|---|---|
| Staff hours saved per week | 10 hours |
| Hourly wage (clerical, Philippine gov't rate) | ₱75/hour |
| Annual savings | **₱39,000/year** |

#### Reduced Walk-Aways & Lost Transactions

Walk-aways — customers who leave before being served — represent lost revenue for banks and service gaps for government offices. QueueLess notifications reduce walk-aways by an estimated 30%.

| Metric | Value |
|---|---|
| Estimated walk-aways per day (without system) | 8 customers |
| Reduction rate | 30% |
| Prevented walk-aways per day | 2.4 |
| Average transaction value (bank fees, service revenue) | ₱200 |
| Working days per year | 250 |
| **Estimated Revenue Retained/year** | **₱120,000** |

#### Total Estimated Tangible Benefits (Per Institution/Year)

| Benefit | Annual Value |
|---|---|
| Customer time savings (productivity value) | ₱666,640 |
| Staff redeployment savings | ₱39,000 |
| Reduced walk-away losses | ₱120,000 |
| **Total Tangible Benefits** | **₱825,640/year** |

---

### 5.2 Intangible Benefits

These benefits are real but harder to assign a peso value to.

**Improved Customer Satisfaction.** Customers who can monitor their queue remotely experience significantly less stress and frustration. This improves the institution's public image and encourages repeat visits.

**Competitive Differentiation.** Institutions that adopt QueueLess stand out from competitors who still rely on manual number calling. This is a meaningful differentiator in the Philippine banking and government service sectors.

**Reduced Physical Crowding.** By enabling customers to wait offsite, QueueLess reduces crowding in waiting areas — improving comfort, hygiene, and compliance with health protocols (relevant post-pandemic).

**Data-Driven Queue Management.** The system generates queue session data that institutions can use to optimize staffing schedules and service windows, leading to better long-term operational decisions.

**Institutional Brand Trust.** Offering a modern digital queue system signals to customers that the institution is forward-thinking and invested in service quality.

---

## 6. Return on Investment (ROI)

### 6.1 ROI Calculation (Year 1, Single Institution)

| Item | Value |
|---|---|
| Total Year 1 Cost | ₱206,940 |
| Total Tangible Benefits (Year 1) | ₱825,640 |
| **Net Benefit (Year 1)** | **₱618,700** |

**ROI Formula:**

```
ROI = (Net Benefit / Total Cost) × 100
ROI = (₱618,700 / ₱206,940) × 100
ROI ≈ 299%
```

The system is projected to deliver approximately **₱3 in benefit for every ₱1 invested** in Year 1.

### 6.2 Break-Even Point

With Year 1 operational cost at ₱58,440 and monthly benefits of ~₱68,800 (₱825,640 ÷ 12), the system reaches break-even on operational costs within the **first month of deployment**.

Development cost (₱148,500) is recovered within approximately **2.2 months** of live operation.

---

## 7. Case Study: Impact at Scale

**Scenario:** QueueLess is adopted by 10 partner institutions (e.g., 5 rural banks, 3 LGU service offices, 2 utility providers) in Cagayan de Oro and nearby municipalities.

| Metric | Single Institution | 10 Institutions |
|---|---|---|
| Customers served per year | 20,000 | 200,000 |
| Person-hours of waiting saved | 8,333 hrs | 83,333 hrs |
| Walk-aways prevented | 600/yr | 6,000/yr |
| Total tangible benefit | ₱825,640 | ₱8,256,400 |
| Total operational cost | ₱58,440 | ₱175,320* |
| **Net Annual Benefit** | **₱767,200** | **₱8,081,080** |

*Operational costs scale sublinearly due to shared infrastructure (single backend, shared hosting).

At 10 institutions, QueueLess generates an estimated **₱8 million in combined annual societal and institutional value**, with operational costs of under ₱200,000 — a 46x return on operational investment.

---

## 8. Recommendation

**Recommendation: PROCEED WITH FULL DEPLOYMENT.**

The cost-benefit analysis strongly supports investing in QueueLess. The system delivers a Year 1 ROI of approximately 299%, with a development cost recovery period of under 3 months once deployed to a live institution.

The core value proposition — reducing wasted waiting time for Filipino customers in banks and government offices — directly addresses a well-documented pain point in everyday public service delivery in the Philippines.

**Suggested next steps:**

1. Approach at least one pilot partner institution (e.g., a cooperative bank or city hall office in Cagayan de Oro) to deploy the system in a real environment.
2. Collect actual queue data over 30–60 days to validate or adjust the benefit estimates in this document.
3. Evaluate the feasibility of introducing a **SaaS subscription model** for institutions (e.g., ₱2,500–₱5,000/month), which would make QueueLess financially self-sustaining with as few as 2–3 paying partners.
4. Revisit SMS cost projections after the pilot, as volume may differ from estimates.

The system is technically sound, ethically designed, and economically justified. The team should move forward with confidence.

---

*This document was prepared as part of the QueueLess capstone project by the Novus Team. All cost and benefit figures are estimates based on publicly available Philippine wage data, freelance market rates, and reasonable service usage assumptions.*