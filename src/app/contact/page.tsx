'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

/* ==========================================================================
   CONTACT INFO ITEMS
   ========================================================================== */

const infoItems = [
  {
    icon: MapPin,
    label: 'Location',
    value: CONTACT_INFO.location,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: CONTACT_INFO.phone,
  },
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_INFO.email,
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: CONTACT_INFO.hours,
  },
]

/* ==========================================================================
   SOCIAL LINKS
   ========================================================================== */

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
]

/* ==========================================================================
   GOOGLE MAP CONFIG
   ========================================================================== */

const mapSrc =
  'https://maps.google.com/maps?q=Brown+Hostel+Akweteman+Accra+Ghana&t=&z=17&ie=UTF8&iwloc=&output=embed'

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errorMsg) setErrorMsg('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => setIsSubmitted(false), 6000)
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
    } finally {
      setIsSending(false)
    }
  }

  const inputClasses =
    'w-full bg-white/10 border border-white/10 text-white placeholder:text-white/30 rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#ff8c00]/50 focus:ring-1 focus:ring-[#ff8c00]/50'

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
              Reach Out
            </Badge>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
              Let&apos;s Talk{' '}
              <span className="text-[#ff8c00]">Business</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Have a project in mind or need IT support? We&apos;d love to hear from you. Reach out and
              let&apos;s explore how Techphase Solutions can power your business forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Contact Content ===== */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* ----- Left: Contact Information ----- */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2540] mb-4">
                Get In Touch
              </h2>
              <p className="text-gray-500 mb-10 leading-relaxed">
                Visit our office, give us a call, or send us an email. We&apos;re always ready to help
                with your IT needs.
              </p>

              {/* Info items */}
              <div className="space-y-6 mb-12">
                {infoItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#0a2540]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#0a2540]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium mb-1">
                          {item.label}
                        </p>
                        <p className="text-[#0a2540] font-medium text-sm lg:text-base">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Social media */}
              <div>
                <p className="text-sm font-semibold text-[#0a2540] mb-4">
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#ff8c00] hover:text-white hover:border-[#ff8c00] transition-all duration-200"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* ----- Right: Contact Form ----- */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="rounded-2xl border border-white/10 p-6 lg:p-8"
                style={{
                  background: 'linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%)',
                }}
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 lg:p-8">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Send Us a Message
                  </h3>
                  <p className="text-white/50 text-sm mb-8">
                    Fill out the form below and we&apos;ll get back to you shortly.
                  </p>

                  {/* Success message */}
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-xl px-5 py-4"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <p className="text-green-300 text-sm font-medium">
                        Message sent successfully! We&apos;ll get back to you soon.
                      </p>
                    </motion.div>
                  )}

                  {/* Error message */}
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 flex items-center gap-3 bg-red-500/20 border border-red-500/30 rounded-xl px-5 py-4"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-300 text-sm font-medium">
                        {errorMsg}
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white/70 mb-2"
                      >
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>

                    {/* Email & Phone row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-white/70 mb-2"
                        >
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-white/70 mb-2"
                        >
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+233 XXX XXX XXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-white/70 mb-2"
                      >
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="How can we help?"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-white/70 mb-2"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us about your project or requirements..."
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSending}
                      className="w-full h-12 bg-[#ff8c00] hover:bg-[#e07d00] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-base transition-all duration-200"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Find Us / Google Map Section ===== */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0a2540 0%, #0e3460 50%, #14527a 100%)',
          }}
        />
        <div className="pointer-events-none absolute -top-10 right-0 h-64 w-64 rounded-full bg-[#ff8c00]/10 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Find Us on the Map
            </h2>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10"
          >
            <iframe
              src={mapSrc}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Techphase Solutions Location"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
