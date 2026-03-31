'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Trophy,
  Heart,
  Briefcase,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Quote,
  Users,
  ChevronLeft,
  Sparkles,
  Zap,
} from 'lucide-react'
import {
  HERO_OFFER_ITEMS,
  STATS,
  SERVICES,
  TESTIMONIALS,
} from '@/lib/data'

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
   MAIN PAGE
   ========================================================================== */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <AboutPreview />
      <TestimonialsPreview />
      <CTASection />
    </>
  )
}

/* ==========================================================================
   HERO SECTION
   ========================================================================== */

function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const heroStats = [
    { value: STATS[0].value, label: STATS[0].label, icon: Trophy },
    { value: STATS[1].value, label: STATS[1].label, icon: Heart },
    { value: STATS[2].value, label: STATS[2].label, icon: Briefcase },
  ]

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-16 lg:pt-20"
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
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-float-orb-delay" />
      <div className="absolute bottom-1/4 left-1/2 w-80 h-80 rounded-full bg-[#ff8c00]/5 blur-3xl animate-float-orb-delay-2" />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#ff8c00] animate-pulse-dot" />
              <span className="text-white/90 text-sm font-medium">Ghana&apos;s Trusted IT Partner Since 2014</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Your One-Stop{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] to-[#ffb347]">
                IT Solutions
              </span>{' '}
              Provider in Ghana
            </h1>

            <p className="text-white/70 text-base lg:text-lg max-w-xl leading-relaxed">
              We deliver comprehensive IT solutions — from networking and cloud services to CCTV installations
              and printing — empowering businesses across Ghana with reliable technology and expert support.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white font-semibold shadow-lg shadow-[#ff8c00]/25 hover:shadow-[#ff8c00]/40 transition-all duration-200 h-12 px-8 text-base"
              >
                <Link href="/contact">
                  Get in Touch
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hover:text-white h-12 px-8 text-base transition-all duration-200"
              >
                <Link href="/services">Our Services</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#ff8c00]/20 flex items-center justify-center">
                    <stat.icon className="size-5 text-[#ff8c00]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{stat.value}</p>
                    <p className="text-white/50 text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Glass card */}
          <div className="hidden lg:block">
            <div className="animate-float-card bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 p-6 lg:p-8 shadow-2xl">
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                <Zap className="size-5 text-[#ff8c00]" />
                What We Offer
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {HERO_OFFER_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #ff8c00, #ffb347)',
                      }}
                    >
                      <item.icon className="size-5 text-white" />
                    </div>
                    <span className="text-white/90 text-sm font-medium leading-tight">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

/* ==========================================================================
   SERVICES PREVIEW
   ========================================================================== */

function ServicesPreview() {
  const previewServices = SERVICES.slice(0, 6)

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <SectionBadge>What We Do</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0a2540]">Our Services</h2>
          <p className="mt-3 text-[#0a2540]/60 text-base lg:text-lg">
            Comprehensive IT solutions to power your business growth and success.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewServices.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.06, 0.4) }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(10, 37, 64, 0.12)' }}
            >
              <Link href="/services" className="block group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-[#ff8c00]/20 transition-all duration-300 cursor-pointer">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #ff8c00, #ffb347)',
                  }}
                >
                  <service.icon className="size-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#0a2540] mb-2">{service.title}</h3>
                <p className="text-sm text-[#0a2540]/60 leading-relaxed">{service.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[#0a2540]/20 text-[#0a2540] hover:bg-[#0a2540]/5 hover:border-[#0a2540]/30 font-semibold h-12 px-8"
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   ABOUT PREVIEW
   ========================================================================== */

function AboutPreview() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about-team.jpg"
                alt="Techphase Solutions Team"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <p className="text-[#ff8c00] font-bold text-2xl">10+</p>
                <p className="text-[#0a2540]/70 text-sm font-medium">Years of Excellence</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <SectionBadge>About Techphase</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540]">Who We Are</h2>
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#ff8c00] to-[#ffb347]" />

            <p className="text-[#0a2540]/70 leading-relaxed">
              Techphase Solutions is a Ghanaian IT company dedicated to providing high-quality, reliable, and
              cost-effective information technology products and services. Established in 2014, we have built a
              strong reputation for excellence in IT solutions delivery across various sectors including
              healthcare, government, and private enterprises.
            </p>

            <p className="text-[#0a2540]/70 leading-relaxed">
              Our team of skilled professionals brings together expertise in networking, system administration,
              software development, and hardware maintenance to offer comprehensive solutions that meet the
              evolving needs of modern businesses.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center rounded-xl p-4 border border-gray-100 shadow-sm"
                  style={{ backgroundColor: '#f8fafc' }}
                >
                  <p className="text-2xl lg:text-3xl font-bold text-[#ff8c00]">{stat.value}</p>
                  <p className="text-xs text-[#0a2540]/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white font-semibold shadow-lg shadow-[#ff8c00]/25 hover:shadow-[#ff8c00]/40 transition-all duration-200 h-12 px-8"
              >
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   TESTIMONIALS PREVIEW (Carousel)
   ========================================================================== */

function TestimonialsPreview() {
  const ITEMS_PER_PAGE = 3
  const [currentPage, setCurrentPage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalPages = Math.ceil(TESTIMONIALS.length / ITEMS_PER_PAGE)
  const startIndex = currentPage * ITEMS_PER_PAGE
  const visibleTestimonials = TESTIMONIALS.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const goTo = useCallback(
    (page: number) => setCurrentPage((p) => ((page % totalPages) + totalPages) % totalPages),
    [totalPages]
  )

  const goNext = useCallback(() => goTo(currentPage + 1), [currentPage, goTo])

  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(goNext, 10000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [goNext, isPaused])

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  }

  const [direction, setDirection] = useState(1)

  const paginate = (newDir: number, page: number) => {
    setDirection(newDir)
    goTo(page)
  }

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <SectionBadge>Client Feedback</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0a2540]">What Our Clients Say</h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden min-h-[280px] md:min-h-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="grid md:grid-cols-3 gap-6"
              >
                {visibleTestimonials.map((item) => (
                  <div
                    key={item.client}
                    className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <Quote className="size-8 text-[#ff8c00]/30 mb-4" />
                    <p className="text-[#0a2540]/70 text-sm leading-relaxed mb-6 italic">{item.quote}</p>
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff8c00] to-[#ffb347] flex items-center justify-center shrink-0">
                          <Users className="size-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0a2540] text-sm">{item.client}</p>
                          <p className="text-xs text-[#ff8c00] font-medium">{item.type}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => paginate(-1, currentPage - 1)}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#0a2540]/60 hover:bg-[#ff8c00] hover:text-white hover:border-[#ff8c00] transition-all duration-200 cursor-pointer"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i > currentPage ? 1 : -1, i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentPage
                      ? 'w-8 h-3 bg-[#ff8c00]'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial group ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1, currentPage + 1)}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#0a2540]/60 hover:bg-[#ff8c00] hover:text-white hover:border-[#ff8c00] transition-all duration-200 cursor-pointer"
              aria-label="Next testimonials"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <p className="text-center text-xs text-[#0a2540]/40 mt-4">
            {isPaused ? 'Paused — move mouse away to resume' : 'Auto-rotating every 10 seconds'}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   CTA SECTION
   ========================================================================== */

function CTASection() {
  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%)',
      }}
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#ff8c00]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
            <Sparkles className="size-4 text-[#ff8c00]" />
            <span className="text-white/90 text-sm font-medium">Let&apos;s Work Together</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Transform{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] to-[#ffb347]">
              Your Business?
            </span>
          </h2>

          <p className="mt-6 text-white/60 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Get started today with Techphase Solutions. Whether you need IT support, networking solutions,
            CCTV installations, or cloud services — we&apos;re here to help your business thrive.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Button
              asChild
              size="lg"
              className="bg-[#ff8c00] hover:bg-[#ff9f33] text-white font-semibold shadow-lg shadow-[#ff8c00]/25 hover:shadow-[#ff8c00]/40 transition-all duration-200 h-12 px-8 text-base"
            >
              <Link href="/contact">
                <MessageCircle className="size-4" />
                Contact Us
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:text-white h-12 px-8 text-base transition-all duration-200"
            >
              <Link href="/services">View Our Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
