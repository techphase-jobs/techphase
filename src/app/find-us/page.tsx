'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  MessageCircle,
  ExternalLink,
  Building2,
  LocateFixed,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/data'

/* ==========================================================================
   FIND US PAGE
   ========================================================================== */

export default function FindUsPage() {
  const mapSrc =
    'https://maps.google.com/maps?q=GA-302-8209+Akweteman-Achimota+Okaikoi+North+Accra+Ghana&t=&z=16&ie=UTF8&iwloc=&output=embed'

  const directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=GA-302-8209+Akweteman-Achimota+Okaikoi+North+Accra+Ghana'

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ===== Page Header ===== */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%)',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#ff8c00]/10 rounded-full blur-3xl" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#ff8c00]/20 text-[#ff8c00] border-[#ff8c00]/30 px-4 py-1.5 text-sm mb-6">
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              Our Location
            </Badge>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
              Find{' '}
              <span className="text-[#ff8c00]">Us</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Visit us at Akweteman-Achimota, Okaikoi North, Accra.
              <br className="hidden sm:block" />
              {' '}Digital Address:{' '}
              <span className="text-[#ff8c00] font-semibold">
                {CONTACT_INFO.digitalAddress}
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Map Section ===== */}
      <section className="relative -mt-8 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl overflow-hidden shadow-2xl shadow-[#0a2540]/15 border border-gray-200"
        >
          <iframe
            src={mapSrc}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TechPhase Solutions Location - GA-302-8209"
            className="w-full"
          />
        </motion.div>

        {/* Directions button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center"
        >
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white font-semibold shadow-lg shadow-[#ff8c00]/25 hover:shadow-[#ff8c00]/40 transition-all duration-200 h-12 px-8 text-base"
            >
              <Navigation className="size-4 mr-2" />
              Get Directions
              <ExternalLink className="size-3.5 ml-2 opacity-70" />
            </Button>
          </a>
        </motion.div>
      </section>

      {/* ===== Location Details Cards ===== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff8c00] to-[#ffb347] flex items-center justify-center mb-5 shadow-sm shadow-[#ff8c00]/20">
                <Building2 className="size-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#0a2540] mb-3">
                Our Office
              </h3>
              <p className="text-[#0a2540]/70 text-sm leading-relaxed">
                {CONTACT_INFO.location}
              </p>
            </motion.div>

            {/* Digital Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff8c00] to-[#ffb347] flex items-center justify-center mb-5 shadow-sm shadow-[#ff8c00]/20">
                <LocateFixed className="size-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#0a2540] mb-3">
                Digital Address
              </h3>
              <p className="text-[#ff8c00] font-bold text-2xl mb-1">
                {CONTACT_INFO.digitalAddress}
              </p>
              <p className="text-[#0a2540]/60 text-sm">
                {CONTACT_INFO.region}
              </p>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff8c00] to-[#ffb347] flex items-center justify-center mb-5 shadow-sm shadow-[#ff8c00]/20">
                <MessageCircle className="size-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#0a2540] mb-3">
                Reach Out
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-[#ff8c00] shrink-0" />
                  <span className="text-sm text-[#0a2540]/70">
                    {CONTACT_INFO.phone}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-[#ff8c00] shrink-0" />
                  <span className="text-sm text-[#0a2540]/70">
                    {CONTACT_INFO.email}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="size-4 text-[#ff8c00] shrink-0" />
                  <span className="text-sm text-[#0a2540]/70">
                    {CONTACT_INFO.hours}
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%)',
          }}
        />
        <div className="pointer-events-none absolute -top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#ff8c00]/10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Planning to Visit?
            </h2>
            <p className="text-white/70 text-base lg:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              We&apos;re open Monday to Saturday. Drop by during working hours or
              contact us to schedule an appointment. We look forward to seeing you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white font-semibold shadow-lg shadow-[#ff8c00]/25 hover:shadow-[#ff8c00]/40 transition-all duration-200 h-12 px-8 text-base"
                >
                  <MessageCircle className="size-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white h-12 px-8 text-base transition-all duration-200"
                >
                  <Navigation className="size-4 mr-2" />
                  Get Directions
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
