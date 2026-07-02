/**
 * TechPhase Solutions — Contact Form Backend
 * Vercel Serverless Function  →  POST /api/contact
 *
 * Sends TWO emails via Zoho SMTP (info@techphasesolutions.com):
 *   1. The enquiry  → info@techphasesolutions.com  (reply-to: the customer)
 *   2. A branded acknowledgement → the customer
 *
 * Required Vercel Environment Variables (Project → Settings → Environment Variables):
 *   ZOHO_USER          info@techphasesolutions.com
 *   ZOHO_APP_PASSWORD  <Zoho app-specific password — NOT your normal login password>
 */

import nodemailer from 'nodemailer';

const BRAND = {
  name:   'TechPhase Solutions',
  navy:   '#0a2540',
  orange: '#ff8c00',
  site:   'https://techphasesolutions.com',
  phone:  '+233 244 201 295',
  addr:   '49 S.Dzagble Street, Akweteman-Achimota, Accra, Ghana',
};

/** Escape user text for safe embedding in HTML emails. */
const esc = (str = '') =>
  String(str).replace(/[&<>"']/g, (ch) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

/** Strip CR/LF to prevent email header injection. */
const oneLine = (str = '') => String(str).replace(/[\r\n]+/g, ' ').trim();

const isEmail = (str = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

/** Shared branded wrapper for both emails. */
function shell(innerHtml) {
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f1f5f9;font-family:Segoe UI,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;
                    box-shadow:0 6px 24px rgba(10,37,64,.10);">
        <tr>
          <td style="background:${BRAND.navy};padding:26px 32px;">
            <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:.3px;">TechPhase</span><span style="font-size:22px;font-weight:800;color:${BRAND.orange};">Solutions</span>
          </td>
        </tr>
        <tr><td style="height:4px;background:${BRAND.orange};font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:30px 32px;color:#1e293b;font-size:15px;line-height:1.65;">
          ${innerHtml}
        </td></tr>
        <tr>
          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;
                     color:#64748b;font-size:12px;line-height:1.7;">
            <strong style="color:${BRAND.navy};">${BRAND.name}</strong> · ${BRAND.addr}<br>
            ${BRAND.phone} · <a href="${BRAND.site}" style="color:${BRAND.orange};text-decoration:none;">techphasesolutions.com</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function enquiryEmail({ name, email, phone, subject, message }) {
  const row = (label, value) => `
    <tr>
      <td style="padding:9px 14px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:700;
                 color:${BRAND.navy};font-size:13px;white-space:nowrap;">${label}</td>
      <td style="padding:9px 14px;border:1px solid #e2e8f0;font-size:14px;">${value}</td>
    </tr>`;
  return shell(`
    <h2 style="margin:0 0 6px;color:${BRAND.navy};font-size:19px;">New Website Enquiry</h2>
    <p style="margin:0 0 20px;color:#64748b;font-size:13px;">Submitted via the contact form on techphasesolutions.com</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px;">
      ${row('Name', esc(name))}
      ${row('Email', `<a href="mailto:${esc(email)}" style="color:${BRAND.orange};">${esc(email)}</a>`)}
      ${row('Phone', esc(phone || '—'))}
      ${row('Subject', esc(subject))}
    </table>
    <p style="margin:0 0 8px;font-weight:700;color:${BRAND.navy};font-size:14px;">Message</p>
    <div style="background:#f8fafc;border-left:4px solid ${BRAND.orange};border-radius:0 8px 8px 0;
                padding:16px 18px;white-space:pre-wrap;font-size:14px;">${esc(message)}</div>
    <p style="margin:22px 0 0;color:#64748b;font-size:13px;">Reply directly to this email to respond to ${esc(name)}.</p>
  `);
}

function acknowledgementEmail({ name, subject }) {
  return shell(`
    <h2 style="margin:0 0 14px;color:${BRAND.navy};font-size:19px;">We've received your message</h2>
    <p style="margin:0 0 14px;">Dear ${esc(name)},</p>
    <p style="margin:0 0 14px;">
      Thank you for contacting <strong>${BRAND.name}</strong>. Your enquiry
      <em>&ldquo;${esc(subject)}&rdquo;</em> has been received and one of our team members
      will get back to you within <strong>24 hours</strong> (Mon&ndash;Fri, 8am&ndash;5pm GMT).
    </p>
    <p style="margin:0 0 22px;">If your matter is urgent, please call or WhatsApp us on
      <a href="tel:+233244201295" style="color:${BRAND.orange};text-decoration:none;font-weight:700;">${BRAND.phone}</a>.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0"><tr><td
      style="background:${BRAND.orange};border-radius:8px;">
      <a href="${BRAND.site}" style="display:inline-block;padding:12px 26px;color:#ffffff;
         font-weight:700;font-size:14px;text-decoration:none;">Visit Our Website</a>
    </td></tr></table>
    <p style="margin:24px 0 0;">Best regards,<br><strong>The ${BRAND.name} Team</strong></p>
  `);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { ZOHO_USER, ZOHO_APP_PASSWORD } = process.env;
  if (!ZOHO_USER || !ZOHO_APP_PASSWORD) {
    console.error('Missing ZOHO_USER / ZOHO_APP_PASSWORD environment variables');
    return res.status(500).json({ success: false, message: 'Server not configured' });
  }

  const body = req.body ?? {};

  // Honeypot: bots fill this hidden field — pretend success, send nothing.
  if (body.botcheck) {
    return res.status(200).json({ success: true });
  }

  const name    = oneLine(body.name).slice(0, 120);
  const email   = oneLine(body.email).slice(0, 200);
  const phone   = oneLine(body.phone).slice(0, 40);
  const subject = oneLine(body.subject).slice(0, 200);
  const message = String(body.message ?? '').trim().slice(0, 5000);

  if (name.length < 2)      return res.status(400).json({ success: false, message: 'Please enter your name' });
  if (!isEmail(email))      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
  if (subject.length < 3)   return res.status(400).json({ success: false, message: 'Please enter a subject' });
  if (message.length < 10)  return res.status(400).json({ success: false, message: 'Please enter a message (min. 10 characters)' });

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: { user: ZOHO_USER, pass: ZOHO_APP_PASSWORD },
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    // 1) Enquiry → info@ (must succeed)
    await transporter.sendMail({
      from:    { name: `${BRAND.name} Website`, address: ZOHO_USER },
      to:      ZOHO_USER,
      replyTo: { name, address: email },
      subject: `New Enquiry: ${subject}`,
      html:    enquiryEmail({ name, email, phone, subject, message }),
      text:    `New enquiry from ${name} <${email}> (${phone || 'no phone'})\nSubject: ${subject}\n\n${message}`,
    });

    // 2) Acknowledgement → customer (best-effort; never fail the request over it)
    try {
      await transporter.sendMail({
        from:    { name: BRAND.name, address: ZOHO_USER },
        to:      email,
        subject: `We received your message – ${BRAND.name}`,
        html:    acknowledgementEmail({ name, subject }),
        text:    `Dear ${name},\n\nThank you for contacting ${BRAND.name}. We have received your enquiry "${subject}" and will respond within 24 hours.\n\nUrgent? Call ${BRAND.phone}.\n\nBest regards,\nThe ${BRAND.name} Team`,
      });
    } catch (ackErr) {
      console.error('Acknowledgement email failed:', ackErr?.message);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Enquiry email failed:', err?.message);
    return res.status(502).json({ success: false, message: 'Could not send message. Please try again or call us.' });
  }
}
