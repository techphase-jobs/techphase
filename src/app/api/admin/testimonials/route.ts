import { NextRequest, NextResponse } from 'next/server'
import { getTestimonials, createTestimonial, seedIfEmpty } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/testimonials
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  seedIfEmpty()

  const testimonials = getTestimonials()

  return NextResponse.json({ testimonials, total: testimonials.length })
}

// POST /api/admin/testimonials
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  try {
    const body = await request.json()
    const { quote, client, type, order } = body

    if (!quote || !client) {
      return NextResponse.json({ error: 'Quote and client name are required' }, { status: 400 })
    }

    const testimonial = createTestimonial({ quote, client, type, order })
    return NextResponse.json({ testimonial, success: true }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create testimonial'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
