---
tags: [backend, database]
---

# Data Model

Source: `backend/prisma/schema.prisma`. PostgreSQL.

## Job
The scraped/admin-created listing. Indexed on `title`, `location`, `status` for search.

| field | type | notes |
|---|---|---|
| `id` | `String` (uuid) | |
| `title`, `description`, `location`, `company` | `String?` | |
| `platform` | `Platform?` | `Upwork \| Upwork_Inc \| YC \| Y_Combinator \| Fiverr` |
| `salary` | `Int?` | with `salaryCurrency` (default `"USD"`) |
| `experience` | `String?` | free text |
| `type` | `JobType` | `remote \| on_site \| hybrid \| contract`, default `remote` |
| `url`, `contactEmail` | `String?` | stripped out of the public preview endpoint |
| `tags` | `String` | comma-joined, default `""` |
| `status` | `JobStatus` | `pending \| approved \| rejected` |
| `creation` | `DateTime` | default now |

## JobFeed
A user's saved search — what [[Backend Modules#Feeds]] and the [[Backend Modules#Telegram|Telegram matcher]] operate on.

| field | type | notes |
|---|---|---|
| `title` | `String` | role/name of the feed |
| `exp` | `String` | years of experience filter |
| `type` | `JobType` | required |
| `location`, `salary`, `salaryCurrency` | | required except currency (defaults `"USD"`) |
| `tags` | `String` | comma-joined skills |
| `salaryType` | `SalaryType` | `Fixed \| Hourly`, default `Fixed` |
| `platforms` | `String` | comma-joined `Platform` values |
| `userId` → `User` | `String?` | optional FK — a feed can exist without an owner? worth double-checking against `FeedsService` before relying on this |

## User

| field | type | notes |
|---|---|---|
| `id` | `String` | not `@default` — set explicitly by `AuthService`, likely from Supabase or a generated uuid |
| `email` | `String` unique | |
| `password` | `String` | present but auth is OTP-based end-to-end — check whether this is actually used or vestigial |
| `emailVerified`, `emailVerificationToken/ExpiresAt/SentAt`, `emailVerifiedAt` | | email verification lifecycle |
| `telegram_handle`, `telegram_one_time_code` (unique), `email_handler` | `String?` | Telegram/email linking |
| `IsEmailSubscription` | `Boolean` | toggled via [[Backend Modules#Email]] |
| `jobFeeds` | `JobFeed[]` | one-to-many |

## Cookie
See [[Backend Modules#Cookies]] and [[Architecture#Why a Cookie model exists]].

| field | type |
|---|---|
| `id` | `Int` autoincrement |
| `name`, `value`, `domain` | `String` |
| `path`, `sameSite` | `String?` |
| `expires` | `DateTime?` |
| `httpOnly`, `secure` | `Boolean?` |
| `userId` | `String` — **not** a relation to `User`, just a plain string field |
| `createdAt` | `DateTime` |

## Enums

- **JobStatus**: `pending`, `approved`, `rejected`
- **JobType**: `remote`, `on_site`, `hybrid`, `contract`
- **SalaryType**: `Fixed`, `Hourly`
- **Platform**: `Upwork`, `Upwork_Inc`, `YC`, `Y_Combinator`, `Fiverr` — note this list is narrower than what the frontend's feed form offers (LinkedIn, CareerBuilder, Glassdoor, Indeed also appear in `FeedDialog`'s platform picker but aren't in this enum; the DTO likely stores platforms as free-form comma-separated strings rather than validating against the enum strictly — worth confirming in `feeds.service.ts` before assuming parity)
