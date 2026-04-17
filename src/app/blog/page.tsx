'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, BookOpen, Loader2 } from 'lucide-react'

/* ==========================================================================
   SECTION BADGE COMPONENT
   ========================================================================== */

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="border-[#ff8c00]/30 bg-[#ff8c00]/10 text-[#ff8c00] px-4 py-1.5 text-sm font-medium rounded-full"
    >
      {children}
    </Badge>
  )
}

/* ==========================================================================
   BLOG PAGE
   ========================================================================== */

interface BlogPostData {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  featuredImage: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* ========== Page Header ========== */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%)',
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#ff8c00]/10 blur-3xl animate-float-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-float-orb-delay" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionBadge>Our Blog</SectionBadge>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Latest News &amp; Insights
            </h1>
            <p className="mt-4 text-white/60 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest trends in IT solutions, security, and technology.
            </p>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ========== Blog Posts Grid ========== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-8 text-[#ff8c00] animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.1, 0.4) }}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  {/* Featured image */}
                  {post.featuredImage && (
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Category badge */}
                    <div className="mb-4">
                      <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[#ff8c00]/10 text-[#ff8c00]">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-semibold text-[#0a2540] text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#ff8c00] transition-colors duration-200">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-[#0a2540]/60 leading-relaxed mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-[#0a2540]/50 pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="hidden sm:inline truncate">{post.author}</span>
                    </div>

                    {/* Read More link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm text-[#ff8c00] font-medium mt-4 hover:gap-2.5 transition-all duration-200 group-hover:text-[#ff7a00]"
                    >
                      Read More
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Empty state (if no posts) */}
          {!loading && posts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="size-12 text-[#0a2540]/20 mx-auto mb-4" />
              <p className="text-[#0a2540]/50 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
