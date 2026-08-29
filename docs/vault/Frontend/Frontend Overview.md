---
tags: [frontend]
---

# Frontend Overview

`frontend/job-fisher/` — React 18 + TypeScript SPA, Vite build, Tailwind CSS, dark theme throughout (`#0F0F0F` background, `#10B981` accent). Package name `uphunt-frontend`; product name in the UI is **JobHooker**.

## Stack

React Router v6, Framer Motion (page/section animation), Lucide icons, `@supabase/supabase-js`, `axios`, `countries-list`, `currency-codes`.

## Entry point & providers

`src/main.tsx` → `App.tsx`, which nests providers around the router:

```
I18nProvider          → see [[Internationalization]]
  AuthProvider         → src/contexts/AuthContext.tsx, JWT from backend /auth
    Router
      Routes           → see [[Pages and Routes]]
```

## Auth flow

`AuthContext` calls the backend's OTP endpoints ([[Backend Modules#Auth]]):
1. `verifyEmail(email)` → `POST /auth/signup/emailVerify`
2. `otpVerify(email, code)` → `POST /auth/signup/otpVerify`, stores the returned JWT
3. `ProtectedRoute` (`src/components/ProtectedRoute.tsx`) redirects to `/register` if not authenticated, gating `/dashboard`

## Services layer

`src/services/` — one file per backend concern (`api.ts` axios instance, `auth.ts`, `jobs.ts`, `feeds.ts`, `files.ts` for document export, `subscribe.ts` for email subscription, `jobCache.ts`). These map 1:1 to [[API Endpoints]].

## ProfileDialog

`src/components/ProfileDialog.tsx` — the largest component (~1000 lines). Two-step form (basic info + description, then experience/education/skills/interests/certs/languages) that feeds AI document generation ([[Backend Modules#Export]]) via `JobCard`'s per-job "Generate" action. Not persisted server-side between sessions as far as the code shows — filled out fresh per generation.

## Config

`src/services/config.ts` reads `VITE_*` env vars (see `frontend/job-fisher/.env.local`, `ENV_SETUP.md`). `VITE_BOT_URL` is used by `FeedList` to deep-link into the Telegram bot for account linking.
