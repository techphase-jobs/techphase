'use client'

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
import { NAV_LINKS, CONTACT_INFO } from '@/lib/data'

export default function Footer() {
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
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Instagram, href: '#', label: 'Instagram' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#ff8c00] hover:text-white transition-all duration-200"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
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
                    {CONTACT_INFO.location}
                  </span>
                  <span className="text-[#ff8c00] text-xs font-semibold mt-0.5 block">
                    Digital Address: {CONTACT_INFO.digitalAddress}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="size-5 text-[#ff8c00] shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  {CONTACT_INFO.phone}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="size-5 text-[#ff8c00] shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  {CONTACT_INFO.email}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="size-5 text-[#ff8c00] shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  {CONTACT_INFO.hours}
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
