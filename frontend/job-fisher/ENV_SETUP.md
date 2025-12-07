# Environment Variables Setup

This project uses environment variables to configure the API base URL for different environments.

## Setup Instructions

### 1. Create Environment Files

Create the following files in the root of the `frontend/job-fisher` directory:

#### `.env.development`
```env
# Development Environment Variables
VITE_API_URL_DEV=http://localhost:3000

# Optional: Override with a specific URL if needed
# VITE_API_URL=http://localhost:3000
```

#### `.env.production`
```env
# Production Environment Variables
VITE_API_URL_PROD=https://api.yourdomain.com

# Optional: Override with a specific URL if needed
# VITE_API_URL=https://api.yourdomain.com
```

### 2. Configuration Priority

The API base URL is determined in the following priority order:

1. **`VITE_API_URL`** (highest priority) - If set, this will be used regardless of environment
2. **`VITE_API_URL_PROD`** - Used in production builds
3. **`VITE_API_URL_DEV`** - Used in development mode
4. **Default fallback** - `http://localhost:3000` for dev, `https://api.yourdomain.com` for prod

### 3. Usage

The configuration is automatically loaded from `src/services/config.ts` and used by the API client in `src/services/api.ts`.

### 4. Debugging

You can check the current environment configuration by importing and calling:

```typescript
import { getCurrentEnvironment } from "./services/config";

console.log(getCurrentEnvironment());
```

This will log:
- Current mode (development/production)
- Whether it's production or development
- The base URL being used

## Notes

- Environment files (`.env.development`, `.env.production`) are gitignored and should not be committed
- The `.env.example` file (if created) can be committed as a template
- All environment variables must be prefixed with `VITE_` to be accessible in the frontend code
- Changes to environment variables require a restart of the development server

