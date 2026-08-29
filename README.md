# Job Scrapper — JobHooker

JobHooker aggregates job postings from multiple platforms (Upwork, Y Combinator, LinkedIn, Fiverr, Indeed, Glassdoor, Adzuna), matches them against a user's profile, and generates application material (cover letters, CVs, Upwork proposals) with AI. Users create **feeds** — saved search filters — and get notified of new matches over Telegram and email.

This is a monorepo with two apps:

```
job-scrapper/
├── backend/               NestJS API — auth, feeds, jobs, notifications, AI document generation
└── frontend/job-fisher/   React + TypeScript SPA — public landing page + authenticated dashboard
```

## Stack

| | |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion |
| **Backend** | NestJS 10, Prisma (PostgreSQL), Passport/JWT, `@nestjs/schedule` |
| **Integrations** | Supabase, Adzuna API, Telegram Bot API, `@nestjs-modules/mailer`, Google GenAI (`@google/genai`) |
| **Deployment** | Backend → Fly.io (Docker); Frontend → Vercel |

## Getting started

Each app is self-contained with its own `package.json`, `.env`, and README — see [`backend/README.md`](backend/README.md) and [`frontend/job-fisher/README.md`](frontend/job-fisher/README.md) for setup and run instructions.

```bash
# backend
cd backend
npm install
npm run prisma:generate
npm run start:dev

# frontend
cd frontend/job-fisher
npm install
npm run dev
```

## How it fits together

- **Auth** is passwordless: a user submits an email, gets a one-time code, and is issued a JWT (`backend/src/modules/auth`).
- **Feeds** (`backend/src/modules/feeds`) are per-user saved filters — role, location, salary, platforms, skills — used to match incoming jobs to users for notifications.
- **Jobs** land in the database via `POST /jobs` and `POST /admin/jobs`; the public landing page reads a preview through `GET /jobs/public` with no auth required.
- **Notifications**: `telegram` and `email` modules push matches to subscribed users on a schedule.
- **Document generation**: `export` module calls Google GenAI to produce tailored cover letters, CVs, and Upwork proposals as PDFs.
- **Cookies** (`backend/src/modules/cookies`) stores session cookies keyed by domain, used by the scraping side of the pipeline to stay authenticated on job boards.

Full architecture and module-by-module notes live in the Obsidian vault at [`docs/vault/`](docs/vault/Home.md).

## Deployment

- **Backend** ships as a Docker image to Fly.io (`backend/fly.toml`, `backend/Dockerfile`); `prisma migrate deploy` runs as the Fly release command.
- **Frontend** deploys to Vercel (`frontend/job-fisher/vercel.json`) as a static SPA with an `index.html` rewrite for client-side routing.
