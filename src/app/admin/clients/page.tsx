'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus, Pencil, Trash2, Loader2, Building2 } from 'lucide-react'
import { toast } from 'sonner'

interface Client {
  id: string
  name: string
  logo: string
  website: string
  order: number
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/clients')
      if (!res.ok) {
        toast.error('Failed to load clients')
        return
      }
      const data = await res.json()
      setClients(data.clients || data || [])
    } catch {
      toast.error('Failed to load clients')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return
    }
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/clients/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setClients((prev) => prev.filter((c) => c.id !== id))
        toast.success('Client deleted successfully')
      } else {
        toast.error('Failed to delete client')
      }
    } catch {
      toast.error('Failed to delete client')
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full bg-white/5 rounded-xl" />
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
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-white/50 mt-1">
            Manage your client logos and information
          </p>
        </div>
        <Link href="/admin/clients/new">
          <Button className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white gap-2">
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </Link>
      </div>

      {/* Client Cards */}
      {clients.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <Building2 className="h-12 w-12 text-white/20 mx-auto mb-3" />
          <p className="text-white/50">No clients yet</p>
          <Link href="/admin/clients/new">
            <Button variant="link" className="text-[#ff8c00] mt-2">
              Add your first client
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.07] transition-colors group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-12 h-12 rounded-lg object-contain shrink-0 bg-white/5 p-1"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#ff8c00]/10 flex items-center justify-center shrink-0">
                      <Building2 className="h-6 w-6 text-[#ff8c00]" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white truncate">
                      {client.name}
                    </h3>
                    {client.website && (
                      <p className="text-white/30 text-xs mt-1 truncate">
                        {client.website}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/admin/clients/${client.id}/edit`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/50 hover:text-white hover:bg-white/5 h-7 w-7"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={deletingId === client.id}
                    onClick={() => handleDelete(client.id, client.name)}
                    className="text-white/50 hover:text-red-400 hover:bg-red-500/10 h-7 w-7"
                  >
                    {deletingId === client.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
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
