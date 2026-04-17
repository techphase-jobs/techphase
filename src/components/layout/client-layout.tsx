'use client'

import { useEffect } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import ScrollToTop from '@/components/layout/scroll-to-top'

interface ClientLayoutProps {
  children: React.ReactNode
  settings?: Record<string, unknown> | null
}

export default function ClientLayout({ children, settings }: ClientLayoutProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right'
    )
    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer settings={settings as any} />
      <ScrollToTop />
    </div>
  )
}
