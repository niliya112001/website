import { Router, Request, Response } from 'express';
import pool from '../db.js';

const router = Router();

/* ─── Validation helper ──────────────────────────────────────────────────── */

function validateAppointment(body: Record<string, unknown>): string[] {
  const errors: string[] = [];

  if (typeof body.patientName !== 'string' || !body.patientName.trim()) {
    errors.push('Patient name is required');
  }
  if (typeof body.phone !== 'string' || !/^\d{10}$/.test(body.phone.trim())) {
    errors.push('A valid 10-digit phone number is required');
  }
  if (!body.age || Number(body.age) <= 0 || Number(body.age) >= 150) {
    errors.push('A valid age is required');
  }
  if (!body.department) {
    errors.push('Department is required');
  }
  if (!body.doctor) {
    errors.push('Doctor selection is required');
  }
  if (!body.date) {
    errors.push('Consultation date is required');
  }

  return errors;
}

/* ─── POST /api/appointments ─── Create a new appointment ──────────────── */

router.post('/', async (req: Request, res: Response) => {
  const errors = validateAppointment(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const {
    patientName,
    phone,
    email = '',
    age,
    gender = 'male',
    department,
    doctor,
    date,
    timeSlot = '',
    reason = '',
    message = '',
  } = req.body;

  const sql = `
    INSERT INTO appointments
      (patient_name, phone, email, age, gender, department, doctor, date, time_slot, reason, message, status)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'confirmed')
    RETURNING
      id::text,
      patient_name  AS "patientName",
      phone,
      email,
      age,
      gender,
      department,
      doctor,
      date::text,
      time_slot     AS "timeSlot",
      reason,
      message,
      status,
      created_at    AS "createdAt"
  `;

  const params = [
    patientName.trim(),
    phone.trim(),
    email.trim(),
    Number(age),
    gender,
    department,
    doctor,
    date,
    timeSlot,
    reason,
    message,
  ];

  try {
    const { rows } = await pool.query(sql, params);
    return res.status(201).json({ ok: true, appointment: rows[0] });
  } catch (err) {
    console.error('[API] POST /api/appointments error:', err);
    return res.status(500).json({ ok: false, errors: ['Failed to create appointment. Please try again.'] });
  }
});

/* ─── GET /api/appointments ─── List appointments (admin) ──────────────── */

router.get('/', async (_req: Request, res: Response) => {
  const sql = `
    SELECT
      id::text,
      patient_name  AS "patientName",
      phone,
      email,
      age,
      gender,
      department,
      doctor,
      date::text,
      time_slot     AS "timeSlot",
      reason,
      message,
      status,
      created_at    AS "createdAt"
    FROM appointments
    ORDER BY created_at DESC
    LIMIT 100
  `;

  try {
    const { rows } = await pool.query(sql);
    return res.json({ ok: true, appointments: rows });
  } catch (err) {
    console.error('[API] GET /api/appointments error:', err);
    return res.status(500).json({ ok: false, errors: ['Failed to fetch appointments.'] });
  }
});

export default router;
