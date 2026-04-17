import { NextRequest, NextResponse } from 'next/server'
import { getSettings, updateSettings, seedIfEmpty } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/settings
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  seedIfEmpty()

  const settings = getSettings()

  return NextResponse.json({ settings })
}

// PUT /api/admin/settings
export async function PUT(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  try {
    const body = await request.json()
    const settings = updateSettings(body)

    return NextResponse.json({ settings, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update settings'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
