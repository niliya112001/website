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
| `SMTP_HOST` | Yes* | SMTP server host (e.g., `smtp.gmail.com`) |
| `SMTP_PORT` | Yes* | SMTP port (e.g., `587` for TLS, `465` for SSL) |
| `SMTP_USER` | Yes* | SMTP username / email address |
| `SMTP_PASS` | Yes* | SMTP password or app-specific password |
| `NOTIFICATION_EMAIL` | Yes* | Email address to receive appointment notifications |

\* SMTP variables are required for email notifications. If unset, the server starts normally but no emails are sent.

### SMTP Setup (Gmail example)

1. Enable 2-Factor Authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Set in `.env`:
   ```
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-16-char-app-password"
   NOTIFICATION_EMAIL="recipient@example.com"
   ```

Other providers:

| Provider | SMTP_HOST | SMTP_PORT |
|---|---|---|
| Gmail | `smtp.gmail.com` | 587 |
| Outlook / Microsoft 365 | `smtp.office365.com` | 587 |
| SendGrid | `smtp.sendgrid.net` | 587 |
| Amazon SES | `email-smtp.us-east-1.amazonaws.com` | 587 |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/appointments` | Create an appointment booking |
| `GET` | `/api/appointments` | List recent appointments |
| `POST` | `/api/contacts` | Submit a contact inquiry |
| `GET` | `/api/contacts` | List recent inquiries |
| `GET` | `/api/health` | Health check |
