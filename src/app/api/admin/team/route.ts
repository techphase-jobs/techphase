import { NextRequest, NextResponse } from 'next/server'
import { getTeamMembers, createTeamMember, seedIfEmpty } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/team
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  seedIfEmpty()

  const members = getTeamMembers()

  return NextResponse.json({ members, total: members.length })
}

// POST /api/admin/team
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  try {
    const body = await request.json()
    const { name, role, image, bio, phone, email, socialLinks, order } = body

    if (!name || !role) {
      return NextResponse.json({ error: 'Name and role are required' }, { status: 400 })
    }

    const member = createTeamMember({ name, role, image, bio, phone, email, socialLinks, order })
    return NextResponse.json({ member, success: true }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create team member'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
