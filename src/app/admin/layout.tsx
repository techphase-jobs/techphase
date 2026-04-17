'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  LayoutDashboard,
  FileText,
  Package,
  MessageSquare,
  Settings,
  Users,
  Briefcase,
  Star,
  Info,
  Sparkles,
  LogOut,
  Menu,
  X,
  Loader2,
} from 'lucide-react'

interface AdminContextType {
  adminName: string | null
}

const AdminContext = createContext<AdminContextType>({ adminName: null })

export function useAdmin() {
  return useContext(AdminContext)
}

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Services',
    href: '/admin/services',
    icon: Briefcase,
  },
  {
    label: 'Team',
    href: '/admin/team',
    icon: Users,
  },
  {
    label: 'Clients',
    href: '/admin/clients',
    icon: Package,
  },
  {
    label: 'Testimonials',
    href: '/admin/testimonials',
    icon: Star,
  },
  {
    label: 'Blog',
    href: '/admin/blog',
    icon: FileText,
  },
  {
    label: 'Submissions',
    href: '/admin/submissions',
    icon: MessageSquare,
  },
  {
    label: 'About Page',
    href: '/admin/about',
    icon: Info,
  },
  {
    label: 'Hero Section',
    href: '/admin/hero',
    icon: Sparkles,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [adminName, setAdminName] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth')
        if (!res.ok) {
          if (!isLoginPage) {
            router.push('/admin/login')
          }
          return
        }
        const data = await res.json()
        setAuthenticated(true)
        setAdminName(data.name || null)
        if (isLoginPage) {
          router.push('/admin/dashboard')
        }
      } catch {
        if (!isLoginPage) {
          router.push('/admin/login')
        }
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      router.push('/admin/login')
    } catch {
      // Force redirect even if API fails
      router.push('/admin/login')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a2540]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#ff8c00]" />
          <p className="text-white/50 text-sm">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  // Login page renders without sidebar
  if (isLoginPage) {
    return (
      <AdminContext.Provider value={{ adminName: null }}>
        {children}
      </AdminContext.Provider>
    )
  }

  // Not authenticated
  if (!authenticated) {
    return null
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="block">
          <h1 className="text-lg font-bold">
            <span className="text-white">Techphase</span>{' '}
            <span className="text-[#ff8c00]">Solutions</span>
          </h1>
          <p className="text-white/40 text-xs mt-0.5">Admin Panel</p>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin/dashboard' &&
                pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#ff8c00]/10 text-[#ff8c00]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User Info + Logout */}
      <div className="border-t border-white/10 p-4">
        {adminName && (
          <p className="text-white/60 text-xs mb-3 truncate">
            Signed in as{' '}
            <span className="text-white/80 font-medium">{adminName}</span>
          </p>
        )}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-white/60 hover:text-red-400 hover:bg-red-500/10 gap-3"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <AdminContext.Provider value={{ adminName }}>
      <div className="fixed inset-0 z-[100] flex bg-[#0a2540]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r border-white/10 bg-[#0a2540]/95 backdrop-blur-sm">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`lg:hidden fixed top-0 left-0 z-[120] w-72 h-full bg-[#0a2540] border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Bar */}
          <header className="h-16 border-b border-white/10 flex items-center px-4 lg:px-6 shrink-0 bg-[#0a2540]/95 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white/60 hover:text-white hover:bg-white/5 mr-3"
              onClick={() => setSidebarOpen(true)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <h2 className="text-white font-semibold text-lg">Admin Panel</h2>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-6 max-w-7xl mx-auto">{children}</div>
          </main>

          {/* Footer */}
          <footer className="border-t border-white/10 py-4 px-4 lg:px-6 shrink-0 bg-[#0a2540]/95">
            <p className="text-white/30 text-xs text-center">
              Techphase Solutions Admin &copy; {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </div>
    </AdminContext.Provider>
  )
}
