'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

const iconOptions = [
  'Globe', 'Mail', 'Cloud', 'Settings', 'Network', 'Wifi',
  'Wrench', 'Video', 'Hammer', 'Shield', 'Printer', 'Monitor',
  'Package', 'Code', 'Box', 'Cable', 'Camera',
]

interface Service {
  id: string
  title: string
  description: string
  icon: string
  order: number
}

export default function AdminServicesEditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    icon: 'Globe',
    order: 0,
  })

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/admin/services/${id}`)
        if (!res.ok) {
          setNotFound(true)
          return
        }
        const data = await res.json()
        setForm({
          title: data.title || '',
          description: data.description || '',
          icon: data.icon || 'Globe',
          order: data.order ?? 0,
        })
      } catch {
        toast.error('Failed to load service')
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [id])

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) {
      toast.error('Title is required')
      return
    }

    setSaving(true)
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to update service')
        return
      }

      toast.success('Service updated successfully')
      router.push('/admin/services')
    } catch {
      toast.error('An error occurred. Please try again.')
    } finally {
      setSaving(false)
    }
  }

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
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full bg-white/10 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <p className="text-white/50 mb-4">Service not found</p>
        <Link href="/admin/services">
          <Button className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white">
            Back to Services
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/services">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/50 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Service</h1>
          <p className="text-white/50 mt-0.5">
            Update service details
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-6"
      >
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white/70 text-sm font-medium">
            Title <span className="text-red-400">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g. Network Security"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-white/70 text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Brief description of the service..."
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white/70 text-sm font-medium">Icon</Label>
            <Select
              value={form.icon}
              onValueChange={(val) => handleChange('icon', val)}
            >
              <SelectTrigger className="w-full bg-white/5 border-white/10 text-white data-[placeholder]:text-white/30">
                <SelectValue placeholder="Select icon" />
              </SelectTrigger>
              <SelectContent className="bg-[#0e2a4a] border-white/10">
                {iconOptions.map((icon) => (
                  <SelectItem
                    key={icon}
                    value={icon}
                    className="text-white/80 focus:text-white focus:bg-white/5"
                  >
                    {icon}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order" className="text-white/70 text-sm font-medium">
              Display Order
            </Label>
            <Input
              id="order"
              type="number"
              min={0}
              placeholder="0"
              value={form.order}
              onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
          </div>
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
            {saving ? 'Updating...' : 'Update Service'}
          </Button>
          <Link href="/admin/services">
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
