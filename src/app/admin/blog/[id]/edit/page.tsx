'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Loader2, Save } from 'lucide-react'

const categories = ['Security', 'IT Solutions', 'Cloud', 'Networking']

interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
  content: string
  author: string
  featuredImage: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminBlogEditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [form, setForm] = useState({
    title: '',
    category: 'IT Solutions',
    author: 'Techphase Team',
    content: '',
    featuredImage: '',
    published: false,
  })

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/admin/blog?limit=50')
        if (!res.ok) {
          setError('Failed to load post')
          return
        }
        const data = await res.json()
        const post = (data.posts || []).find(
          (p: BlogPost) => p.id === id
        )
        if (!post) {
          setNotFound(true)
          return
        }
        setForm({
          title: post.title,
          category: post.category,
          author: post.author,
          content: post.content,
          featuredImage: post.featuredImage,
          published: post.published,
        })
      } catch {
        setError('Failed to load post')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Title is required')
      return
    }

    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to update post')
        return
      }

      router.push('/admin/blog')
    } catch {
      setError('An error occurred. Please try again.')
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
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full bg-white/10 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <p className="text-white/50 mb-4">Blog post not found</p>
        <Link href="/admin/blog">
          <Button className="bg-[#ff8c00] hover:bg-[#ff8c00]/90 text-white">
            Back to Blog
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/50 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Post</h1>
          <p className="text-white/50 mt-0.5">
            Update your blog post
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
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white/80">
            Title <span className="text-red-400">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Enter post title"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ff8c00]/50 focus:ring-[#ff8c00]/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white/80">Category</Label>
            <Select
              value={form.category}
              onValueChange={(val) => handleChange('category', val)}
            >
              <SelectTrigger className="w-full bg-white/5 border-white/10 text-white data-[placeholder]:text-white/30">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-[#0e2a4a] border-white/10">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="text-white/80 focus:text-white focus:bg-white/5"
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="text-white/80">
              Author
            </Label>
            <Input
              id="author"
              placeholder="Author name"
              value={form.author}
              onChange={(e) => handleChange('author', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ff8c00]/50 focus:ring-[#ff8c00]/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content" className="text-white/80">
            Content
          </Label>
          <Textarea
            id="content"
            placeholder="Write your blog post content..."
            value={form.content}
            onChange={(e) => handleChange('content', e.target.value)}
            rows={12}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ff8c00]/50 focus:ring-[#ff8c00]/20 min-h-[200px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="featuredImage" className="text-white/80">
            Featured Image URL
          </Label>
          <Input
            id="featuredImage"
            placeholder="https://example.com/image.jpg"
            value={form.featuredImage}
            onChange={(e) =>
              handleChange('featuredImage', e.target.value)
            }
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ff8c00]/50 focus:ring-[#ff8c00]/20"
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
          <div>
            <Label className="text-white/80">Published</Label>
            <p className="text-white/40 text-xs mt-0.5">
              Make this post visible on the website
            </p>
          </div>
          <Switch
            checked={form.published}
            onCheckedChange={(checked) =>
              handleChange('published', checked)
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
            {saving ? 'Updating...' : 'Update Post'}
          </Button>
          <Link href="/admin/blog">
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
