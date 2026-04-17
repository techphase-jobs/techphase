import { NextResponse } from 'next/server'
import { getAbout, seedIfEmpty } from '@/lib/json-store'

// GET /api/public/about
export async function GET() {
  seedIfEmpty()

  const about = getAbout()

  return NextResponse.json({ about })
}
