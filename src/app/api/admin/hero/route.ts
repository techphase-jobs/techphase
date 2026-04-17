import { NextRequest, NextResponse } from 'next/server'
import { getHero, updateHero, seedIfEmpty } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/hero
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  seedIfEmpty()

  const hero = getHero()

  return NextResponse.json({ hero })
}

// PUT /api/admin/hero
export async function PUT(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  try {
    const body = await request.json()
    const hero = updateHero(body)

    return NextResponse.json({ hero, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update hero'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
