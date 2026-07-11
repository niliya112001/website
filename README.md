# Nilaya Hospital — Neon PostgreSQL Backend

## Architecture

```
React (Vite)  →  /api/* proxy  →  Express (port 3001)  →  Neon PostgreSQL
                     ↓
              src/api.ts          server/index.ts         @neondatabase/serverless
```

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS 4
- **Backend**: Express 4 + TypeScript (via tsx)
- **Database**: Neon PostgreSQL (serverless driver over HTTP)

## Setup

### 1. Create a Neon database

1. Sign up at [neon.tech](https://neon.tech)
2. Create a project and copy the connection string
3. Run `server/schema.sql` against your database (via Neon SQL Editor or `psql`)

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env and set NEON_DATABASE_URL
```

### 3. Install and run

```bash
npm install
npm run dev          # Starts Vite (3000) + Express (3001) in parallel
```

### 4. Production

```bash
npm run build        # Builds frontend to dist/
npm start            # Starts Express serving API + static files from dist/
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEON_DATABASE_URL` | Yes | Neon PostgreSQL connection string (server only) |
| `PORT` | No | Express port (default: 3001) |
| `VITE_API_URL` | No | Override API base URL for cross-origin deployments |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/appointments` | Create an appointment booking |
| `GET` | `/api/appointments` | List recent appointments |
| `POST` | `/api/contacts` | Submit a contact inquiry |
| `GET` | `/api/contacts` | List recent inquiries |
| `GET` | `/api/health` | Health check |
