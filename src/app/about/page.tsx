'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Target, Eye, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface AboutData {
  id?: string
  title?: string
  subtitle?: string
  description?: string
  mission?: string
  vision?: string
  values?: string
  history?: string
  image?: string
}

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null)

  useEffect(() => {
    fetch('/api/public/about')
      .then((r) => r.json())
      .then((data) => {
        if (data.about) setAbout(data.about)
      })
      .catch(() => {})
  }, [])

  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '20+', label: 'Happy Clients' },
    { value: '500+', label: 'Projects Done' },
  ]

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
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#ff8c00]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-block rounded-full bg-[#ff8c00]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff8c00]"
          >
            About Techphase
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            Ghana&apos;s Premier IT Solutions Company
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base text-white/70 md:text-lg"
          >
            Trusted by businesses across Ghana for over a decade, delivering
            reliable IT solutions that drive growth and innovation.
          </motion.p>
        </div>
      </section>

      {/* ============ MAIN CONTENT — TWO COLUMNS ============ */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left Column — Company Story */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0}>
              <h2 className="mb-1 text-2xl font-bold text-[#0a2540] md:text-3xl">
                10+ Years of Excellence
              </h2>
              {/* Orange underline bar */}
              <div className="mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-[#ff8c00] to-[#ffb347]" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={1}
              className="mb-5 text-base leading-relaxed text-[#0a2540]/70"
            >
              {about?.description || 'Founded in 2014, Techphase Solutions has grown from a small IT startup into one of Ghana\'s most trusted technology partners. Headquartered in Accra, we serve a diverse portfolio of clients ranging from government hospitals and corporate enterprises to growing SMEs — providing end-to-end IT solutions that empower businesses to operate efficiently and securely.'}
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mb-8 text-base leading-relaxed text-[#0a2540]/70"
            >
              {about?.history || 'Our team of experienced professionals brings deep expertise in networking, cloud infrastructure, cybersecurity, hardware procurement, and systems maintenance. We take pride in building long-lasting relationships with our clients by delivering consistent quality, transparent communication, and unwavering commitment to excellence in every project we undertake.'}
            </motion.p>

            {/* Key highlights */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="space-y-3"
            >
              {[
                'Certified IT professionals with industry expertise',
                'Partnerships with global brands — HP, Dell, Cisco, Hikvision & more',
                'Dedicated after-sales support and maintenance',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8c00]" />
                  <span className="text-sm text-[#0a2540]/80">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-8">
              <Link href="/services">
                <Button className="rounded-full bg-gradient-to-r from-[#ff8c00] to-[#ffb347] px-6 font-semibold text-white shadow-lg shadow-[#ff8c00]/25 hover:shadow-[#ff8c00]/40">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column — Mission & Vision Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6"
            variants={staggerContainer}
          >
            {/* Mission Card */}
            <motion.div variants={fadeUp} custom={0}>
              <Card className="rounded-2xl border-0 bg-white p-6 shadow-md shadow-[#0a2540]/5">
                <CardContent className="p-0">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff8c00] to-[#ffb347]">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[#0a2540]">
                    Our Mission
                  </h3>
                  <p className="text-sm leading-relaxed text-[#0a2540]/70">
                    {about?.mission || 'To deliver exceptional value to our clients by providing innovative, reliable, and cost-effective IT solutions that empower businesses to achieve their goals. We are committed to building lasting partnerships founded on trust, quality service, and measurable results.'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision Card */}
            <motion.div variants={fadeUp} custom={1}>
              <Card className="rounded-2xl border-0 bg-white p-6 shadow-md shadow-[#0a2540]/5">
                <CardContent className="p-0">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff8c00] to-[#ffb347]">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[#0a2540]">
                    Our Vision
                  </h3>
                  <p className="text-sm leading-relaxed text-[#0a2540]/70">
                    {about?.vision || 'To become the leading IT solutions provider in West Africa, recognized for our technical expertise, customer-centric approach, and unwavering commitment to helping businesses thrive in the digital age. We aspire to set the standard for IT excellence across the region.'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section className="relative overflow-hidden py-16 md:py-20">
        {/* Full-width dark background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%)',
          }}
        />
        <div className="pointer-events-none absolute -top-10 right-0 h-64 w-64 rounded-full bg-[#ff8c00]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
            variants={staggerContainer}
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={idx}
                className="group rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                <span className="block text-4xl font-extrabold text-[#ff8c00] md:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm font-medium text-white/80">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
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
            Ready to Transform Your Business?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm text-white/90 md:text-base">
            Let&apos;s discuss how Techphase Solutions can help you leverage
            technology for growth, efficiency, and competitive advantage.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button
                size="lg"
                className="rounded-full bg-white font-semibold text-[#0a2540] shadow-lg hover:bg-white/90"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-white/40 font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                View Services
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
