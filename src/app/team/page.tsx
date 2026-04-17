'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import {
  Linkedin,
  Twitter,
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  phone: string
  email: string
  socialLinks: Record<string, string>
  order: number
}

/* ==========================================================================
   SECTION BADGE COMPONENT
   ========================================================================== */

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="border-[#ff8c00]/30 bg-[#ff8c00]/10 text-[#ff8c00] px-4 py-1.5 text-sm font-medium rounded-full"
    >
      {children}
    </Badge>
  )
}

/* ==========================================================================
   TEAM PAGE
   ========================================================================== */

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([])

  useEffect(() => {
    fetch('/api/public/team')
      .then((r) => r.json())
      .then((data) => {
        if (data.members) setTeam(data.members)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24"
        style={{
          background: 'linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%)',
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-[#ff8c00]/10 blur-3xl animate-float-orb" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-float-orb-delay" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionBadge>The People</SectionBadge>

            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Our Expert Team
            </h1>

            <p className="mt-4 text-white/70 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Meet the talented professionals behind Techphase Solutions.
            </p>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Team Grid ───────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540]">
                Dedicated Professionals
              </h2>
              <p className="mt-3 text-[#0a2540]/60 text-base lg:text-lg">
                Our team brings together diverse expertise in networking, system administration,
                software development, and hardware maintenance.
              </p>
            </motion.div>
          </div>

          {/* Team cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {team.length > 0 ? team.map((member, idx) => {
              const initials = member.name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 20px 40px rgba(10, 37, 64, 0.12)',
                  }}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-[#ff8c00]/20 transition-all duration-300 text-center"
                >
                  {/* Initials avatar */}
                  <div
                    className="relative w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center border-3 border-[#ff8c00]/20 group-hover:border-[#ff8c00]/40 transition-colors duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #ff8c00, #ffb347)',
                    }}
                  >
                    <span className="text-white text-2xl font-bold">
                      {initials}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-[#0a2540] text-sm lg:text-base">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-xs lg:text-sm text-[#ff8c00] font-medium mt-1">
                    {member.role}
                  </p>

                  {/* Social buttons */}
                  <div className="flex justify-center gap-2 mt-4">
                    <button
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#ff8c00] hover:text-white text-[#0a2540]/50 transition-all duration-200 cursor-pointer"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="size-3.5" />
                    </button>
                    <button
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#ff8c00] hover:text-white text-[#0a2540]/50 transition-all duration-200 cursor-pointer"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="size-3.5" />
                    </button>
                  </div>
                </motion.div>
              )
            }) : (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded mb-2 animate-pulse w-3/4 mx-auto" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2 mx-auto" />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Team Values Section ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540] mb-4">
              What Drives Our Team
            </h2>
            <p className="text-[#0a2540]/60 text-base lg:text-lg leading-relaxed mb-12">
              Every member of Techphase Solutions shares a commitment to delivering excellence
              and building lasting relationships with our clients.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Expertise',
                description:
                  'Deep technical knowledge across networking, cloud, security, and hardware maintenance.',
              },
              {
                title: 'Reliability',
                description:
                  'Consistent delivery on promises, with a track record of 10+ years of dependable service.',
              },
              {
                title: 'Innovation',
                description:
                  'Staying ahead of technology trends to bring the best solutions to our clients.',
              },
              {
                title: 'Customer Focus',
                description:
                  'Every decision we make is guided by what is best for our clients and their success.',
              },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-[#ff8c00]/20 transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #ff8c00, #ffb347)',
                  }}
                >
                  <span className="text-white font-bold text-sm">{idx + 1}</span>
                </div>
                <h3 className="font-semibold text-[#0a2540] mb-2">{value.title}</h3>
                <p className="text-sm text-[#0a2540]/60 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-20"
        style={{
          background: 'linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Want to Work With Us?
          </h2>
          <p className="text-white/70 text-base lg:text-lg mb-8 leading-relaxed">
            Whether you need IT support, are looking for a product, or want to explore partnership
            opportunities — our team is ready to help.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ff8c00] hover:bg-[#ff9f33] text-white font-semibold shadow-lg shadow-[#ff8c00]/25 hover:shadow-[#ff8c00]/40 transition-all duration-200 h-12 px-8 text-base rounded-lg"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
