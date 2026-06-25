# ── Build stage: install deps + build the Vite SPA ─────────────────────────────
FROM oven/bun:1 AS build
WORKDIR /app

# Cache deps separately
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build-time env (VITE_*). Override via Coolify build args / env if needed.
ARG VITE_URL_HOME
ARG VITE_CLAIM_URL
ARG VITE_URL_GOSOK
ARG VITE_URL_SPIN
ARG VITE_URL_EGG
ARG VITE_URL_KOPER
ENV VITE_URL_HOME=$VITE_URL_HOME \
    VITE_CLAIM_URL=$VITE_CLAIM_URL \
    VITE_URL_GOSOK=$VITE_URL_GOSOK \
    VITE_URL_SPIN=$VITE_URL_SPIN \
    VITE_URL_EGG=$VITE_URL_EGG \
    VITE_URL_KOPER=$VITE_URL_KOPER

COPY . .
RUN bun run build

# ── Runtime stage: zero-dep Node static server ─────────────────────────────────
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=5281

COPY --from=build /app/dist ./dist
COPY server.mjs ./

# Coolify reads this to know which port to proxy.
EXPOSE 5281

CMD ["node", "server.mjs"]
