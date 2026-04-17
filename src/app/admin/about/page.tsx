'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2, Save, Info } from 'lucide-react'
import { toast } from 'sonner'

interface AboutData {
  title: string
  subtitle: string
  description: string
  mission: string
  vision: string
  values: string
  history: string
  image: string
}

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<AboutData>({
    title: '',
    subtitle: '',
    description: '',
    mission: '',
    vision: '',
    values: '',
    history: '',
    image: '',
  })

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch('/api/admin/about')
        if (res.ok) {
          const data = await res.json()
          setForm({
            title: data.title || '',
            subtitle: data.subtitle || '',
            description: data.description || '',
            mission: data.mission || '',
            vision: data.vision || '',
            values: data.values || '',
            history: data.history || '',
            image: data.image || '',
          })
        }
      } catch {
        toast.error('Failed to load about page data')
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  const handleChange = (field: keyof AboutData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to save about page')
        return
      }

      toast.success('About page updated successfully')
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
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-white/10" />
          <Skeleton className="h-4 w-64 bg-white/10" />
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full bg-white/10 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">About Page</h1>
        <p className="text-white/50 mt-1">
          Edit the content displayed on the About page
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title" className={labelClass}>Page Title</Label>
            <Input
              id="title"
              placeholder="e.g. About TechPhase Solutions"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle" className={labelClass}>Subtitle</Label>
            <Input
              id="subtitle"
              placeholder="e.g. Your Trusted IT Partner"
              value={form.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className={labelClass}>Description</Label>
          <Textarea
            id="description"
            placeholder="Main description about the company..."
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={6}
            className={`${inputClass} min-h-[150px]`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mission" className={labelClass}>Mission</Label>
          <Textarea
            id="mission"
            placeholder="Company mission statement..."
            value={form.mission}
            onChange={(e) => handleChange('mission', e.target.value)}
            rows={4}
            className={`${inputClass} min-h-[100px]`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vision" className={labelClass}>Vision</Label>
          <Textarea
            id="vision"
            placeholder="Company vision statement..."
            value={form.vision}
            onChange={(e) => handleChange('vision', e.target.value)}
            rows={4}
            className={`${inputClass} min-h-[100px]`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="values" className={labelClass}>Core Values</Label>
          <Textarea
            id="values"
            placeholder="Company core values (e.g. Innovation, Reliability, Excellence)..."
            value={form.values}
            onChange={(e) => handleChange('values', e.target.value)}
            rows={4}
            className={`${inputClass} min-h-[100px]`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="history" className={labelClass}>Company History</Label>
          <Textarea
            id="history"
            placeholder="Brief history of the company..."
            value={form.history}
            onChange={(e) => handleChange('history', e.target.value)}
            rows={6}
            className={`${inputClass} min-h-[150px]`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image" className={labelClass}>About Page Image URL</Label>
          <Input
            id="image"
            placeholder="https://example.com/about-image.jpg"
            value={form.image}
            onChange={(e) => handleChange('image', e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Info note */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[#ff8c00]/5 border border-[#ff8c00]/10">
          <Info className="h-4 w-4 text-[#ff8c00] mt-0.5 shrink-0" />
          <p className="text-white/50 text-sm">
            This form manages the about page content. Changes will be reflected on the website immediately after saving.
          </p>
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
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
