import { NextResponse } from 'next/server'
import { getClients, seedIfEmpty } from '@/lib/json-store'

// GET /api/public/clients
export async function GET() {
  await seedIfEmpty()

  const clients = await getClients()

  return NextResponse.json({ clients, total: clients.length })
}
