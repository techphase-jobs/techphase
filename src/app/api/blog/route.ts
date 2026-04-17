import { NextResponse } from 'next/server'
import { getBlogPosts, getBlogPost, seedIfEmpty } from '@/lib/json-store'

// GET /api/blog — list published posts (public, no auth required)
export async function GET() {
  await seedIfEmpty()
  const posts = await getBlogPosts({ published: true })
  return NextResponse.json({
    posts: posts.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.content ? p.content.substring(0, 160).replace(/\*\*/g, '').replace(/\n/g, ' ').trim() + '...' : '',
      date: p.createdAt,
      author: p.author,
      category: p.category,
      featuredImage: p.featuredImage,
    })),
  })
}
