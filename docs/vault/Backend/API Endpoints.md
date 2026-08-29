---
tags: [backend, api]
---

# API Endpoints

All controllers, grouped by module. `🔒` = behind `JwtAuthGuard`, `🛡` = behind `AdminGuard`, unmarked = public. See [[Backend Modules]] for what each does.

| Method | Path | Module | Guard |
|---|---|---|---|
| GET | `/jobs/public` | job | — |
| POST | `/jobs` | job | 🔒 |
| POST | `/admin/jobs` | admin | 🛡 |
| POST | `/auth/signup/emailVerify` | auth | — |
| POST | `/auth/signup/otpVerify` | auth | — |
| POST | `/auth/login` | auth | — |
| GET | `/auth` | auth | — (debug ping — see [[Backend Modules#Auth]]) |
| POST | `/auth/verify-email` | auth | — |
| POST | `/feeds` | feeds | 🔒 |
| GET | `/feeds/me` | feeds | 🔒 |
| DELETE | `/feeds/:id` | feeds | 🔒 |
| POST | `/feeds/update/:id` | feeds | 🔒 |
| POST | `/telegram/code` | telegram | 🔒 |
| GET | `/telegram/connection` | telegram | 🔒 |
| GET | `/cookies/:domain` | cookies | — |
| POST | `/cookies` | cookies | — |
| DELETE | `/cookies/:domain` | cookies | — |
| GET | `/adzuna/jobs` | adzuna | — |
| POST | `/email/subscription` | email | — |
| POST | `/generate/coverletter` | export | — |
| POST | `/generate/cv` | export | — |
| POST | `/generate/proposalLetter` | export | — |

Cookies and export endpoints are unguarded at the controller level — check `main.ts`/middleware for any global auth before treating that as intentional.
