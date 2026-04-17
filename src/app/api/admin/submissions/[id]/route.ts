import { NextRequest, NextResponse } from 'next/server'
import { updateSubmission, deleteSubmission } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// PUT /api/admin/submissions/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const body = await request.json()
    const { status } = body

    if (!status || !['new', 'read', 'replied'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const submission = updateSubmission(id, { status })
    if (!submission) return NextResponse.json({ error: 'Submission not found' }, { status: 404 })

    return NextResponse.json({ submission, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE /api/admin/submissions/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const deleted = deleteSubmission(id)
    if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
