import { NextResponse } from 'next/server'
import { getServices, seedIfEmpty } from '@/lib/json-store'

// GET /api/public/services
export async function GET() {
  seedIfEmpty()

  const services = getServices()

  return NextResponse.json({ services, total: services.length })
}
