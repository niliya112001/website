-- Nilaya Hospital — Neon PostgreSQL Schema
-- Run this against your Neon database to initialize tables.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Appointments ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS appointments (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT        NOT NULL,
  phone        TEXT        NOT NULL,
  email        TEXT        NOT NULL DEFAULT '',
  age          INTEGER     NOT NULL CHECK (age > 0 AND age < 150),
  gender       TEXT        NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  department   TEXT        NOT NULL,
  doctor       TEXT        NOT NULL,
  date         DATE        NOT NULL,
  time_slot    TEXT        NOT NULL,
  reason       TEXT        NOT NULL DEFAULT '',
  message      TEXT        NOT NULL DEFAULT '',
  status       TEXT        NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_appointments_phone   ON appointments (phone);
CREATE INDEX IF NOT EXISTS idx_appointments_date     ON appointments (date);
CREATE INDEX IF NOT EXISTS idx_appointments_status   ON appointments (status);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor   ON appointments (doctor);

-- ─── Contact Inquiries ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  phone      TEXT        NOT NULL,
  email      TEXT        NOT NULL DEFAULT '',
  subject    TEXT        NOT NULL DEFAULT '',
  message    TEXT        NOT NULL DEFAULT '',
  status     TEXT        NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_phone      ON contact_inquiries (phone);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status     ON contact_inquiries (status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries (created_at DESC);
