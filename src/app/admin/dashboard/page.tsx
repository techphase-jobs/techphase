'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdmin } from '../layout'
import { Skeleton } from '@/components/ui/skeleton'
import {
  FileText,
  Package,
  MessageSquare,
  Eye,
  TrendingUp,
} from 'lucide-react'

interface Stats {
  totalPosts: number
  totalProducts: number
  newSubmissions: number
  publishedPosts: number
}

export default function AdminDashboardPage() {
  const { adminName } = useAdmin()
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    totalProducts: 0,
    newSubmissions: 0,
    publishedPosts: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogRes, productsRes, submissionsRes] = await Promise.all([
          fetch('/api/admin/blog?limit=1'),
          fetch('/api/admin/products?limit=1'),
          fetch('/api/admin/submissions?limit=1&status=new'),
        ])

        if (!blogRes.ok || !productsRes.ok || !submissionsRes.ok) {
          setError('Failed to load dashboard data')
          return
        }

        const [blogData, productsData, submissionsData] = await Promise.all([
          blogRes.json(),
          productsRes.json(),
          submissionsRes.json(),
        ])

        const publishedRes = await fetch(
          '/api/admin/blog?limit=1&published=true'
        )
        const publishedData = publishedRes.ok
          ? await publishedRes.json()
          : { total: 0 }

        setStats({
          totalPosts: blogData.total || 0,
          totalProducts: productsData.total || 0,
          newSubmissions: submissionsData.total || 0,
          publishedPosts: publishedData.total || 0,
        })
      } catch {
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      label: 'Total Blog Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'from-blue-500/20 to-blue-600/10',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
      href: '/admin/blog',
    },
    {
      label: 'Published Posts',
      value: stats.publishedPosts,
      icon: Eye,
      color: 'from-green-500/20 to-green-600/10',
      iconColor: 'text-green-400',
      borderColor: 'border-green-500/20',
      href: '/admin/blog',
    },
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'from-purple-500/20 to-purple-600/10',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
      href: '/admin/products',
    },
    {
      label: 'New Submissions',
      value: stats.newSubmissions,
      icon: MessageSquare,
      color: 'from-orange-500/20 to-orange-600/10',
      iconColor: 'text-[#ff8c00]',
      borderColor: 'border-[#ff8c00]/20',
      href: '/admin/submissions',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back{adminName ? `, ${adminName}` : ''}
        </h1>
        <p className="text-white/50 mt-1">
          Here&apos;s an overview of your website activity.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <Skeleton className="h-5 w-24 mb-3 bg-white/10" />
                <Skeleton className="h-8 w-16 mb-2 bg-white/10" />
                <Skeleton className="h-4 w-32 bg-white/10" />
              </div>
            ))
          : statCards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className={`block rounded-xl border ${card.borderColor} bg-white/5 p-6 transition-all hover:bg-white/[0.07] hover:scale-[1.02] cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white/60 text-sm font-medium">
                    {card.label}
                  </p>
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}
                  >
                    <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{card.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                  <p className="text-xs text-white/40">Total count</p>
                </div>
              </Link>
            ))}
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-white font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-[#ff8c00]/10 text-white/70 hover:text-[#ff8c00] transition-colors text-sm"
            >
              <FileText className="h-4 w-4" />
              New Blog Post
            </Link>
            <Link
              href="/admin/products/new"
              className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-[#ff8c00]/10 text-white/70 hover:text-[#ff8c00] transition-colors text-sm"
            >
              <Package className="h-4 w-4" />
              Add Product
            </Link>
            <Link
              href="/admin/submissions"
              className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-[#ff8c00]/10 text-white/70 hover:text-[#ff8c00] transition-colors text-sm"
            >
              <MessageSquare className="h-4 w-4" />
              View Messages
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-white font-semibold mb-3">System Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/50">Platform</span>
              <span className="text-white/80">Next.js 16</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Storage</span>
              <span className="text-white/80">JSON File Store</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Status</span>
              <span className="text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
