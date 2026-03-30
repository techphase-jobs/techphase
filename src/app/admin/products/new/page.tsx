'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Loader2, Save } from 'lucide-react'

export default function AdminProductsNewPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    category: 'General',
    description: '',
    price: '',
    image: '',
    inStock: true,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Product name is required')
      return
    }

    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price) || 0,
          currency: 'GHS',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create product')
        return
      }

      router.push('/admin/products')
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/50 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add Product</h1>
          <p className="text-white/50 mt-0.5">
            Add a new product to your catalog
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/80">
              Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Product name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ff8c00]/50 focus:ring-[#ff8c00]/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-white/80">
              Category
            </Label>
            <Input
              id="category"
              placeholder="e.g., Laptops, Networking"
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ff8c00]/50 focus:ring-[#ff8c00]/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-white/80">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe the product..."
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={6}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ff8c00]/50 focus:ring-[#ff8c00]/20 min-h-[120px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-white/80">
              Price (GHS)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ff8c00]/50 focus:ring-[#ff8c00]/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-white/80">
              Image URL
            </Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ff8c00]/50 focus:ring-[#ff8c00]/20"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
          <div>
            <Label className="text-white/80">In Stock</Label>
            <p className="text-white/40 text-xs mt-0.5">
              Product is available for purchase
            </p>
          </div>
          <Switch
            checked={form.inStock}
            onCheckedChange={(checked) =>
              handleChange('inStock', checked)
            }
            className="data-[state=checked]:bg-[#ff8c00]"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#ff8c00] hover:bg-[#ff8c00]/90 text-white gap-2"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? 'Saving...' : 'Save Product'}
          </Button>
          <Link href="/admin/products">
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
