import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import appointmentsRouter from './routes/appointments.js';
import contactsRouter from './routes/contacts.js';
import { verifySMTP } from './services/email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const app  = express();
const PORT = Number(process.env.PORT) || 3001;

// Trust proxy for production environments (like Render load balancers)
app.set('trust proxy', 1);

/* ─── Middleware ─────────────────────────────────────────────────────────── */

// Configure CORS for local development and Hostinger production domains
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin) || 
                      allowedOrigins.includes('*') ||
                      !process.env.FRONTEND_URL || 
                      process.env.FRONTEND_URL === '*';

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
}));

app.use(express.json());

/* ─── API Routes ────────────────────────────────────────────────────────── */

app.use('/api/appointments', appointmentsRouter);
app.use('/api/contacts',     contactsRouter);

/* ─── Health check ──────────────────────────────────────────────────────── */

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

/* ─── Serve static frontend in production (optional) ─────────────────────── */

const distPath = join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    // Let API routes fall through to the routers / health check
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(join(distPath, 'index.html'));
  });
} else {
  app.get('/', (_req, res) => {
    res.send('Nilaya Hospital API Server is running.');
  });
}

/* ─── Start ─────────────────────────────────────────────────────────────── */

app.listen(PORT, async () => {
  console.log(`[Server] API running on http://localhost:${PORT}`);
  await verifySMTP();
});
