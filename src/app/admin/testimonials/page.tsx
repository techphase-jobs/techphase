'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus, Pencil, Trash2, Loader2, Quote } from 'lucide-react'
import { toast } from 'sonner'

interface Testimonial {
  id: string
  quote: string
  clientName: string
  type: string
  order: number
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/testimonials')
      if (!res.ok) {
        toast.error('Failed to load testimonials')
        return
      }
      const data = await res.json()
      setTestimonials(data.testimonials || data || [])
    } catch {
      toast.error('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  const handleDelete = async (id: string, clientName: string) => {
    if (!window.confirm(`Are you sure you want to delete the testimonial from "${clientName}"? This action cannot be undone.`)) {
      return
    }
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id))
        toast.success('Testimonial deleted successfully')
      } else {
        toast.error('Failed to delete testimonial')
      }
    } catch {
      toast.error('Failed to delete testimonial')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48 bg-white/10" />
            <Skeleton className="h-4 w-64 mt-2 bg-white/10" />
          </div>
        </div>
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full bg-white/5 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-white/50 mt-1">
            Manage client testimonials displayed on the website
          </p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white gap-2">
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        </Link>
      </div>

      {/* Testimonial Cards */}
      {testimonials.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <Quote className="h-12 w-12 text-white/20 mx-auto mb-3" />
          <p className="text-white/50">No testimonials yet</p>
          <Link href="/admin/testimonials/new">
            <Button variant="link" className="text-[#ff8c00] mt-2">
              Add your first testimonial
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.07] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Quote className="h-4 w-4 text-[#ff8c00] shrink-0" />
                    <p className="text-white/70 text-sm line-clamp-2 italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium text-sm">
                      — {testimonial.clientName}
                    </span>
                    {testimonial.type && (
                      <Badge
                        variant="secondary"
                        className="bg-white/10 text-white/50 text-xs"
                      >
                        {testimonial.type}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/50 hover:text-white hover:bg-white/5 h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={deletingId === testimonial.id}
                    onClick={() => handleDelete(testimonial.id, testimonial.clientName)}
                    className="text-white/50 hover:text-red-400 hover:bg-red-500/10 h-8 w-8"
                  >
                    {deletingId === testimonial.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
