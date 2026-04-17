import { NextResponse } from 'next/server'
import { getSettings, seedIfEmpty } from '@/lib/json-store'

// GET /api/public/settings
export async function GET() {
  await seedIfEmpty()

  const settings = await getSettings()

  return NextResponse.json({ settings })
}
