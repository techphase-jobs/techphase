'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { PRODUCTS, PARTNERS, STATS } from '@/lib/data'
import {
  Trophy,
  Heart,
  Briefcase,
} from 'lucide-react'

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
   STAT ICONS
   ========================================================================== */

const STAT_ICONS = [Trophy, Heart, Briefcase]

/* ==========================================================================
   PRODUCTS PAGE
   ========================================================================== */

export default function ProductsPage() {
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
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#ff8c00]/10 blur-3xl animate-float-orb" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-float-orb-delay" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionBadge>Quality IT Products</SectionBadge>

            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Products We Offer
            </h1>

            <p className="mt-4 text-white/70 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Premium IT products from world-leading manufacturers at competitive prices.
            </p>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Products Grid ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#f0f7ff' }}>
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
                Our Product Range
              </h2>
              <p className="mt-3 text-[#0a2540]/60 text-base lg:text-lg">
                Browse our comprehensive selection of IT products for your home or business needs.
              </p>
            </motion.div>
          </div>

          {/* Products grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.08, 0.4) }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(10, 37, 64, 0.1)' }}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-[#ff8c00]/20 transition-all duration-300 cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #ff8c00, #ffb347)',
                  }}
                >
                  <product.icon className="size-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#0a2540] mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-[#0a2540]/60 leading-relaxed">
                  {product.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Preferred Partners ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-sm">
              <h3 className="text-center text-xl font-semibold text-[#0a2540] mb-8">
                Our Preferred Partners
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6">
                {PARTNERS.map((partner, idx) => (
                  <motion.div
                    key={partner}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.4) }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center w-24 h-16 lg:w-28 lg:h-20 bg-gray-50 rounded-xl border border-gray-100 px-3 text-[#0a2540]/60 font-bold text-sm lg:text-base hover:border-[#ff8c00]/30 hover:bg-[#ff8c00]/5 transition-all duration-200"
                  >
                    {partner}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Stats Row ───────────────────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            {STATS.map((stat, idx) => {
              const Icon = STAT_ICONS[idx]
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-gray-100"
                >
                  {Icon && (
                    <div className="w-10 h-10 rounded-lg bg-[#ff8c00]/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="size-5 text-[#ff8c00]" />
                    </div>
                  )}
                  <p className="text-2xl lg:text-3xl font-bold text-[#ff8c00]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#0a2540]/60 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              )
            })}
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
            Need a Specific Product?
          </h2>
          <p className="text-white/70 text-base lg:text-lg mb-8 leading-relaxed">
            We source IT products from trusted manufacturers worldwide. Contact us for quotes,
            bulk orders, or product recommendations tailored to your needs.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ff8c00] hover:bg-[#ff9f33] text-white font-semibold shadow-lg shadow-[#ff8c00]/25 hover:shadow-[#ff8c00]/40 transition-all duration-200 h-12 px-8 text-base rounded-lg"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
