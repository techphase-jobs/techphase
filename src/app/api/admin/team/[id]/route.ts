import { NextRequest, NextResponse } from 'next/server'
import { getTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/team/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  const member = await getTeamMember(id)
  if (!member) return NextResponse.json({ error: 'Team member not found' }, { status: 404 })

  return NextResponse.json({ member })
}

// PUT /api/admin/team/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const body = await request.json()
    const member = await updateTeamMember(id, body)
    if (!member) return NextResponse.json({ error: 'Team member not found' }, { status: 404 })

    return NextResponse.json({ member, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update team member'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE /api/admin/team/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const deleted = await deleteTeamMember(id)
    if (!deleted) return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete team member'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
