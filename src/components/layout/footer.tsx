'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
} from 'lucide-react'
import { NAV_LINKS } from '@/lib/data'

interface Settings {
  id?: string
  companyName?: string
  phone?: string
  whatsapp?: string
  email?: string
  address?: string
  digitalAddress?: string
  region?: string
  hours?: string
  facebook?: string
  twitter?: string
  linkedin?: string
  instagram?: string
  googleMapUrl?: string
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    fetch('/api/public/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings)
      })
      .catch(() => {})
  }, [])

  if (!settings) return null

  return (
    <footer className="bg-[#0a2540] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Column 1: Company Info */}
          <div>
            <Link href="/" className="inline-flex items-center gap-1 mb-4">
              <span className="text-xl font-bold text-white">
                Techphase
              </span>
              <span className="text-xl font-bold text-[#ff8c00]">
                Solutions
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Techphase Solutions is Ghana&apos;s trusted IT partner providing
              professional IT solutions, networking, CCTV installations, systems
              maintenance, and office supplies since 2014.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { icon: Facebook, href: settings.facebook || 'https://facebook.com/techphasesolutions', label: 'Facebook' },
                { icon: Twitter, href: settings.twitter || 'https://twitter.com/techphasesolutions', label: 'Twitter' },
                { icon: Linkedin, href: settings.linkedin || 'https://linkedin.com/company/techphasesolutions', label: 'LinkedIn' },
                { icon: Instagram, href: settings.instagram || 'https://instagram.com/techphasesolutions', label: 'Instagram' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#ff8c00] hover:text-white transition-all duration-200"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${settings.whatsapp || '233244201295'}?text=Hello%20Techphase%20Solutions%2C%20I%20would%20like%20to%20enquire%20about%20your%20IT%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-9 h-9 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-200"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#ff8c00] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-white/60 hover:text-[#ff8c00] text-sm transition-colors duration-200 font-medium"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="size-5 text-[#ff8c00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/60 text-sm leading-relaxed block">
                    {settings.address || '49 S.Dzagble Street, Akweteman-Achimota, Accra, Ghana'}
                  </span>
                  <span className="text-[#ff8c00] text-xs font-semibold mt-0.5 block">
                    Digital Address: {settings.digitalAddress || 'GA-302-8209'}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="size-5 text-[#ff8c00] shrink-0 mt-0.5" />
                <a href={`tel:${settings.phone?.replace(/\s/g, '') || '+233244201295'}`} className="text-white/60 hover:text-[#ff8c00] text-sm transition-colors duration-200">
                  {settings.phone || '+233 244 201 295'}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="size-5 text-[#ff8c00] shrink-0 mt-0.5" />
                <a href={`mailto:${settings.email || 'info@techphasesolutions.com'}`} className="text-white/60 hover:text-[#ff8c00] text-sm transition-colors duration-200">
                  {settings.email || 'info@techphasesolutions.com'}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="size-5 text-[#ff8c00] shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  {settings.hours || 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-white/40 text-sm text-center">
            &copy; {new Date().getFullYear()} Techphase Solutions. All rights
            reserved. Made with{' '}
            <Heart className="inline size-3 text-[#ff8c00]" /> in Ghana
          </p>
        </div>
      </div>
    </footer>
  )
}
