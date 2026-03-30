'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react'

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

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/blog?limit=50')
      if (!res.ok) {
        setError('Failed to load blog posts')
        return
      }
      const data = await res.json()
      setPosts(data.posts || [])
    } catch {
      setError('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleTogglePublished = async (post: BlogPost) => {
    setTogglingId(post.id)
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published }),
      })
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id ? { ...p, published: !p.published } : p
          )
        )
      }
    } catch {
      // silently fail
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id))
      }
    } catch {
      // silently fail
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-white/50 mt-1">
            Manage your blog posts and content
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-[#ff8c00] hover:bg-[#ff8c00]/90 text-white gap-2">
            <Plus className="h-4 w-4" />
            Create New Post
          </Button>
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-4 w-[200px] bg-white/10" />
                <Skeleton className="h-4 w-[100px] bg-white/10" />
                <Skeleton className="h-4 w-[100px] bg-white/10" />
                <Skeleton className="h-6 w-[70px] bg-white/10 rounded-full" />
                <Skeleton className="h-4 w-[80px] bg-white/10" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center">
            <FileTextIcon className="h-12 w-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/50">No blog posts yet</p>
            <Link href="/admin/blog/new">
              <Button
                variant="link"
                className="text-[#ff8c00] mt-2"
              >
                Create your first post
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/60">Title</TableHead>
                  <TableHead className="text-white/60">Category</TableHead>
                  <TableHead className="text-white/60 hidden sm:table-cell">
                    Author
                  </TableHead>
                  <TableHead className="text-white/60">Published</TableHead>
                  <TableHead className="text-white/60 hidden md:table-cell">
                    Date
                  </TableHead>
                  <TableHead className="text-white/60 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow
                    key={post.id}
                    className="border-white/5 hover:bg-white/5"
                  >
                    <TableCell className="font-medium text-white max-w-[250px] truncate">
                      {post.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-white/10 text-white/70 text-xs"
                      >
                        {post.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white/50 hidden sm:table-cell">
                      {post.author}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs ${
                          post.published
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-white/5 text-white/40 border-white/10'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white/50 hidden md:table-cell">
                      {formatDate(post.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleTogglePublished(post)}
                          disabled={togglingId === post.id}
                          className="text-white/50 hover:text-white hover:bg-white/5 h-8 w-8"
                          title={
                            post.published ? 'Unpublish' : 'Publish'
                          }
                        >
                          {togglingId === post.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : post.published ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/50 hover:text-white hover:bg-white/5 h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={deletingId === post.id}
                              className="text-white/50 hover:text-red-400 hover:bg-red-500/10 h-8 w-8"
                            >
                              {deletingId === post.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-[#0e2a4a] border-white/10">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">
                                Delete Post
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-white/50">
                                Are you sure you want to delete &quot;
                                {post.title}&quot;? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(post.id)}
                                className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}
