import nodemailer from 'nodemailer'

/* ==========================================================================
   SMTP TRANSPORT (Zoho Mail)
   ========================================================================== */

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.SMTP_EMAIL || 'info@techphasesolutions.com',
    pass: process.env.SMTP_PASSWORD,
  },
})

/* ==========================================================================
   ADMIN NOTIFICATION EMAIL
   (Sent to info@techphasesolutions.com — internal, data-focused)
   ========================================================================== */

function adminEmailHtml(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  const submittedAt = new Date().toLocaleString('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
  })

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 640px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
      <!-- Red/urgent header to distinguish from acknowledgement -->
      <div style="background: #b91c1c; padding: 20px 28px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="vertical-align: middle;">
              <h1 style="margin: 0; font-size: 18px; font-weight: 700; color: #ffffff;">
                &#9888; New Enquiry Received
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: rgba(255,255,255,0.8);">
                Submitted via techphasesolutions.com contact form
              </p>
            </td>
            <td style="text-align: right; vertical-align: middle;">
              <span style="display: inline-block; background: rgba(255,255,255,0.2); color: #fff; font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 20px;">
                ACTION REQUIRED
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Submitted timestamp -->
      <div style="background: #fef2f2; padding: 10px 28px; border-bottom: 1px solid #fecaca;">
        <p style="margin: 0; font-size: 12px; color: #991b1b;">
          &#128337; ${submittedAt}
        </p>
      </div>

      <!-- Body — data table -->
      <div style="padding: 24px 28px; background: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; color: #64748b; font-weight: 600; width: 100px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; vertical-align: top;">From</td>
            <td style="padding: 12px 0; color: #0a2540; font-weight: 600;">${data.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; color: #64748b; font-weight: 600; font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase; vertical-align: top;">Email</td>
            <td style="padding: 12px 0;">
              <a href="mailto:${data.email}" style="color: #b91c1c; text-decoration: none; font-weight: 600;">${data.email}</a>
            </td>
          </tr>
          ${data.phone ? `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; color: #64748b; font-weight: 600; font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase; vertical-align: top;">Phone</td>
            <td style="padding: 12px 0; color: #0a2540; font-weight: 600;">${data.phone}</td>
          </tr>` : ''}
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; color: #64748b; font-weight: 600; font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase; vertical-align: top;">Subject</td>
            <td style="padding: 12px 0; color: #0a2540; font-weight: 700; font-size: 15px;">${data.subject}</td>
          </tr>
          <tr>
            <td style="padding: 14px 0 6px 0; color: #64748b; font-weight: 600; font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase; vertical-align: top;">Message</td>
            <td style="padding: 14px 0 0 0;"></td>
          </tr>
        </table>
        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; border-left: 4px solid #b91c1c; margin-top: 4px;">
          <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>

      <!-- Quick reply link -->
      <div style="padding: 16px 28px; background: #ffffff; border-top: 1px solid #f1f5f9;">
        <a href="mailto:${data.email}?subject=Re: ${data.subject}" style="display: inline-block; background: #0a2540; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-size: 13px; font-weight: 600;">
          &#9993; Reply to ${data.name}
        </a>
      </div>

      <!-- Footer -->
      <div style="padding: 12px 28px; background: #f1f5f9; text-align: center;">
        <p style="margin: 0; font-size: 11px; color: #94a3b8;">
          Internal notification from techphasesolutions.com &middot; Do not reply to this email &middot; Use the reply button above
        </p>
      </div>
    </div>
  `
}

/* ==========================================================================
   ACKNOWLEDGEMENT EMAIL
   (Sent to the submitter — customer-facing, warm & branded)
   ========================================================================== */

function acknowledgementEmailHtml(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 560px; margin: 0 auto; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
      <!-- Branded header with gradient -->
      <div style="background: linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%); padding: 40px 36px 32px 36px; text-align: center;">
        <!-- Logo text -->
        <p style="margin: 0 0 20px 0; font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.6); letter-spacing: 3px; text-transform: uppercase;">
          Techphase Solutions
        </p>
        <!-- Orange checkmark circle -->
        <div style="width: 64px; height: 64px; border-radius: 50%; background: #ff8c00; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
          <span style="font-size: 28px; color: #ffffff;">&#10003;</span>
        </div>
        <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff;">
          Thank You, ${data.name}!
        </h1>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.7);">
          Your message has been received successfully.
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 32px 36px; background: #ffffff;">
        <!-- Personalised message -->
        <p style="margin: 0 0 20px 0; font-size: 15px; color: #334155; line-height: 1.7;">
          Dear <strong>${data.name}</strong>,
        </p>
        <p style="margin: 0 0 20px 0; font-size: 15px; color: #334155; line-height: 1.7;">
          Thank you for contacting <strong>Techphase Solutions</strong>. We have received your enquiry regarding
          <strong style="color: #ff8c00;">&ldquo;${data.subject}&rdquo;</strong> and our team is already reviewing it.
        </p>
        <p style="margin: 0 0 24px 0; font-size: 15px; color: #334155; line-height: 1.7;">
          We typically respond within <strong>1 business day</strong>. If your matter is urgent, please call us at
          <strong>+233 244 201 295</strong>.
        </p>

        <!-- Divider -->
        <div style="height: 1px; background: #e2e8f0; margin: 24px 0;"></div>

        <!-- What happens next -->
        <p style="margin: 0 0 14px 0; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
          What happens next?
        </p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; width: 28px; vertical-align: top;">
              <span style="display: inline-block; width: 24px; height: 24px; border-radius: 50%; background: #ff8c00; color: #fff; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700;">1</span>
            </td>
            <td style="padding: 8px 0; color: #334155;">Our team reviews your message</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; vertical-align: top;">
              <span style="display: inline-block; width: 24px; height: 24px; border-radius: 50%; background: #ff8c00; color: #fff; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700;">2</span>
            </td>
            <td style="padding: 8px 0; color: #334155;">We prepare a tailored response</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; vertical-align: top;">
              <span style="display: inline-block; width: 24px; height: 24px; border-radius: 50%; background: #ff8c00; color: #fff; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700;">3</span>
            </td>
            <td style="padding: 8px 0; color: #334155;">You receive a reply at <strong style="color: #0a2540;">${data.email}</strong></td>
          </tr>
        </table>

        <!-- Divider -->
        <div style="height: 1px; background: #e2e8f0; margin: 24px 0;"></div>

        <!-- Office info card -->
        <div style="background: #f8fafc; border-radius: 10px; padding: 18px 20px;">
          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0a2540;">Get in touch directly</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #475569;">
            <tr>
              <td style="padding: 4px 0; width: 20px;">&#128205;</td>
              <td style="padding: 4px 0;">49 S.Dzagble Street, Akweteman-Achimota, Accra</td>
            </tr>
            <tr>
              <td style="padding: 4px 0;">&#128222;</td>
              <td style="padding: 4px 0;">+233 244 201 295</td>
            </tr>
            <tr>
              <td style="padding: 4px 0;">&#128231;</td>
              <td style="padding: 4px 0;">info@techphasesolutions.com</td>
            </tr>
            <tr>
              <td style="padding: 4px 0;">&#128336;</td>
              <td style="padding: 4px 0;">Mon&ndash;Fri: 8 AM &ndash; 5 PM &middot; Sat: 9 AM &ndash; 1 PM</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding: 24px 36px; background: linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%); text-align: center;">
        <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #ffffff;">
          Techphase Solutions
        </p>
        <p style="margin: 0 0 10px 0; font-size: 12px; color: rgba(255,255,255,0.6);">
          Ghana&rsquo;s Trusted IT Partner Since 2014
        </p>
        <a href="https://techphasesolutions.com" style="display: inline-block; background: #ff8c00; color: #ffffff; text-decoration: none; padding: 8px 20px; border-radius: 6px; font-size: 12px; font-weight: 600;">
          Visit Our Website &#8594;
        </a>
      </div>
    </div>
  `
}

