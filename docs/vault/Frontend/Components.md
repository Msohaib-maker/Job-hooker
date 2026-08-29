---
tags: [frontend]
---

# Components

`src/components/`. Grouped by what they belong to rather than alphabetically — several are unused dead code, flagged below.

## Feed management
- **FeedList** — sidebar shell; owns dialogs via `useFeedManager` (`src/hooks/useFeedHook.ts`)
- **FeedItem** — single feed row, edit/delete actions
- **FeedDialog** — two-step create/edit form (`useFeedForm`, `src/hooks/useFeedForm.ts`); role, experience, platforms, type, country on step 1, skills + salary on step 2
- **AddFeedButton** — ⚠ not imported anywhere; dead code

## Jobs
- **JobList** — searchable list wrapper around `JobCard`
- **JobCard** — the big one: platform-aware generate options (cover letter/CV for generic, CV+proposal for Upwork, pitch video+interview for YC, description for Fiverr), opens `ProfileDialog` on "Generate"
- **JobDetail** — ⚠ not imported anywhere; dead code
- **PlatformTitle** — the "Job**Hooker**" wordmark, reused in header/footer/sidebar/register

## Profile & documents
- **ProfileDialog** — see [[Frontend Overview#ProfileDialog]]
- **Checkbox**, **Slider**, **InputElement**, **SelectField**, **CustomSelect**, **DropDown** — form primitives; `DropDown.tsx`'s `Dropdown` component (portal-rendered, single/multi mode) is what `FeedDialog` actually uses. `CustomSelect` and `SelectField` are ⚠ unused alternates.

## Dialogs
- **NotificationDialog** — Telegram connect status + email subscription toggle ([[Backend Modules#Email]], [[Backend Modules#Telegram]])
- **BillingDialog** — Free/Pro tier display, "Active Development" — not wired to real billing yet

## Layout / misc
- **Header**, **SearchBar**, **Filters** — ⚠ generic/light-themed, not used by the actual (dark-themed) app; look like an earlier iteration
- **BottomActions** — sidebar footer (notification settings, sign out)
- **ProtectedRoute** — route guard, see [[Frontend Overview#Auth flow]]
- **LanguageSwitcher** — see [[Internationalization]]

## Hooks (`src/hooks/`)
- `useFeedForm.ts` / `useFeedHook.ts` — feed CRUD + form state
- `useJobFetcher.ts` — dashboard job list, stats, selection, Upwork proposal state
