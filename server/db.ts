import { Pool, neonConfig } from '@neondatabase/serverless';

neonConfig.fetchConnectionCache = true;

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

pool.on('error', (err) => {
  console.error('[Neon] Unexpected pool error:', err.message);
});

export default pool;
