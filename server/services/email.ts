import { BrevoClient, BrevoError } from '@getbrevo/brevo';

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

/* ─── Brevo Client Initialization ───────────────────────────────────────── */

let brevoClient: BrevoClient | null = null;

function getBrevoClient(): BrevoClient {
  if (!brevoClient) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not set');
    }
    console.log('[Email] Initializing Brevo Transactional Email Client');
    brevoClient = new BrevoClient({
      apiKey,
      timeoutInSeconds: 10, // Timeout of 10s for API resilience
      maxRetries: 2,        // Retry up to 2 times for transient errors
    });
  }
  return brevoClient;
}

/* ─── Verify on boot (Matches server/index.ts call) ──────────────────────── */

export async function verifySMTP(): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('[Email] BREVO_API_KEY is not set — Brevo client validation skipped');
    return false;
  }

  const startTime = Date.now();
  try {
    console.log('[Email] Verifying Brevo API key by fetching account info...');
    const client = getBrevoClient();
    const accountInfo = await client.account.getAccount();
    const elapsed = Date.now() - startTime;
    console.log(`[Email] Brevo API verification succeeded in ${elapsed}ms. Org Name: ${accountInfo.companyName}`);
    return true;
  } catch (err) {
    const elapsed = Date.now() - startTime;
    if (err instanceof BrevoError) {
      console.error(`[Email] Brevo API verification failed after ${elapsed}ms:`, {
        statusCode: err.statusCode,
        message: err.message,
        body: err.body,
        stack: err.stack,
      });
    } else {
      const error = err as any;
      console.error(`[Email] Unexpected Brevo verification error after ${elapsed}ms:`, {
        message: error.message,
        stack: error.stack,
      });
    }
    return false;
  }
}

/* ─── Build HTML content ─────────────────────────────────────────────────── */

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

/* ─── Send Appointment Notification ─────────────────────────────────────── */

export async function sendAppointmentNotification(
  data: AppointmentEmailData,
): Promise<boolean> {
  const toEmail = process.env.BREVO_RECEIVER_EMAIL;
  if (!toEmail) {
    console.warn('[Email] BREVO_RECEIVER_EMAIL not set — skipping notification');
    return false;
  }

  const htmlContent = buildAppointmentHtml(data);
  const startTime = Date.now();

  try {
    const client = getBrevoClient();
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'no-reply@nilayahospital.com';
    const senderName = process.env.BREVO_SENDER_NAME || 'Nilaya Hospital';

    console.log(`[Email] Initiating Brevo API send for patient: ${data.patientName}`);

    const result = await client.transactionalEmails.sendTransacEmail({
      subject: 'New Appointment Booking - Nilaya Hospital',
      sender: { name: senderName, email: senderEmail },
      to: [{ email: toEmail }],
      htmlContent,
      replyTo: data.email ? { email: data.email, name: data.patientName } : undefined,
    });

    const elapsed = Date.now() - startTime;
    console.log(`[Email] Appointment notification sent successfully in ${elapsed}ms. Recipient: ${toEmail}, MsgId: ${JSON.stringify(result)}`);
    return true;
  } catch (err) {
    const elapsed = Date.now() - startTime;
    if (err instanceof BrevoError) {
      console.error(`[Email] Failed to send appointment notification via Brevo after ${elapsed}ms:`, {
        statusCode: err.statusCode,
        message: err.message,
        body: err.body,
        recipient: toEmail,
        patientName: data.patientName,
        stack: err.stack,
      });
    } else {
      const error = err as any;
      console.error(`[Email] Unexpected error sending Brevo notification after ${elapsed}ms:`, {
        message: error.message,
        recipient: toEmail,
        patientName: data.patientName,
        stack: error.stack,
      });
    }
    return false;
  }
}
