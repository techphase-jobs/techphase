'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
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

export default function AdminTeamEditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [form, setForm] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    phone: '',
    email: '',
    linkedin: '',
    twitter: '',
    order: 0,
  })

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`/api/admin/team/${id}`)
        if (!res.ok) {
          setNotFound(true)
          return
        }
        const data: TeamMember = await res.json()
        setForm({
          name: data.name || '',
          role: data.role || '',
          bio: data.bio || '',
          image: data.image || '',
          phone: data.phone || '',
          email: data.email || '',
          linkedin: data.linkedin || '',
          twitter: data.twitter || '',
          order: data.order ?? 0,
        })
      } catch {
        toast.error('Failed to load team member')
      } finally {
        setLoading(false)
      }
    }
    fetchMember()
  }, [id])

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      toast.error('Name is required')
      return
    }
    if (!form.role.trim()) {
      toast.error('Role is required')
      return
    }

    setSaving(true)
    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to update team member')
        return
      }

      toast.success('Team member updated successfully')
      router.push('/admin/team')
    } catch {
      toast.error('An error occurred. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "bg-white/5 border-white/10 text-white placeholder:text-white/30"
  const labelClass = "text-white/70 text-sm font-medium"

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-lg bg-white/10" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 bg-white/10" />
            <Skeleton className="h-4 w-64 bg-white/10" />
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full bg-white/10 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <p className="text-white/50 mb-4">Team member not found</p>
        <Link href="/admin/team">
          <Button className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white">
            Back to Team
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/team">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/50 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Team Member</h1>
          <p className="text-white/50 mt-0.5">
            Update team member details
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={labelClass}>
              Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className={labelClass}>
              Role <span className="text-red-400">*</span>
            </Label>
            <Input
              id="role"
              placeholder="e.g. CEO, Developer"
              value={form.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className={labelClass}>Bio</Label>
          <Textarea
            id="bio"
            placeholder="Brief biography..."
            value={form.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={4}
            className={`${inputClass} min-h-[100px]`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image" className={labelClass}>Photo URL</Label>
          <Input
            id="image"
            placeholder="https://example.com/photo.jpg"
            value={form.image}
            onChange={(e) => handleChange('image', e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className={labelClass}>Phone</Label>
            <Input
              id="phone"
              placeholder="+233 xxx xxx xxx"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className={labelClass}>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin" className={labelClass}>LinkedIn URL</Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/..."
              value={form.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter" className={labelClass}>Twitter URL</Label>
            <Input
              id="twitter"
              placeholder="https://twitter.com/..."
              value={form.twitter}
              onChange={(e) => handleChange('twitter', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="order" className={labelClass}>Display Order</Label>
          <Input
            id="order"
            type="number"
            min={0}
            placeholder="0"
            value={form.order}
            onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
            className={inputClass}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white gap-2"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? 'Updating...' : 'Update Member'}
          </Button>
          <Link href="/admin/team">
            <Button
              type="button"
              variant="outline"
              className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
