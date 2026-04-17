import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts, createBlogPost, seedIfEmpty } from '@/lib/json-store'
import { requireAuth } from '@/app/api/admin/auth/route'

// GET /api/admin/blog
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  await seedIfEmpty()

  const { searchParams } = new URL(request.url)
  const published = searchParams.get('published')

  const where: Record<string, unknown> = {}
  if (published === 'true') where.published = true
  if (published === 'false') where.published = false

  const posts = await getBlogPosts(where)

  return NextResponse.json({ posts, total: posts.length })
}

// POST /api/admin/blog
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request)
  if (auth.error) return auth.response

  try {
    const body = await request.json()
    const { title, category, content, author, featuredImage, published } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const post = await createBlogPost({ title, category, content, author, featuredImage, published })
    return NextResponse.json({ post, success: true }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create blog post'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
