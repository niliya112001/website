/**
 * Typed API client for the Nilaya Hospital backend.
 *
 * In development Vite proxies /api → localhost:3001.
 * In production the Express server serves both API and static files.
 */

const BASE = import.meta.env.VITE_API_URL ?? '';

/* ─── Shared helper ─────────────────────────────────────────────────────── */

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  const body = await res.json();

  if (!res.ok || body.ok === false) {
    const msg: string[] = body.errors ?? ['Unexpected server error'];
    throw new Error(msg.join('; '));
  }

  return body as T;
}

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface AppointmentPayload {
  patientName: string;
  phone: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  reason: string;
  message: string;
}

export interface AppointmentRecord extends AppointmentPayload {
  id: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactRecord extends ContactPayload {
  id: string;
  createdAt: string;
}

/* ─── API functions ─────────────────────────────────────────────────────── */

export async function createAppointment(data: AppointmentPayload): Promise<AppointmentRecord> {
  return request<{ ok: true; appointment: AppointmentRecord }>('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((r) => r.appointment);
}

export async function createContactInquiry(data: ContactPayload): Promise<ContactRecord> {
  return request<{ ok: true; inquiry: ContactRecord }>('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((r) => r.inquiry);
}
