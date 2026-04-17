import { NextResponse } from 'next/server'
import { getAbout, seedIfEmpty } from '@/lib/json-store'

// GET /api/public/about
export async function GET() {
  await seedIfEmpty()

  const about = await getAbout()

  return NextResponse.json({ about })
}
