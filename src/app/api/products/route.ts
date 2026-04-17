import { NextResponse } from 'next/server'
import { getProducts, seedIfEmpty } from '@/lib/json-store'

// GET /api/products — list products (public, no auth required)
export async function GET() {
  await seedIfEmpty()
  const products = await getProducts()
  return NextResponse.json({ products })
}
