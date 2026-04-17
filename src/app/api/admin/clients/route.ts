import { NextRequest, NextResponse } from 'next/server'
import { getClients, createClient, seedIfEmpty } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/clients
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  seedIfEmpty()

  const clients = getClients()

  return NextResponse.json({ clients, total: clients.length })
}

// POST /api/admin/clients
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  try {
    const body = await request.json()
    const { name, logo, website, order } = body

    if (!name) {
      return NextResponse.json({ error: 'Client name is required' }, { status: 400 })
    }

    const client = createClient({ name, logo, website, order })
    return NextResponse.json({ client, success: true }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create client'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
