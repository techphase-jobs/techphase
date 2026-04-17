'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus, Pencil, Trash2, Loader2, Users } from 'lucide-react'
import { toast } from 'sonner'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  phone: string
  email: string
  linkedin: string
  twitter: string
  order: number
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/team')
      if (!res.ok) {
        toast.error('Failed to load team members')
        return
      }
      const data = await res.json()
      setMembers(data.team || data.members || data || [])
    } catch {
      toast.error('Failed to load team members')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return
    }
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id))
        toast.success('Team member deleted successfully')
      } else {
        toast.error('Failed to delete team member')
      }
    } catch {
      toast.error('Failed to delete team member')
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
          <h1 className="text-2xl font-bold text-white">Team Members</h1>
          <p className="text-white/50 mt-1">
            Manage your team displayed on the website
          </p>
        </div>
        <Link href="/admin/team/new">
          <Button className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white gap-2">
            <Plus className="h-4 w-4" />
            Add Team Member
          </Button>
        </Link>
      </div>

      {/* Team Cards */}
      {members.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <Users className="h-12 w-12 text-white/20 mx-auto mb-3" />
          <p className="text-white/50">No team members yet</p>
          <Link href="/admin/team/new">
            <Button variant="link" className="text-[#ff8c00] mt-2">
              Add your first team member
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.07] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover shrink-0 border border-white/10"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#ff8c00]/10 flex items-center justify-center shrink-0">
                      <span className="text-[#ff8c00] font-semibold text-sm">
                        {member.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-white">
                        {member.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-[#ff8c00]/10 text-[#ff8c00] text-xs"
                      >
                        {member.role}
                      </Badge>
                    </div>
                    <p className="text-white/40 text-sm mt-1 line-clamp-2">
                      {member.bio || 'No bio provided'}
                    </p>
                    {member.email && (
                      <p className="text-white/30 text-xs mt-1">{member.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/admin/team/${member.id}/edit`}>
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
                    disabled={deletingId === member.id}
                    onClick={() => handleDelete(member.id, member.name)}
                    className="text-white/50 hover:text-red-400 hover:bg-red-500/10 h-8 w-8"
                  >
                    {deletingId === member.id ? (
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
