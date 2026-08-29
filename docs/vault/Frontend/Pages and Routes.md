---
tags: [frontend]
---

# Pages and Routes

Defined in `src/App.tsx`.

| Route | Component | Auth | Notes |
|---|---|---|---|
| `/` | `pages/Landing/Landing.tsx` | public | composes Header → Hero → Jobs → Video → HowItWorks → Footer |
| `/privacy` | `pages/PrivacyPolicy.tsx` | public | |
| `/register` | `pages/Register/Register.tsx` | public | email + OTP sign-in/sign-up, same flow for both |
| `/dashboard` | `pages/Dashboard/Dashboard.tsx` | 🔒 `ProtectedRoute` | main authenticated app |
| `*` | → `/` | | catch-all redirect |

## Landing page sections (`pages/Landing/`)

- **LandingHeader** — logo, nav, language switcher, sign-in/get-started CTAs
- **LandingHero** — pitch + animated tile grid of source platforms (Upwork, Fiverr, YC, LinkedIn, Indeed, Glassdoor)
- **LandingJobs** (`id="open-roles"`) — live preview grid backed by `GET /jobs/public` ([[Backend Modules#Job]]); search + type filter, "unlock apply link" CTA nudges toward `/register`
- **LandingVideo** — embedded Guidde walkthrough, English-only regardless of UI language ([[Internationalization]])
- **LandingHowItWorks** — three feature cards (Feeds, AI Documents, Notifications) with mocked UI screenshots
- **LandingFooter**

## Dashboard (`pages/Dashboard/Dashboard.tsx`)

Three-pane layout:
1. **Sidebar** — `FeedList` (create/edit/delete feeds, Telegram connect, notification/billing entry points, sign out)
2. **Jobs panel** (collapsible) — `JobList` filtered to the selected feed
3. **Main content** — stat tiles (high-score matches, new today, new this week) + selected job detail or `UpworkProposalDisplayer` for Upwork-platform jobs

State comes from `useJobFetcher` (`src/hooks/useJobFetcher.ts`), which also tracks the in-progress Upwork proposal text keyed by job id.
