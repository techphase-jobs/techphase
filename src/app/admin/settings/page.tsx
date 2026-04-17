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

interface SettingsData {
  companyName: string
  phone: string
  whatsapp: string
  email: string
  address: string
  digitalAddress: string
  region: string
  hours: string
  facebook: string
  twitter: string
  linkedin: string
  instagram: string
  googleMapUrl: string
}

const defaultSettings: SettingsData = {
  companyName: '',
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  digitalAddress: '',
  region: '',
  hours: '',
  facebook: '',
  twitter: '',
  linkedin: '',
  instagram: '',
  googleMapUrl: '',
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<SettingsData>(defaultSettings)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings')
        if (res.ok) {
          const data = await res.json()
          setForm({
            companyName: data.companyName || '',
            phone: data.phone || '',
            whatsapp: data.whatsapp || '',
            email: data.email || '',
            address: data.address || '',
            digitalAddress: data.digitalAddress || '',
            region: data.region || '',
            hours: data.hours || '',
            facebook: data.facebook || '',
            twitter: data.twitter || '',
            linkedin: data.linkedin || '',
            instagram: data.instagram || '',
            googleMapUrl: data.googleMapUrl || '',
          })
        }
      } catch {
        toast.error('Failed to load settings')
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleChange = (field: keyof SettingsData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to save settings')
        return
      }

      toast.success('Settings updated successfully')
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
          {Array.from({ length: 10 }).map((_, i) => (
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
        <h1 className="text-2xl font-bold text-white">Site Settings</h1>
        <p className="text-white/50 mt-1">
          Manage company information, contact details, and social media links
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-6"
      >
        {/* Company Info */}
        <div>
          <h3 className="text-white font-medium mb-4">Company Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className={labelClass}>Company Name</Label>
              <Input
                id="companyName"
                placeholder="e.g. TechPhase Solutions"
                value={form.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={labelClass}>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. info@techphasesolutions.com"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
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
                <Label htmlFor="whatsapp" className={labelClass}>WhatsApp</Label>
                <Input
                  id="whatsapp"
                  placeholder="+233 xxx xxx xxx"
                  value={form.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Address */}
        <div>
          <h3 className="text-white font-medium mb-4">Address & Location</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className={labelClass}>Physical Address</Label>
              <Textarea
                id="address"
                placeholder="Full street address..."
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
                rows={3}
                className={`${inputClass} min-h-[80px]`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="digitalAddress" className={labelClass}>Digital Address</Label>
                <Input
                  id="digitalAddress"
                  placeholder="e.g. GA-123-4567"
                  value={form.digitalAddress}
                  onChange={(e) => handleChange('digitalAddress', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region" className={labelClass}>Region</Label>
                <Input
                  id="region"
                  placeholder="e.g. Greater Accra"
                  value={form.region}
                  onChange={(e) => handleChange('region', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours" className={labelClass}>Working Hours</Label>
              <Textarea
                id="hours"
                placeholder="e.g. Mon - Fri: 8:00 AM - 5:00 PM"
                value={form.hours}
                onChange={(e) => handleChange('hours', e.target.value)}
                rows={4}
                className={`${inputClass} min-h-[100px]`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="googleMapUrl" className={labelClass}>Google Maps Embed URL</Label>
              <Input
                id="googleMapUrl"
                placeholder="https://www.google.com/maps/embed?..."
                value={form.googleMapUrl}
                onChange={(e) => handleChange('googleMapUrl', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Social Media */}
        <div>
          <h3 className="text-white font-medium mb-4">Social Media Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebook" className={labelClass}>Facebook</Label>
              <Input
                id="facebook"
                placeholder="https://facebook.com/..."
                value={form.facebook}
                onChange={(e) => handleChange('facebook', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter" className={labelClass}>Twitter / X</Label>
              <Input
                id="twitter"
                placeholder="https://twitter.com/..."
                value={form.twitter}
                onChange={(e) => handleChange('twitter', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className={labelClass}>LinkedIn</Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/company/..."
                value={form.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram" className={labelClass}>Instagram</Label>
              <Input
                id="instagram"
                placeholder="https://instagram.com/..."
                value={form.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Info note */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[#ff8c00]/5 border border-[#ff8c00]/10">
          <Info className="h-4 w-4 text-[#ff8c00] mt-0.5 shrink-0" />
          <p className="text-white/50 text-sm">
            These settings are used across the website in the contact section, footer, and navigation. Changes will be reflected immediately after saving.
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
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  )
}
