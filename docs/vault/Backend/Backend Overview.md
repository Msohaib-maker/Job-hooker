---
tags: [backend]
---

# Backend Overview

`backend/` — NestJS 10 API. Entry point `main.ts` → `app.module.ts` wires up every feature module (see [[Backend Modules]]).

## Stack

- **Framework**: NestJS 10, Express platform
- **DB/ORM**: PostgreSQL via Prisma (`@prisma/client`, `@prisma/adapter-pg`) — schema at `backend/prisma/schema.prisma`, see [[Data Model]]
- **Auth**: Passport + `@nestjs/jwt`, OTP email flow (no passwords for end users despite a `password` field existing on `User`)
- **Scheduling**: `@nestjs/schedule` — drives the Telegram match-and-notify cron
- **AI**: `@google/genai` for document generation ([[Backend Modules#Export]])
- **Email**: `@nestjs-modules/mailer`
- **External data**: `@supabase/supabase-js`, Adzuna public jobs API

## Config

Environment is loaded via `@nestjs/config`, file selected by `NODE_ENV`:

- `NODE_ENV=production` → `.env.production`
- otherwise → `.env.development` (not present in the repo snapshot — create it locally; see `.env` / `.env.production` as reference for required keys)

## Running locally

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate      # applies migrations to your local DATABASE_URL
npm run start:dev
```

Useful scripts (`backend/package.json`):

| script | purpose |
|---|---|
| `start:dev` | watch mode |
| `build` / `start:prod` | compile to `dist/`, run compiled output |
| `prisma:studio` | browse the DB |
| `test`, `test:e2e`, `test:cov` | Jest |
| `lint` | ESLint with `--fix` |

## Deployment

Fly.io, Docker (`backend/Dockerfile`, `backend/fly.toml`). `release_command = "npx prisma migrate deploy"` runs migrations automatically on every deploy. App name `backend-young-snow-881`, region `cdg`, scales to zero (`min_machines_running = 0`).

## Path alias

`@/*` resolves to the backend root (see imports like `@/src/guards/jwt-auth.guard` throughout the modules).
