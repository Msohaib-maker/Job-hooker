# Job Scraper Backend

NestJS backend application for job scraping functionality.

## Installation

```bash
npm install
```

## Setup Prisma

1. Copy `.env.example` to `.env` and update the `DATABASE_URL`
2. Generate Prisma client:
```bash
npm run prisma:generate
```
3. Run migrations:
```bash
npm run prisma:migrate
```

## Running the app

```bash
# development
npm run start:dev

# production mode
npm run start:prod
```

## Project Structure

```
backend/
├── main.ts
├── app.module.ts
├── jobs/
│   ├── jobs.controller.ts
│   ├── jobs.service.ts
│   ├── jobs.module.ts
│   └── dto/
│       ├── create-job.dto.ts
│       └── scrape-job.dto.ts
├── cookies/
│   ├── cookies.controller.ts
│   ├── cookies.service.ts
│   └── cookies.module.ts
├── scraper/
│   ├── scraper.service.ts
│   └── scraper.module.ts
└── prisma/
    └── schema.prisma
```

