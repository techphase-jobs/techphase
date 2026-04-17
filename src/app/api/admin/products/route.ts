import { NextRequest, NextResponse } from 'next/server'
import { getProducts, createProduct, seedIfEmpty } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/products
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  await seedIfEmpty()

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const where: Record<string, unknown> = {}
  if (category) where.category = category

  const products = await getProducts(where)

  return NextResponse.json({ products, total: products.length })
}

// POST /api/admin/products
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  try {
    const body = await request.json()
    const { name, category, description, price, currency, image, inStock } = body

    if (!name) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 })
    }

    const product = await createProduct({ name, category, description, price, currency, image, inStock })
    return NextResponse.json({ product, success: true }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create product'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
