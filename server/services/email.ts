import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface AppointmentEmailData {
  patientName: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  reason: string;
  message: string;
  createdAt: string;
}

/* ─── Transporter ───────────────────────────────────────────────────────── */

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

/* ─── Verify ────────────────────────────────────────────────────────────── */

export async function verifySMTP(): Promise<boolean> {
  try {
    await getTransporter().verify();
    console.log('[Email] SMTP connection verified successfully');
    return true;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn('[Email] SMTP verification failed — emails will not be sent:', message);
    transporter = null;
    return false;
  }
}

/* ─── Send appointment notification ─────────────────────────────────────── */

function buildAppointmentHtml(data: AppointmentEmailData): string {
  const field = (label: string, value: string): string => `
    <tr>
      <td style="padding:8px 12px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;width:160px;">${label}</td>
      <td style="padding:8px 12px;color:#111827;border-bottom:1px solid #e5e7eb;">${value}</td>
    </tr>`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:24px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <div style="background:#2563eb;padding:20px 24px;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;">Nilaya Hospital</h1>
          <p style="margin:4px 0 0;color:#bfdbfe;font-size:14px;">New Appointment Booking</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${field('Patient Name', data.patientName)}
          ${field('Phone', data.phone)}
          ${field('Email', data.email || '—')}
          ${field('Age', String(data.age))}
          ${field('Gender', data.gender)}
          ${field('Department', data.department)}
          ${field('Doctor', data.doctor)}
          ${field('Date', data.date)}
          ${field('Time Slot', data.timeSlot || '—')}
          ${field('Reason', data.reason || '—')}
          ${field('Message', data.message || '—')}
          ${field('Booking Time', data.createdAt)}
        </table>
        <div style="padding:16px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;">
          <p style="margin:0;font-size:12px;color:#6b7280;">This is an automated notification from the Nilaya Hospital booking system.</p>
        </div>
      </div>
    </body>
    </html>`;
}

export async function sendAppointmentNotification(
  data: AppointmentEmailData,
): Promise<boolean> {
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to) {
    console.warn('[Email] NOTIFICATION_EMAIL not set — skipping notification');
    return false;
  }

  const html = buildAppointmentHtml(data);

  try {
    await getTransporter().sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'New Appointment Booking - Nilaya Hospital',
      html,
      replyTo: data.email || undefined,
    });
    console.log(`[Email] Appointment notification sent to ${to} for patient ${data.patientName}`);
    return true;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Email] Failed to send appointment notification:', message);
    return false;
  }
}
