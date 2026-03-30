import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { requireAuth } from '@/app/api/admin/auth/route'

// POST /api/admin/reply — send reply email to submitter
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  try {
    const body = await request.json()
    const { toEmail, subject, replyMessage, submissionId } = body

    if (!toEmail || !replyMessage) {
      return NextResponse.json({ error: 'Recipient email and message are required' }, { status: 400 })
    }

    // Send reply email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL || 'info@techphasesolutions.com',
        pass: process.env.SMTP_PASSWORD,
      },
    })

    const replySubject = subject || 'Re: Your message to Techphase Solutions'

    const htmlEmail = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
        <div style="background: linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%); padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">
            Reply from Techphase Solutions
          </h1>
        </div>
        <div style="padding: 28px 32px; background: #ffffff;">
          <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155; line-height: 1.7;">
            ${replyMessage.replace(/\n/g, '<br>')}
          </p>
          <div style="border-top: 1px solid #e2e8f0; margin-top: 20px; padding-top: 16px;">
            <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0a2540;">Techphase Solutions</p>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #94a3b8;">Ghana's Trusted IT Partner Since 2014</p>
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">📞 +233 244 201 295 | ✉️ info@techphasesolutions.com</p>
          </div>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: `"Techphase Enquiries" <${process.env.SMTP_EMAIL || 'info@techphasesolutions.com'}>`,
      to: toEmail,
      replyTo: 'info@techphasesolutions.com',
      subject: replySubject,
      html: htmlEmail,
    })

    return NextResponse.json({ success: true, message: 'Reply sent successfully' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send reply'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
