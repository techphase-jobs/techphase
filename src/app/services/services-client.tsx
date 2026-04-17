'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  Globe, Mail, Cloud, Settings, Network, Wifi, Wrench, Video, Hammer, Shield, Printer, Monitor,
  Package, Code, Box, Cable, Camera,
} from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const iconMap: Record<string, LucideIcon> = {
  Globe, Mail, Cloud, Settings, Network, Wifi, Wrench, Video, Hammer, Shield, Printer, Monitor, Package, Code, Box, Cable, Camera,
}

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Settings
}

interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  order: number
}

const cardFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: Math.min(i * 0.06, 0.4),
      ease: 'easeOut',
    },
  }),
}

export default function ServicesClient({ services }: { services: ServiceItem[] }) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ============ PAGE HEADER ============ */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{
          background:
            'linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%)',
        }}
      >
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#ff8c00]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-block rounded-full bg-[#ff8c00]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff8c00]"
          >
            What We Do
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            Our Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base text-white/70 md:text-lg"
          >
            Comprehensive IT solutions to power your business growth and success.
          </motion.p>
        </div>
      </section>

      {/* ============ SERVICES GRID ============ */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, idx) => {
            const Icon = getIcon(service.icon)
            return (
              <motion.div
                key={service.id}
                custom={idx}
                variants={cardFadeUp}
                whileHover={{
                  y: -6,
                  boxShadow:
                    '0 20px 40px -12px rgba(10, 37, 64, 0.12)',
                }}
                className="group cursor-default rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-colors hover:border-[#ff8c00]/20"
              >
                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff8c00] to-[#ffb347] shadow-sm shadow-[#ff8c00]/20">
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold text-[#0a2540]">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[#0a2540]/60">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ============ WHY CHOOSE US SECTION ============ */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%)',
          }}
        />
        <div className="pointer-events-none absolute -bottom-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#ff8c00]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
              Why Choose Techphase?
            </h2>
            <p className="mx-auto max-w-xl text-sm text-white/70 md:text-base">
              We combine deep technical expertise with a genuine commitment to
              your success.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Expert Team',
                desc: 'Certified professionals with years of hands-on experience across all IT domains.',
              },
              {
                title: 'Trusted Brands',
                desc: 'Authorized partners with HP, Dell, Cisco, Hikvision, and other global leaders.',
              },
              {
                title: 'Fast Response',
                desc: 'Dedicated support team ensuring quick turnaround times and minimal downtime.',
              },
              {
                title: 'Affordable Pricing',
                desc: 'Competitive rates without compromising quality — great value for every budget.',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                <h3 className="mb-2 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-gradient-to-r from-[#ff8c00] to-[#ffb347] p-10 text-center shadow-xl shadow-[#ff8c00]/20 md:p-16"
        >
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Need a Custom IT Solution?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm text-white/90 md:text-base">
            Every business is unique. Let our experts design a tailored IT
            strategy that fits your specific needs and budget.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button
                size="lg"
                className="rounded-full bg-white font-semibold text-[#0a2540] shadow-lg hover:bg-white/90"
              >
                Request a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-white/40 font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                Learn About Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
