import { NextResponse } from 'next/server'
import { getSettings, seedIfEmpty } from '@/lib/json-store'

// GET /api/public/settings
export async function GET() {
  seedIfEmpty()

  const settings = getSettings()

  return NextResponse.json({ settings })
}
