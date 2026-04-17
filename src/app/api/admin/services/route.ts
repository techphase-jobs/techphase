import { NextRequest, NextResponse } from 'next/server'
import { getServices, createService, seedIfEmpty } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/services
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  await seedIfEmpty()

  const services = await getServices()

  return NextResponse.json({ services, total: services.length })
}

// POST /api/admin/services
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  try {
    const body = await request.json()
    const { title, description, icon, order } = body

    if (!title) {
      return NextResponse.json({ error: 'Service title is required' }, { status: 400 })
    }

    const service = await createService({ title, description, icon, order })
    return NextResponse.json({ service, success: true }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create service'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
