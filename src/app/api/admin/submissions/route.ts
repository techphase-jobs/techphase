import { NextRequest, NextResponse } from 'next/server'
import { getSubmissions } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/submissions
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  const where: Record<string, unknown> = {}
  if (status) where.status = status

  const submissions = getSubmissions(where)

  return NextResponse.json({ submissions, total: submissions.length })
}
