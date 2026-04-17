import { NextRequest, NextResponse } from 'next/server'
import { getAbout, updateAbout, seedIfEmpty } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/about
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  seedIfEmpty()

  const about = getAbout()

  return NextResponse.json({ about })
}

// PUT /api/admin/about
export async function PUT(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  try {
    const body = await request.json()
    const about = updateAbout(body)

    return NextResponse.json({ about, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update about'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
