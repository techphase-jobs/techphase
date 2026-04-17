import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmails } from '@/lib/email'
import { createSubmission } from '@/lib/json-store'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, subject, and message are required.' },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 },
      )
    }

    // Capture visitor metadata
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') || 'Unknown'
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const browser = parseBrowser(userAgent)

    const contactData = { name, email, phone: phone || '', subject, message }

    // Save submission to JSON store
    await createSubmission({ ...contactData, ip, userAgent, browser })

    // Send emails — await so we can surface errors to the user
    try {
      await sendContactEmails(contactData)
    } catch (emailError: unknown) {
      console.error('Email sending failed:', emailError)
      const errMsg = emailError instanceof Error ? emailError.message : 'Email delivery failed'
      // Return success for the form but include a warning about the email
      return NextResponse.json({
        success: true,
        message: 'Your message has been saved, but there was an issue sending email notifications. Our team will still review your message.',
        emailWarning: errMsg,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! We will get back to you shortly.',
    })
  } catch (error) {
    console.error('Contact form error:', error)

    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    )
  }
}

function parseBrowser(ua: string): string {
  if (ua.includes('Edg/')) return 'Microsoft Edge'
  if (ua.includes('Chrome/') && !ua.includes('Edg/')) return 'Chrome'
  if (ua.includes('Firefox/')) return 'Firefox'
  if (ua.includes('Safari/') && !ua.includes('Chrome')) return 'Safari'
  if (ua.includes('Opera') || ua.includes('OPR/')) return 'Opera'
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'Safari (iOS)'
  if (ua.includes('Android')) return 'Android Browser'
  return 'Unknown Browser'
}
