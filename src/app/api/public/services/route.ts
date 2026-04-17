import { NextResponse } from 'next/server'
import { getServices, seedIfEmpty } from '@/lib/json-store'

// GET /api/public/services
export async function GET() {
  await seedIfEmpty()

  const services = await getServices()

  return NextResponse.json({ services, total: services.length })
}
