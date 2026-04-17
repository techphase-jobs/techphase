'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Loader2, Save, Info } from 'lucide-react'
import { toast } from 'sonner'

interface HeroStat {
  value: string
  label: string
}

interface HeroData {
  badge: string
  title: string
  titleHighlight: string
  titleSuffix: string
  description: string
  buttonText: string
  buttonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  stats: HeroStat[]
}

const defaultHero: HeroData = {
  badge: '',
  title: '',
  titleHighlight: '',
  titleSuffix: '',
  description: '',
  buttonText: '',
  buttonLink: '',
  secondaryButtonText: '',
  secondaryButtonLink: '',
  stats: [
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
  ],
}

export default function AdminHeroPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<HeroData>(defaultHero)

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch('/api/admin/hero')
        if (res.ok) {
          const data = await res.json()
          setForm({
            badge: data.badge || '',
            title: data.title || '',
            titleHighlight: data.titleHighlight || '',
            titleSuffix: data.titleSuffix || '',
            description: data.description || '',
            buttonText: data.buttonText || '',
            buttonLink: data.buttonLink || '',
            secondaryButtonText: data.secondaryButtonText || '',
            secondaryButtonLink: data.secondaryButtonLink || '',
            stats: data.stats && data.stats.length > 0 ? data.stats : defaultHero.stats,
          })
        }
      } catch {
        toast.error('Failed to load hero section data')
      } finally {
        setLoading(false)
      }
    }
    fetchHero()
  }, [])

  const handleChange = (field: keyof Omit<HeroData, 'stats'>, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleStatChange = (index: number, field: keyof HeroStat, value: string) => {
    setForm((prev) => {
      const newStats = [...prev.stats]
      newStats[index] = { ...newStats[index], [field]: value }
      return { ...prev, stats: newStats }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to save hero section')
        return
      }

      toast.success('Hero section updated successfully')
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
        <h1 className="text-2xl font-bold text-white">Hero Section</h1>
        <p className="text-white/50 mt-1">
          Edit the main hero banner content and call-to-action buttons
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-6"
      >
        {/* Badge */}
        <div className="space-y-2">
          <Label htmlFor="badge" className={labelClass}>Badge Text</Label>
          <Input
            id="badge"
            placeholder="e.g. Welcome to TechPhase Solutions"
            value={form.badge}
            onChange={(e) => handleChange('badge', e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Title Parts */}
        <div className="space-y-2">
          <Label className={labelClass}>
            Title <span className="text-white/40 font-normal">(split into 3 parts for highlight effect)</span>
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              placeholder="Before highlight"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={inputClass}
            />
            <Input
              placeholder="Highlighted text"
              value={form.titleHighlight}
              onChange={(e) => handleChange('titleHighlight', e.target.value)}
              className={inputClass}
            />
            <Input
              placeholder="After highlight"
              value={form.titleSuffix}
              onChange={(e) => handleChange('titleSuffix', e.target.value)}
              className={inputClass}
            />
          </div>
          <p className="text-white/30 text-xs">
            Preview: &ldquo;{form.title || '...'}&nbsp;
            <span className="text-[#ff8c00]">{form.titleHighlight || '...'}</span>&nbsp;
            {form.titleSuffix || '...'}&rdquo;
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className={labelClass}>Description</Label>
          <Textarea
            id="description"
            placeholder="Hero section description text..."
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            className={`${inputClass} min-h-[100px]`}
          />
        </div>

        <Separator className="bg-white/10" />

        {/* Primary CTA */}
        <div className="space-y-2">
          <Label className={labelClass}>Primary CTA Button</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="Button Text (e.g. Get in Touch)"
              value={form.buttonText}
              onChange={(e) => handleChange('buttonText', e.target.value)}
              className={inputClass}
            />
            <Input
              placeholder="Button Link (e.g. /contact)"
              value={form.buttonLink}
              onChange={(e) => handleChange('buttonLink', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="space-y-2">
          <Label className={labelClass}>Secondary CTA Button</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="Button Text (e.g. Our Services)"
              value={form.secondaryButtonText}
              onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
              className={inputClass}
            />
            <Input
              placeholder="Button Link (e.g. /services)"
              value={form.secondaryButtonLink}
              onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Stats */}
        <div className="space-y-4">
          <Label className={labelClass}>Statistics (3 items)</Label>
          <div className="space-y-3">
            {form.stats.map((stat, index) => (
              <div key={index} className="grid grid-cols-2 gap-3 items-center">
                <Input
                  placeholder={`Stat ${index + 1} Value (e.g. 150+)`}
                  value={stat.value}
                  onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                  className={inputClass}
                />
                <Input
                  placeholder={`Stat ${index + 1} Label (e.g. Clients)`}
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info note */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[#ff8c00]/5 border border-[#ff8c00]/10">
          <Info className="h-4 w-4 text-[#ff8c00] mt-0.5 shrink-0" />
          <p className="text-white/50 text-sm">
            This form manages the hero section at the top of the homepage. Changes will be reflected immediately after saving.
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
