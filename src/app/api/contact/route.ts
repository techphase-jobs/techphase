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

    // Save submission to JSON store
    createSubmission({ name, email, phone: phone || '', subject, message, ip, userAgent, browser })

    // Send emails (non-blocking — don't let email failure block the submission)
    sendContactEmails({ name, email, phone: phone || '', subject, message }).catch(() => {})

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
