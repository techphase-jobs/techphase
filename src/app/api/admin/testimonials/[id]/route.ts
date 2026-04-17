import { NextRequest, NextResponse } from 'next/server'
import { getTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/testimonials/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  const testimonial = await getTestimonial(id)
  if (!testimonial) return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })

  return NextResponse.json({ testimonial })
}

// PUT /api/admin/testimonials/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const body = await request.json()
    const testimonial = await updateTestimonial(id, body)
    if (!testimonial) return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })

    return NextResponse.json({ testimonial, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update testimonial'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE /api/admin/testimonials/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const deleted = await deleteTestimonial(id)
    if (!deleted) return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete testimonial'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
