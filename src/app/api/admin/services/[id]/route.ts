import { NextRequest, NextResponse } from 'next/server'
import { getService, updateService, deleteService } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/services/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  const service = getService(id)
  if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 })

  return NextResponse.json({ service })
}

// PUT /api/admin/services/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const body = await request.json()
    const service = updateService(id, body)
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 })

    return NextResponse.json({ service, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update service'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE /api/admin/services/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const deleted = deleteService(id)
    if (!deleted) return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete service'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
