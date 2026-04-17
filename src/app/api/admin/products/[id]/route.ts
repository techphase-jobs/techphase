import { NextRequest, NextResponse } from 'next/server'
import { updateProduct, deleteProduct } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// PUT /api/admin/products/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const body = await request.json()
    const product = await updateProduct(id, body)
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    return NextResponse.json({ product, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update product'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE /api/admin/products/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const deleted = await deleteProduct(id)
    if (!deleted) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete product'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
