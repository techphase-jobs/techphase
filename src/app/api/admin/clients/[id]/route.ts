import { NextRequest, NextResponse } from 'next/server'
import { getClient, updateClient, deleteClient } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/clients/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  const client = await getClient(id)
  if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 })

  return NextResponse.json({ client })
}

// PUT /api/admin/clients/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const body = await request.json()
    const client = await updateClient(id, body)
    if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 })

    return NextResponse.json({ client, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update client'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE /api/admin/clients/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const deleted = await deleteClient(id)
    if (!deleted) return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete client'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
