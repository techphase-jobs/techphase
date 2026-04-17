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
  AlertTriangle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

/* ==========================================================================
   API TYPE
   ========================================================================== */

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

/* ==========================================================================
   GOOGLE MAP CONFIG
   ========================================================================== */

const mapSrc =
  'https://maps.google.com/maps?q=Brown+Hostel+Akweteman+Accra+Ghana&t=&z=17&ie=UTF8&iwloc=&output=embed'

/* ==========================================================================
   MAIN CLIENT
   ========================================================================== */

export default function ContactClient({ settings }: { settings: Settings | null }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [warningMsg, setWarningMsg] = useState('')
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
    setWarningMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setIsSubmitted(true)
        if (data.emailWarning) {
          setWarningMsg('Your message was saved, but email notifications could not be sent. Our team will still review it in the admin panel.')
        }
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => { setIsSubmitted(false); setWarningMsg('') }, 8000)
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
    } finally {
      setIsSending(false)
    }
  }

  const s = settings

  const infoItems = [
    {
      icon: MapPin,
      label: 'Location',
      value: s?.address || '49 S.Dzagble Street, Akweteman-Achimota, Accra, Ghana',
      href: 'https://maps.google.com/?q=49+S.Dzagble+Street+Akweteman+Accra+Ghana',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: s?.phone || '+233 244 201 295',
      href: `tel:${s?.phone?.replace(/\s/g, '') || '+233244201295'}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: s?.email || 'info@techphasesolutions.com',
      href: `mailto:${s?.email || 'info@techphasesolutions.com'}`,
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: s?.hours || 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM',
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: s?.facebook || 'https://facebook.com/techphasesolutions', label: 'Facebook' },
    { icon: Twitter, href: s?.twitter || 'https://twitter.com/techphasesolutions', label: 'Twitter' },
    { icon: Linkedin, href: s?.linkedin || 'https://linkedin.com/company/techphasesolutions', label: 'LinkedIn' },
    { icon: Instagram, href: s?.instagram || 'https://instagram.com/techphasesolutions', label: 'Instagram' },
  ]

  const WHATSAPP_LINK = `https://wa.me/${s?.whatsapp || '233244201295'}?text=Hello%20Techphase%20Solutions%2C%20I%20would%20like%20to%20enquire%20about%20your%20IT%20services.`

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
                  const content = (
                    <div className="flex items-start gap-4">
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
                    </div>
                  )

                  if (item.href) {
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="block hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        {content}
                      </motion.a>
                    )
                  }

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {content}
                    </motion.div>
                  )
                })}
              </div>

              {/* Social media */}
              <div>
                <p className="text-sm font-semibold text-[#0a2540] mb-4">
                  Connect With Us
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#ff8c00] hover:text-white hover:border-[#ff8c00] transition-all duration-200"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                  {/* WhatsApp button */}
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
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

                  {/* Warning message (email failed but form saved) */}
                  {warningMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 flex items-start gap-3 bg-yellow-500/20 border border-yellow-500/30 rounded-xl px-5 py-4"
                    >
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-yellow-300 text-sm font-medium">
                        {warningMsg}
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
              src={s?.googleMapUrl || mapSrc}
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
