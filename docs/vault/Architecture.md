---
tags: [architecture]
---

# Architecture

> See also: [[Architecture.canvas|the visual version of this diagram]] — same layers, clickable through to each module's note.

Two apps, one Postgres database, and an implied external scraping process that this repo does not contain.

```
                          ┌─────────────────────────┐
   job boards  ─────────► │  external scraper(s)    │   (not in this repo —
   (Upwork, YC, LinkedIn, │  reads [[#Cookies]] for  │    presumably headless
   Fiverr, Indeed, ...)   │  authenticated sessions  │    browser automation)
                          └───────────┬─────────────┘
                                      │ POST /jobs, POST /admin/jobs
                                      ▼
┌────────────────────┐   REST   ┌───────────────────────────┐
│ frontend/job-fisher │◄────────►│  backend (NestJS)          │
│ React SPA, Vercel   │          │  Fly.io, PostgreSQL/Prisma │
└────────────────────┘          └───────────┬───────────────┘
                                             │
                        ┌────────────────────┼────────────────────┐
                        ▼                    ▼                    ▼
                 Telegram Bot API      SMTP (mailer)        Google GenAI
                 (match alerts)        (match alerts,       (cover letters,
                                        OTP codes)           CVs, proposals)
```

## Why a `Cookie` model exists

The backend has no Puppeteer/scraping code of its own (`puppeteer` is a listed dependency but unused in `src/`) — see [[Backend Modules#Cookies]]. The `Cookie` table stores per-domain session cookies, which strongly implies a separate scraping process (cron job, script, or another service) authenticates against job boards using cookies fetched from this API, then pushes scraped jobs back in via `POST /jobs` or `POST /admin/jobs`. That scraper is not part of this repository.

## Request flow: a new job reaching a user

1. Scraper (external) POSTs a job → `JobController` / `AdminController` → `Job` row created with `status: pending`.
2. `TelegramScheduler` (`@nestjs/schedule` cron) periodically runs `TelegramJobMatcher`, comparing new jobs against every user's [[Data Model#JobFeed|JobFeed]] filters.
3. Matches are pushed to Telegram (`send.service.ts`) and/or queued for the email digest.
4. User opens the dashboard, sees the job, and can trigger [[Backend Modules#Export|Export]] to generate a tailored cover letter/CV/proposal via Google GenAI.

## Auth flow

Passwordless, OTP-based — see [[Backend Modules#Auth]] and [[Frontend Overview#Auth flow]]:

1. `POST /auth/signup/emailVerify` — user submits email, backend emails a one-time code.
2. `POST /auth/signup/otpVerify` — user submits the code, backend issues a JWT.
3. Frontend stores the JWT (`AuthContext`) and attaches it as a bearer token to `feeds`, `job` (non-public), and `telegram` requests via `JwtAuthGuard`.
