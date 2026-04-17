import { NextResponse } from 'next/server'
import { getTestimonials, seedIfEmpty } from '@/lib/json-store'

// GET /api/public/testimonials
export async function GET() {
  await seedIfEmpty()

  const testimonials = await getTestimonials()

  return NextResponse.json({ testimonials, total: testimonials.length })
}
