'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, User, ArrowLeft, Loader2 } from 'lucide-react'

/* ==========================================================================
   CONTENT PARSER
   ========================================================================== */

function renderContent(content: string) {
  const paragraphs = content.split('\n\n')

  return paragraphs.map((paragraph, idx) => {
    const trimmed = paragraph.trim()

    // Skip empty paragraphs
    if (!trimmed) return null

    // Check if the paragraph is a short heading (starts with **, no trailing text, < 80 chars)
    const headingMatch = trimmed.match(/^\*\*(.+?)\*\*$/)

    if (headingMatch && trimmed.length < 80) {
      return (
        <h3
          key={idx}
          className="text-xl font-bold text-[#0a2540] mt-8 mb-3 first:mt-0"
        >
          {headingMatch[1]}
        </h3>
      )
    }

    // Check if it starts with a bold heading followed by more text
    const boldStartMatch = trimmed.match(/^\*\*(.+?)\*\*\s*(.+)$/s)

    if (boldStartMatch && trimmed.length < 80) {
      return (
        <h3
          key={idx}
          className="text-xl font-bold text-[#0a2540] mt-8 mb-3 first:mt-0"
        >
          {boldStartMatch[1]}
        </h3>
      )
    }

    // Check for list items (lines starting with -)
    const lines = trimmed.split('\n')
    const isList = lines.every((line) => line.trim().startsWith('-'))

    if (isList) {
      return (
        <ul key={idx} className="list-disc list-inside space-y-2 mb-4 text-[#0a2540]/70 leading-relaxed">
          {lines.map((line, lineIdx) => {
            const content = line.trim().replace(/^-\s*/, '')
            // Handle bold within list items
            const parts = content.split(/(\*\*.*?\*\*)/g)
            return (
              <li key={lineIdx}>
                {parts.map((part, partIdx) => {
                  const boldMatch = part.match(/^\*\*(.+?)\*\*$/)
                  if (boldMatch) {
                    return <strong key={partIdx}>{boldMatch[1]}</strong>
                  }
                  return <span key={partIdx}>{part}</span>
                })}
              </li>
            )
          })}
        </ul>
      )
    }

    // Regular paragraph — parse **bold** patterns inline
    const parts = trimmed.split(/(\*\*.*?\*\*)/g)

    return (
      <p key={idx} className="text-[#0a2540]/70 leading-relaxed mb-4">
        {parts.map((part, partIdx) => {
          const boldMatch = part.match(/^\*\*(.+?)\*\*$/)
          if (boldMatch) {
            return <strong key={partIdx} className="text-[#0a2540]">{boldMatch[1]}</strong>
          }
          return <span key={partIdx}>{part}</span>
        })}
      </p>
    )
  })
}

/* ==========================================================================
   BLOG POST PAGE
   ========================================================================== */

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((res) => res.json())
      .then((data) => setPost(data.post || null))
      .catch(() => setPost(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="size-8 text-[#ff8c00] animate-spin" />
      </div>
    )
  }

  // Post not found
  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#ff8c00]/10 flex items-center justify-center">
            <span className="text-3xl font-bold text-[#ff8c00]">404</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0a2540] mb-2">Post Not Found</h1>
          <p className="text-[#0a2540]/50 mb-8 max-w-md">
            The blog post you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <Button
            asChild
            className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white font-semibold"
          >
            <Link href="/blog">
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Format the date nicely
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-white">
      {/* ========== Header ========== */}
      <section
        className="relative py-16 lg:py-20 overflow-hidden"
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

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[#ff8c00] hover:underline mb-8 transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[#ff8c00]/20 text-[#ff8c00]">
              {post.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-4 text-3xl sm:text-4xl font-bold text-white leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 text-sm text-white/50"
          >
            <span className="flex items-center gap-1.5">
              <User className="size-4 text-[#ff8c00]" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4 text-[#ff8c00]" />
              {formattedDate}
            </span>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ========== Content ========== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose-custom"
          >
            {/* Divider */}
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#ff8c00] to-[#ffb347] mb-8" />

            {/* Featured image */}
            {post.featuredImage && (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full rounded-xl mb-8 max-h-96 object-cover"
              />
            )}

            {/* Rendered content */}
            <div>{renderContent(post.content)}</div>

            {/* CTA box */}
            <div className="mt-12 rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm" style={{ backgroundColor: '#f8fafc' }}>
              <h3 className="text-lg font-bold text-[#0a2540] mb-2">Need IT Solutions for Your Business?</h3>
              <p className="text-sm text-[#0a2540]/60 mb-4 leading-relaxed">
                Techphase Solutions has been providing reliable IT support to businesses across Ghana since 2014.
                Let us handle your IT so you can focus on what you do best.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white font-semibold">
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-[#0a2540]/20 text-[#0a2540] hover:bg-[#0a2540]/5">
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  )
}
