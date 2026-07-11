import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import appointmentsRouter from './routes/appointments.js';
import contactsRouter from './routes/contacts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const app  = express();
const PORT = Number(process.env.PORT) || 3001;

/* ─── Middleware ─────────────────────────────────────────────────────────── */

app.use(cors({ origin: true }));
app.use(express.json());

/* ─── API Routes ────────────────────────────────────────────────────────── */

app.use('/api/appointments', appointmentsRouter);
app.use('/api/contacts',     contactsRouter);

/* ─── Health check ──────────────────────────────────────────────────────── */

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

/* ─── Serve static frontend in production ───────────────────────────────── */

const distPath = join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (_req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

/* ─── Start ─────────────────────────────────────────────────────────────── */

app.listen(PORT, () => {
  console.log(`[Server] API running on http://localhost:${PORT}`);
});
