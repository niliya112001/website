import { Router, Request, Response } from 'express';
import pool from '../db.js';

const router = Router();

/* ─── POST /api/contacts ─── Submit a contact inquiry ──────────────────── */

router.post('/', async (req: Request, res: Response) => {
  const { name, phone, email = '', subject = '', message = '' } = req.body;

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ ok: false, errors: ['Name is required'] });
  }
  if (typeof phone !== 'string' || !phone.trim()) {
    return res.status(400).json({ ok: false, errors: ['Phone number is required'] });
  }

  const sql = `
    INSERT INTO contact_inquiries (name, phone, email, subject, message)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id::text, name, phone, email, subject, message, created_at AS "createdAt"
  `;

  try {
    const { rows } = await pool.query(sql, [
      name.trim(),
      phone.trim(),
      email.trim(),
      subject.trim(),
      message.trim(),
    ]);
    return res.status(201).json({ ok: true, inquiry: rows[0] });
  } catch (err) {
    console.error('[API] POST /api/contacts error:', err);
    return res.status(500).json({ ok: false, errors: ['Failed to submit inquiry. Please try again.'] });
  }
});

/* ─── GET /api/contacts ─── List inquiries (admin) ─────────────────────── */

router.get('/', async (_req: Request, res: Response) => {
  const sql = `
    SELECT
      id::text, name, phone, email, subject, message,
      status, created_at AS "createdAt"
    FROM contact_inquiries
    ORDER BY created_at DESC
    LIMIT 100
  `;

  try {
    const { rows } = await pool.query(sql);
    return res.json({ ok: true, inquiries: rows });
  } catch (err) {
    console.error('[API] GET /api/contacts error:', err);
    return res.status(500).json({ ok: false, errors: ['Failed to fetch inquiries.'] });
  }
});

export default router;
