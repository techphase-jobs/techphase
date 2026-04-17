import { NextResponse } from 'next/server'
import { getTeamMembers, seedIfEmpty } from '@/lib/json-store'

// GET /api/public/team
export async function GET() {
  await seedIfEmpty()

  const members = await getTeamMembers()

  return NextResponse.json({ members, total: members.length })
}
