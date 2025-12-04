# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.19.4
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="NestJS/Prisma"

WORKDIR /app
ENV NODE_ENV="production"

# -----------------
# Build stage
# -----------------
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp openssl pkg-config python-is-python3

# Install node modules (including dev for Prisma/Nest build)
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Generate Prisma Client
COPY prisma .
COPY prisma.config.ts .
RUN npx prisma generate

# Copy application code
COPY . .

# Build application
RUN npm run build

# -----------------
# Final stage
# -----------------
FROM base

# Install runtime packages only
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

# Copy built app and production node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/prisma /app/prisma

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "run", "start:prod"]