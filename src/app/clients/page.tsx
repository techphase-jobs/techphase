'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Users, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

/* ==========================================================================
   ANIMATION VARIANTS
   ========================================================================== */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

/* ==========================================================================
   API TYPES
   ========================================================================== */

interface TestimonialItem {
  id: string
  quote: string
  client: string
  type: string
  order: number
}

interface ClientItem {
  id: string
  name: string
  logo: string
  website: string
  order: number
}

/* ==========================================================================
   TESTIMONIALS CAROUSEL
   ========================================================================== */

function TestimonialsCarousel({ testimonials }: { testimonials: TestimonialItem[] }) {
  const itemsPerPage = 3
  const totalPages = Math.max(1, Math.ceil(testimonials.length / itemsPerPage))

  const [currentPage, setCurrentPage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  const nextPage = useCallback(() => {
    setDirection(1)
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }, [totalPages])

  const prevPage = useCallback(() => {
    setDirection(-1)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }, [totalPages])

  const goToPage = useCallback(
    (index: number) => {
      setDirection(index > currentPage ? 1 : -1)
      setCurrentPage(index)
    },
    [currentPage]
  )

  // Auto-rotate every 10 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextPage, 10000)
    return () => clearInterval(timer)
  }, [isPaused, nextPage])

  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  )

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {currentTestimonials.map((testimonial, idx) => (
              <motion.div
                key={`${currentPage}-${testimonial.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff8c00]/10 flex items-center justify-center">
                    <Quote className="w-5 h-5 text-[#ff8c00]" />
                  </div>
                  <span className="text-xs font-semibold text-[#ff8c00] bg-[#ff8c00]/10 px-3 py-1 rounded-full">
                    {testimonial.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="font-semibold text-[#0a2540] text-sm">
                    {testimonial.client}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevPage}
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-[#ff8c00] hover:text-white hover:border-[#ff8c00] transition-all duration-200 text-gray-600"
        aria-label="Previous testimonials"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextPage}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-[#ff8c00] hover:text-white hover:border-[#ff8c00] transition-all duration-200 text-gray-600"
        aria-label="Next testimonials"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentPage
                ? 'w-8 h-3 bg-[#ff8c00]'
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      {/* Hint text */}
      <p className="text-center text-sm text-gray-400 mt-3">
        {isPaused ? 'Paused — hover away to resume' : 'Auto-rotating every 10 seconds'}
      </p>
    </div>
  )
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */

export default function ClientsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])
  const [clients, setClients] = useState<ClientItem[]>([])

  useEffect(() => {
    Promise.all([
      fetch('/api/public/testimonials').then((r) => r.json()),
      fetch('/api/public/clients').then((r) => r.json()),
    ])
      .then(([testimonialsData, clientsData]) => {
        if (testimonialsData.testimonials) setTestimonials(testimonialsData.testimonials)
        if (clientsData.clients) setClients(clientsData.clients)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ===== Page Header ===== */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%)',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#ff8c00]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#ff8c00]/20 text-[#ff8c00] border-[#ff8c00]/30 px-4 py-1.5 text-sm mb-6">
              Who Trusts Us
            </Badge>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
              Our{' '}
              <span className="text-[#ff8c00]">Clients</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              A proud clientele of satisfied customers across healthcare, government, and private sectors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      {testimonials.length > 0 && (
        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <Badge className="bg-[#ff8c00]/10 text-[#ff8c00] border-[#ff8c00]/20 px-4 py-1.5 text-sm mb-4">
                Client Feedback
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2540] mb-4">
                What Our Clients Say
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Hear directly from the organisations we&apos;ve had the privilege of serving.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-6xl mx-auto px-8"
            >
              <TestimonialsCarousel testimonials={testimonials} />
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== Client Names Grid ===== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <Badge className="bg-[#0a2540]/10 text-[#0a2540] border-[#0a2540]/20 px-4 py-1.5 text-sm mb-4">
              <Users className="w-3.5 h-3.5 mr-1" />
              Our Partners
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2540] mb-4">
              Trusted by Leading Organisations
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We are proud to serve a diverse portfolio of clients across multiple industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {clients.length > 0 ? clients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-50 rounded-xl p-4 lg:p-5 flex items-center gap-3 cursor-default"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0a2540]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#0a2540]" />
                </div>
                <span className="font-medium text-[#0a2540] text-sm lg:text-base truncate">
                  {client.name}
                </span>
              </motion.div>
            )) : (
              Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 lg:p-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
