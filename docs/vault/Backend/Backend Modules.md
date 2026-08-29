---
tags: [backend]
---

# Backend Modules

Every module under `backend/src/modules/`, in the order they're registered in `app.module.ts`. See [[API Endpoints]] for the full route table.

## Prisma
`src/modules/prisma/` — wraps `PrismaClient` as an injectable `PrismaService`, imported by every module that touches the DB.

## Cookies
`src/modules/cookies/` — `GET /cookies/:domain`, `POST /cookies`, `DELETE /cookies/:domain`. Stores raw browser cookies (`name`, `value`, `domain`, `expires`, `httpOnly`, `sameSite`, …) against a `userId`. No controller guard — treat this as an internal/service-to-service endpoint. See [[Architecture#Why a Cookie model exists]] for why this exists with no scraper code alongside it.

## Adzuna
`src/modules/adzuna/` — `GET /adzuna/jobs`. Thin wrapper over the public [Adzuna Jobs API](https://developer.adzuna.com/), currently hardcoded to `country=gb`, `what=software developer`, `where=London` (`adzuna.service.ts`) — looks like a prototype/manual-trigger integration rather than the primary job source.

## Admin
`src/modules/admin/` — `POST /admin/jobs`, behind `AdminGuard`. Bulk job-creation endpoint for manually or programmatically seeding the `Job` table, separate from the public scraper-facing `POST /jobs`.

## Auth
`src/modules/auth/` — OTP-based passwordless auth. `AuthController`:
- `POST /auth/signup/emailVerify` — send OTP to email
- `POST /auth/signup/otpVerify` — verify OTP, returns a JWT
- `POST /auth/login`
- `POST /auth/verify-email?token=`
- `GET /auth` — debug ping, echoes `DATABASE_URL`/`DIRECT_URL` (⚠ leaks env vars, should not be public in production)

`mail.service.ts` sends the OTP emails. `JwtStrategy` (`src/strategies/jwt.strategy.ts`) validates bearer tokens for `JwtAuthGuard`.

## Feeds
`src/modules/feeds/` — CRUD for a user's saved search filters (`JobFeed`), all behind `JwtAuthGuard`:
- `POST /feeds` — create
- `GET /feeds/me` — list the current user's feeds
- `DELETE /feeds/:id`
- `POST /feeds/update/:id`

See [[Data Model#JobFeed]] for the shape.

## Job
`src/modules/job/` — the main job-listing surface:
- `GET /jobs/public` — **unauthenticated**, sanitized (no `url`/`contactEmail`), capped result count. This is what the landing page's `LandingJobs` section calls.
- `POST /jobs` — behind `JwtAuthGuard`, filters jobs against a feed shape (`JobFeed` body) for the authenticated dashboard.

## Telegram
`src/modules/telegram/` — richest module, several files:
- `telegram.controller.ts` — `POST /telegram/code` (link a Telegram account via one-time code), `GET /telegram/connection` (check link status); both behind `JwtAuthGuard`
- `telegram.update.ts` — bot update handler (incoming messages/commands from Telegram)
- `telegram.scheduler.ts` — `@nestjs/schedule` cron that periodically triggers matching
- `telegram.job.matcher.ts` — matches new `Job` rows against every user's `JobFeed`s
- `send.service.ts` / `send.controller.ts` — dispatch formatted messages to Telegram
- `formatter/` — message templates

## Export
`src/modules/export/`, mounted at `/generate` — AI document generation via `@google/genai`:
- `POST /generate/coverletter`
- `POST /generate/cv`
- `POST /generate/proposalLetter` (Upwork-style proposals)

Takes the user's [[Frontend Overview#ProfileDialog|profile form]] plus a `Job`, returns a PDF. Frontend triggers this from `JobCard`'s per-job generate options.

## Email
`src/modules/email/` — `POST /email/subscription`. Toggles a user's email-digest subscription (`User.IsEmailSubscription`), called from the frontend's `NotificationDialog`.

## Supabase
`src/modules/supabase/` — `SupabaseService` wraps `@supabase/supabase-js`, likely used for storage or auxiliary data outside the primary Postgres/Prisma path.
