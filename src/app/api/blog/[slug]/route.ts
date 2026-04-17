import { NextRequest, NextResponse } from 'next/server'
import { getBlogPost, getBlogPosts, seedIfEmpty } from '@/lib/json-store'

// GET /api/blog/[slug] — single published post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  seedIfEmpty()
  const { slug } = await params

  // Find by slug in published posts
  const allPublished = getBlogPosts({ published: true })
  const post = allPublished.find((p: any) => p.slug === slug)

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json({ post })
}
