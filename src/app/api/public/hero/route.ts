import { NextResponse } from 'next/server'
import { getHero, seedIfEmpty } from '@/lib/json-store'

// GET /api/public/hero
export async function GET() {
  seedIfEmpty()

  const hero = getHero()

  return NextResponse.json({ hero })
}
