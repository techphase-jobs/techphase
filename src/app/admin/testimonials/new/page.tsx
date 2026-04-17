'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

const typeOptions = ['Client', 'Partner', 'Employee', 'General']

export default function AdminTestimonialsNewPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    quote: '',
    clientName: '',
    type: 'Client',
    order: 0,
  })

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.quote.trim()) {
      toast.error('Quote is required')
      return
    }
    if (!form.clientName.trim()) {
      toast.error('Client name is required')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to create testimonial')
        return
      }

      toast.success('Testimonial created successfully')
      router.push('/admin/testimonials')
    } catch {
      toast.error('An error occurred. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "bg-white/5 border-white/10 text-white placeholder:text-white/30"
  const labelClass = "text-white/70 text-sm font-medium"

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/testimonials">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/50 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add Testimonial</h1>
          <p className="text-white/50 mt-0.5">
            Add a new client testimonial
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-6"
      >
        <div className="space-y-2">
          <Label htmlFor="quote" className={labelClass}>
            Quote <span className="text-red-400">*</span>
          </Label>
          <Textarea
            id="quote"
            placeholder="Enter the testimonial quote..."
            value={form.quote}
            onChange={(e) => handleChange('quote', e.target.value)}
            rows={5}
            className={`${inputClass} min-h-[120px]`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="clientName" className={labelClass}>
              Client Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="clientName"
              placeholder="e.g. John Smith"
              value={form.clientName}
              onChange={(e) => handleChange('clientName', e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label className={labelClass}>Type</Label>
            <Select
              value={form.type}
              onValueChange={(val) => handleChange('type', val)}
            >
              <SelectTrigger className="w-full bg-white/5 border-white/10 text-white data-[placeholder]:text-white/30">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-[#0e2a4a] border-white/10">
                {typeOptions.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="text-white/80 focus:text-white focus:bg-white/5"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            {saving ? 'Saving...' : 'Save Testimonial'}
          </Button>
          <Link href="/admin/testimonials">
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