/* ==========================================================================
   SEND FUNCTIONS
   ========================================================================== */

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export async function sendAdminNotification(data: ContactFormData) {
  const mailOptions = {
    from: `"Techphase Website" <${process.env.SMTP_EMAIL || 'info@techphasesolutions.com'}>`,
    to: 'info@techphasesolutions.com',
    replyTo: data.email,
    subject: `[WEBSITE ENQUIRY] ${data.subject}`,
    html: adminEmailHtml(data),
  }

  return transporter.sendMail(mailOptions)
}

export async function sendAcknowledgement(data: ContactFormData) {
  const mailOptions = {
    from: `"Techphase Solutions" <${process.env.SMTP_EMAIL || 'info@techphasesolutions.com'}>`,
    to: data.email,
    replyTo: 'info@techphasesolutions.com',
    subject: 'We received your message — Techphase Solutions',
    html: acknowledgementEmailHtml(data),
  }

  return transporter.sendMail(mailOptions)
}

export async function sendContactEmails(data: ContactFormData) {
  const results = await Promise.allSettled([
    sendAdminNotification(data),
    sendAcknowledgement(data),
  ])

  const errors: string[] = []
  if (results[0].status === 'rejected') {
    errors.push(`Admin email failed: ${results[0].reason?.message || 'Unknown error'}`)
  }
  if (results[1].status === 'rejected') {
    errors.push(`Acknowledgement email failed: ${results[1].reason?.message || 'Unknown error'}`)
  }

  if (errors.length > 0) {
    throw new Error(errors.join(' | '))
  }

  return { success: true }
}
