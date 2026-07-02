# ── SportBook — Dockerfile ──────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Dépendances backend
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

# Code backend
COPY backend/ ./backend/

# Frontend
COPY frontend/ ./frontend/

EXPOSE 3000

CMD ["node", "backend/server.js"]
