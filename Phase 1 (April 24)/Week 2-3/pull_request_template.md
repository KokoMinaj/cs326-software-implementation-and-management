## Summary

<!--  This PR implements the queue tracking page (US-01, US-04) with 5-second polling. It also adds unit tests for the mock API endpoint. -->

---

## Screenshots

> Attach before/after screenshots or screen recordings here.

| Before | After |
|--------|-------|
| _(paste screenshot)_ | _(paste screenshot)_ |

---

## Testing Evidence


- [ ] <!-- e.g. Postman: all /queue endpoint tests passed -->
- [ ] <!-- e.g. Unit tests: ran `npm test`, 12/12 passing -->
- [ ] <!-- e.g. Manual: verified queue position updates every 5 seconds in browser -->
- [ ] <!-- e.g. Staging DB migration tested without errors -->

---

## Linked Issue(s)

> Reference the GitHub issue(s) this PR closes or relates to.

- Closes #<!-- issue number -->
- Related to #<!-- issue number -->

---

## Linked Risk(s)

- [ ] **RISK-01** — Team member becomes unavailable _(High)_
- [ ] **RISK-02** — Merge conflicts break main/dev _(High)_
- [ ] **RISK-03** — Mock API returns stale or incorrect data _(High)_
- [ ] **RISK-04** — Poor test coverage, bugs reach production _(High)_
- [ ] **RISK-05** — Database schema changes break existing features _(High)_
- [ ] **RISK-06** — Deployment failure at submission _(Medium)_
- [ ] **RISK-07** — Scope creep delays core features _(Medium)_
- [ ] **RISK-08** — Real-time polling causes performance issues _(Medium)_

---

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Refactor
- [ ] Test
- [ ] Docs
- [ ] Chore / config

---

## Checklist

- [ ] I pulled from `dev` before creating this branch
- [ ] At least one reviewer is assigned
- [ ] New functionality includes at least one test
- [ ] PR is scoped — no unplanned features added
- [ ] Tested against staging or local mock
- [ ] No console errors in the browser