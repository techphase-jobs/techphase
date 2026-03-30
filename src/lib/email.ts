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
   EMAIL TEMPLATES
   ========================================================================== */

function adminEmailHtml(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%); padding: 24px 32px;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">
          New Contact Form Submission
        </h1>
        <p style="margin: 8px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.7);">
          Someone just reached out via the Techphase Solutions website.
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 28px 32px; background: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 500; width: 120px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; color: #0a2540; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 500; vertical-align: top;">Email</td>
            <td style="padding: 10px 0;">
              <a href="mailto:${data.email}" style="color: #ff8c00; text-decoration: none; font-weight: 600;">${data.email}</a>
            </td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 500; vertical-align: top;">Phone</td>
            <td style="padding: 10px 0; color: #0a2540; font-weight: 600;">${data.phone}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 500; vertical-align: top;">Subject</td>
            <td style="padding: 10px 0; color: #0a2540; font-weight: 600;">${data.subject}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 500; vertical-align: top; border-top: 1px solid #e2e8f0;">Message</td>
            <td style="padding: 14px 0; color: #334155; border-top: 1px solid #e2e8f0; line-height: 1.6;">${data.message}</td>
          </tr>
        </table>
      </div>

      <!-- Footer -->
      <div style="padding: 16px 32px; background: #f1f5f9; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">
          This email was sent from the contact form on techphasesolutions.com
        </p>
      </div>
    </div>
  `
}

function acknowledgementEmailHtml(data: {
  name: string
  subject: string
}) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%); padding: 32px;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff;">
          Thank You, ${data.name}!
        </h1>
        <p style="margin: 8px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.7);">
          We've received your message successfully.
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 32px; background: #ffffff;">
        <p style="margin: 0 0 20px 0; font-size: 15px; color: #334155; line-height: 1.7;">
          Thank you for reaching out to <strong>Techphase Solutions</strong>. We have received your message regarding
          <strong style="color: #ff8c00;">&ldquo;${data.subject}&rdquo;</strong> and our team will review it shortly.
        </p>

        <p style="margin: 0 0 20px 0; font-size: 15px; color: #334155; line-height: 1.7;">
          We typically respond within <strong>1 business day</strong>. If your inquiry is urgent, feel free to call us directly at
          <strong>+233 244 201 295</strong>.
        </p>

        <div style="background: #f1f5f9; border-radius: 8px; padding: 16px 20px; border-left: 4px solid #ff8c00;">
          <p style="margin: 0 0 6px 0; font-size: 13px; color: #64748b; font-weight: 500;">OUR OFFICE</p>
          <p style="margin: 0; font-size: 14px; color: #0a2540; font-weight: 600;">49 S.Dzagble Street, Akweteman-Achimota, Accra</p>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #ff8c00; font-weight: 600;">Digital Address: GA-302-8209</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding: 20px 32px; background: #f1f5f9; text-align: center;">
        <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0a2540;">
          Techphase Solutions
        </p>
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">
          Ghana's Trusted IT Partner Since 2014
        </p>
        <p style="margin: 12px 0 0 0; font-size: 11px; color: #cbd5e1;">
          Visit us at <a href="https://techphasesolutions.com" style="color: #ff8c00; text-decoration: none;">techphasesolutions.com</a>
        </p>
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
    from: `"Techphase Enquiries" <${process.env.SMTP_EMAIL || 'info@techphasesolutions.com'}>`,
    to: 'info@techphasesolutions.com',
    replyTo: data.email,
    subject: `[Website] ${data.subject}`,
    html: adminEmailHtml(data),
  }

  return transporter.sendMail(mailOptions)
}

export async function sendAcknowledgement(data: ContactFormData) {
  const mailOptions = {
    from: `"Techphase Enquiries" <${process.env.SMTP_EMAIL || 'info@techphasesolutions.com'}>`,
    to: data.email,
    replyTo: 'info@techphasesolutions.com',
    subject: 'Thank you for contacting Techphase Solutions',
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


