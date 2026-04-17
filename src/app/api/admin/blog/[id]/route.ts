import { NextRequest, NextResponse } from 'next/server'
import { updateBlogPost, deleteBlogPost } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// PUT /api/admin/blog/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const body = await request.json()
    const { title, category, content, author, featuredImage, published } = body

    const updateData: Record<string, unknown> = {}
    if (title !== undefined) updateData.title = title
    if (category !== undefined) updateData.category = category
    if (content !== undefined) updateData.content = content
    if (author !== undefined) updateData.author = author
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage
    if (published !== undefined) updateData.published = published

    const post = updateBlogPost(id, updateData)
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    return NextResponse.json({ post, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update blog post'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE /api/admin/blog/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  const { id } = await params

  try {
    const deleted = deleteBlogPost(id)
    if (!deleted) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete blog post'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
