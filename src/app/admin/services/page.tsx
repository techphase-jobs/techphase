'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus, Pencil, Trash2, Loader2, Globe } from 'lucide-react'
import { toast } from 'sonner'

interface Service {
  id: string
  title: string
  description: string
  icon: string
  order: number
  createdAt: string
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/services')
      if (!res.ok) {
        toast.error('Failed to load services')
        return
      }
      const data = await res.json()
      setServices(data.services || data || [])
    } catch {
      toast.error('Failed to load services')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id))
        toast.success('Service deleted successfully')
      } else {
        toast.error('Failed to delete service')
      }
    } catch {
      toast.error('Failed to delete service')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-40 bg-white/10" />
            <Skeleton className="h-4 w-64 mt-2 bg-white/10" />
          </div>
        </div>
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full bg-white/5 rounded-xl" />
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
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-white/50 mt-1">
            Manage the services displayed on your website
          </p>
        </div>
        <Link href="/admin/services/new">
          <Button className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white gap-2">
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      {/* Service Cards */}
      {services.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <Globe className="h-12 w-12 text-white/20 mx-auto mb-3" />
          <p className="text-white/50">No services yet</p>
          <Link href="/admin/services/new">
            <Button variant="link" className="text-[#ff8c00] mt-2">
              Add your first service
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.07] transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#ff8c00]/10 flex items-center justify-center shrink-0">
                    <Globe className="h-5 w-5 text-[#ff8c00]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-white truncate">
                        {service.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-white/10 text-white/50 text-xs shrink-0"
                      >
                        #{service.order ?? index + 1}
                      </Badge>
                      {service.icon && (
                        <Badge
                          variant="secondary"
                          className="bg-[#ff8c00]/10 text-[#ff8c00] text-xs shrink-0"
                        >
                          {service.icon}
                        </Badge>
                      )}
                    </div>
                    <p className="text-white/40 text-sm mt-1 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/admin/services/${service.id}/edit`}>
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
                    disabled={deletingId === service.id}
                    onClick={() => handleDelete(service.id, service.title)}
                    className="text-white/50 hover:text-red-400 hover:bg-red-500/10 h-8 w-8"
                  >
                    {deletingId === service.id ? (
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
