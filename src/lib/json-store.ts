// Prisma-based data layer — replaces file-based JSON storage
import { db } from '@/lib/db'

// ==================== HELPERS ====================

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

function parseJsonField<T = any>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) ?? fallback
  } catch {
    return fallback
  }
}

function stringifyJsonField(value: unknown): string {
  if (typeof value === 'string') return value
  return JSON.stringify(value ?? {})
}

// ==================== SEED DATA ====================

let seeded = false

export async function seedIfEmpty() {
  if (seeded) return
  seeded = true

  // Seed blog posts
  const postCount = await db.blogPost.count()
  if (postCount === 0) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { BLOG_POSTS } = require('@/lib/data')
    const posts = BLOG_POSTS || []
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      await db.blogPost.create({
        data: {
          id: `seed-blog-${i}`,
          slug: post.slug,
          title: post.title,
          category: post.category || 'IT Solutions',
          content: post.content || '',
          author: post.author || 'Techphase Team',
          featuredImage: post.featuredImage || '',
          published: true,
          createdAt: post.date ? new Date(post.date) : new Date(),
          updatedAt: post.date ? new Date(post.date) : new Date(),
        },
      })
    }
  }

  // Seed products
  const productCount = await db.product.count()
  if (productCount === 0) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PRODUCTS } = require('@/lib/data')
    const products = PRODUCTS || []
    for (let i = 0; i < products.length; i++) {
      const p = products[i]
      await db.product.create({
        data: {
          id: `seed-product-${i}`,
          name: p.title,
          category: 'General',
          description: p.description || '',
          price: 0,
          currency: 'GHS',
          image: p.image || '',
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    }
  }

  // Seed services
  const serviceCount = await db.service.count()
  if (serviceCount === 0) {
    const services = [
      { title: 'Web Development', description: 'Professional website design and development for businesses — from landing pages to full web applications tailored to your needs.', icon: 'Globe', order: 1 },
      { title: 'Professional Email', description: 'Professional business email setup, configuration, and management — including domain-based email hosting, migrations, and ongoing support.', icon: 'Mail', order: 2 },
      { title: 'Cloud Services', description: 'Cloud infrastructure setup, migration, and management to keep your business data secure, accessible, and always available.', icon: 'Cloud', order: 3 },
      { title: 'System Administration', description: 'Expert management and administration of servers, networks, and IT infrastructure to ensure optimal uptime and performance.', icon: 'Settings', order: 4 },
      { title: 'Wide Area Networking', description: 'Professional installation and maintenance of Wide Area Networks for businesses of all sizes across Ghana.', icon: 'Network', order: 5 },
      { title: 'Local Area Networking', description: 'We plan, design, and maintain Local Area Networks to improve your business efficiency and connectivity.', icon: 'Wifi', order: 6 },
      { title: 'Systems Maintenance', description: 'Regular preventive and corrective maintenance to keep your IT systems running at peak performance always.', icon: 'Wrench', order: 7 },
      { title: 'CCTV Installations', description: 'Professional CCTV installation and maintenance for enhanced security of your premises and assets.', icon: 'Video', order: 8 },
      { title: 'Repairs & Servicing', description: 'Expert repairs and servicing of computers, Fax Machines, Printers, UPS, plotters and electronic equipment.', icon: 'Hammer', order: 9 },
      { title: 'Electric Fence Installation', description: 'Professional installation and commissioning of electric fences for enhanced perimeter security.', icon: 'Shield', order: 10 },
      { title: 'Printing Services', description: 'All printing works including banners, stickers, books, forms, calendars, invoices, and more.', icon: 'Printer', order: 11 },
    ]
    for (let i = 0; i < services.length; i++) {
      const s = services[i]
      await db.service.create({
        data: {
          id: `seed-service-${i}`,
          title: s.title,
          description: s.description,
          icon: s.icon,
          order: s.order,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    }
  }

  // Seed team members
  const teamCount = await db.teamMember.count()
  if (teamCount === 0) {
    const team = [
      { name: 'Robert Kwashie Gozar', role: 'Chief Executive Officer', image: '/images/team-ceo.png', order: 1 },
      { name: 'Mawuli Kofi', role: 'Accounts Manager', image: '/images/team-mawuli.png', order: 2 },
      { name: 'Felix Kofi Gozar', role: 'Technical Support Manager', image: '/images/team-felix.png', order: 3 },
      { name: 'Hansen Neequaye', role: 'Technical Support', image: '/images/team-hansen.png', order: 4 },
      { name: 'Celestine Bortey', role: 'Technical Support', image: '/images/team-celestine.png', order: 5 },
    ]
    for (let i = 0; i < team.length; i++) {
      const t = team[i]
      await db.teamMember.create({
        data: {
          id: `seed-team-${i}`,
          name: t.name,
          role: t.role,
          image: t.image,
          bio: '',
          phone: '',
          email: '',
          socialLinks: '{}',
          order: t.order,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    }
  }

  // Seed clients
  const clientCount = await db.client.count()
  if (clientCount === 0) {
    const clients = [
      { name: 'BOMA Government Hospital', order: 1 },
      { name: 'Tepa Government Hospital', order: 2 },
      { name: 'MINSOL Limited', order: 3 },
      { name: 'WACO Ghana Limited', order: 4 },
      { name: 'AMANTRA Ghana Limited', order: 5 },
      { name: 'MROCHEKROM Limited', order: 6 },
      { name: 'ALLADI Limited', order: 7 },
      { name: 'InkIt Ghana', order: 8 },
      { name: 'ITING Computers', order: 9 },
      { name: 'Audancy Limited', order: 10 },
      { name: 'ZIBA ESTR', order: 11 },
    ]
    for (let i = 0; i < clients.length; i++) {
      const c = clients[i]
      await db.client.create({
        data: {
          id: `seed-client-${i}`,
          name: c.name,
          logo: '',
          website: '',
          order: c.order,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    }
  }

  // Seed testimonials
  const testimonialCount = await db.testimonial.count()
  if (testimonialCount === 0) {
    const testimonials = [
      { quote: 'Techphase Solutions has been our trusted IT partner for years. Their reliability and professionalism in maintaining our hospital IT systems have been exceptional. We highly recommend them to any organization seeking quality IT solutions.', client: 'BOMA Government Hospital', type: 'Healthcare Client', order: 1 },
      { quote: 'The team at Techphase is professional, responsive, and always goes above and beyond. Their networking solutions have significantly improved our operational efficiency. Working with them has been a great experience.', client: 'MINSOL Limited', type: 'Corporate Client', order: 2 },
      { quote: "We've worked with Techphase for IT equipment and maintenance services for several years now. Their commitment to quality and customer satisfaction is unmatched. They are our go-to IT solutions provider.", client: 'WACO Ghana Limited', type: 'Long-term Client', order: 3 },
      { quote: 'Techphase installed our entire CCTV security system across three branch locations. The installation was seamless, the quality of equipment is outstanding, and their after-sales support has been truly reliable. Highly recommended!', client: 'Tepa Government Hospital', type: 'Healthcare Client', order: 4 },
      { quote: 'As a growing enterprise, we needed a partner who could scale our IT infrastructure as we expanded. Techphase Solutions delivered beyond expectations with their cloud services and networking expertise. They understand business needs.', client: 'AMANTRA Ghana Limited', type: 'Enterprise Client', order: 5 },
      { quote: 'From procurement to deployment and ongoing maintenance, Techphase has been exceptional. Their team is knowledgeable, punctual, and always available when we need them. A truly dependable IT partner.', client: 'MROCHEKROM Limited', type: 'Corporate Client', order: 6 },
    ]
    for (let i = 0; i < testimonials.length; i++) {
      const t = testimonials[i]
      await db.testimonial.create({
        data: {
          id: `seed-testimonial-${i}`,
          quote: t.quote,
          client: t.client,
          type: t.type,
          order: t.order,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    }
  }

  // Seed about content
  const aboutCount = await db.about.count()
  if (aboutCount === 0) {
    await db.about.create({
      data: {
        id: 'about-main',
        title: 'Techphase Solutions',
        subtitle: 'Your Trusted IT Partner in Ghana',
        description: 'Techphase Solutions is a Ghanaian IT company dedicated to providing high-quality, reliable, and cost-effective information technology products and services. Established in 2014, we have built a strong reputation for excellence in IT solutions delivery across various sectors including healthcare, government, and private enterprises.',
        mission: 'To empower businesses across Ghana with innovative, reliable, and cost-effective IT solutions that drive growth, efficiency, and digital transformation.',
        vision: 'To be the leading IT solutions provider in West Africa, recognized for excellence in service delivery, innovation, and customer satisfaction.',
        values: 'Professionalism, Integrity, Innovation, Customer Satisfaction, Reliability',
        history: 'Founded in 2014 by Robert Kwashie Gozar, Techphase Solutions started with a simple mission: to bridge the technology gap for businesses in Ghana. Over the years, we have grown from a small IT shop to a comprehensive solutions provider, serving healthcare facilities, government agencies, corporate organizations, and SMEs across the country. Our team of skilled professionals brings together expertise in networking, system administration, software development, and hardware maintenance to offer comprehensive solutions that meet the evolving needs of modern businesses.',
        image: '/images/about-team.jpg',
      },
    })
  }

  // Seed hero content
  const heroCount = await db.hero.count()
  if (heroCount === 0) {
    await db.hero.create({
      data: {
        id: 'hero-main',
        badge: "Ghana's Trusted IT Partner Since 2014",
        title: 'Your One-Stop',
        titleHighlight: 'IT Solutions',
        titleSuffix: 'Provider in Ghana',
        description: 'We deliver comprehensive IT solutions — from networking and cloud services to CCTV installations and printing — empowering businesses across Ghana with reliable technology and expert support.',
        buttonText: 'Get in Touch',
        buttonLink: '/contact',
        secondaryButtonText: 'Our Services',
        secondaryButtonLink: '/services',
        stats: JSON.stringify([
          { value: '10+', label: 'Years Experience' },
          { value: '20+', label: 'Happy Clients' },
          { value: '500+', label: 'Projects Done' },
        ]),
      },
    })
  }

  // Seed site settings
  const settingsCount = await db.siteSettings.count()
  if (settingsCount === 0) {
    await db.siteSettings.create({
      data: {
        id: 'settings-main',
        companyName: 'Techphase Solutions',
        phone: '+233 244 201 295',
        whatsapp: '233244201295',
        email: 'info@techphasesolutions.com',
        address: '49 S.Dzagble Street, Akweteman-Achimota, Accra, Ghana',
        digitalAddress: 'GA-302-8209',
        region: 'Okaikoi North, Accra',
        hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM',
        facebook: 'https://facebook.com/techphasesolutions',
        twitter: 'https://twitter.com/techphase_gh',
        linkedin: 'https://linkedin.com/company/techphase-solutions',
        instagram: 'https://instagram.com/techphasesolutions',
        googleMapUrl: '',
      },
    })
  }
}

// ==================== BLOG POSTS ====================

export async function getBlogPosts(where?: Record<string, unknown>) {
  const prismaWhere: any = {}
  if (where?.published === true) prismaWhere.published = true
  if (where?.published === false) prismaWhere.published = false

  return db.blogPost.findMany({
    where: Object.keys(prismaWhere).length > 0 ? prismaWhere : undefined,
    orderBy: { createdAt: 'desc' },
  })
}

export async function getBlogPost(id: string) {
  return db.blogPost.findUnique({ where: { id } }) ?? null
}

export async function createBlogPost(data: { title: string; category?: string; content?: string; author?: string; featuredImage?: string; published?: boolean }) {
  const slug = generateSlug(data.title)
  return db.blogPost.create({
    data: {
      slug,
      title: data.title,
      category: data.category || 'IT Solutions',
      content: data.content || '',
      author: data.author || 'Techphase Team',
      featuredImage: data.featuredImage || '',
      published: data.published || false,
    },
  })
}

export async function updateBlogPost(id: string, data: Record<string, unknown>) {
  try {
    return await db.blogPost.update({
      where: { id },
      data,
    })
  } catch {
    return null
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await db.blogPost.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}

// ==================== PRODUCTS ====================

export async function getProducts(where?: Record<string, unknown>) {
  const prismaWhere: any = {}
  if (where?.category) prismaWhere.category = where.category as string

  return db.product.findMany({
    where: Object.keys(prismaWhere).length > 0 ? prismaWhere : undefined,
    orderBy: { createdAt: 'desc' },
  })
}

export async function getProduct(id: string) {
  return db.product.findUnique({ where: { id } }) ?? null
}

export async function createProduct(data: { name: string; category?: string; description?: string; price?: number; currency?: string; image?: string; inStock?: boolean }) {
  return db.product.create({
    data: {
      name: data.name,
      category: data.category || 'General',
      description: data.description || '',
      price: data.price || 0,
      currency: data.currency || 'GHS',
      image: data.image || '',
      inStock: data.inStock !== false,
    },
  })
}

export async function updateProduct(id: string, data: Record<string, unknown>) {
  try {
    return await db.product.update({
      where: { id },
      data,
    })
  } catch {
    return null
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.product.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}

// ==================== CONTACT SUBMISSIONS ====================

export async function getSubmissions(where?: Record<string, unknown>) {
  const prismaWhere: any = {}
  if (where?.status) prismaWhere.status = where.status as string

  return db.contactSubmission.findMany({
    where: Object.keys(prismaWhere).length > 0 ? prismaWhere : undefined,
    orderBy: { createdAt: 'desc' },
  })
}

export async function createSubmission(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  ip?: string
  userAgent?: string
  browser?: string
}) {
  return db.contactSubmission.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject,
      message: data.message,
      status: 'new',
      ip: data.ip || 'Unknown',
      userAgent: data.userAgent || '',
      browser: data.browser || 'Unknown',
    },
  })
}

export async function updateSubmission(id: string, data: { status: string }) {
  try {
    return await db.contactSubmission.update({
      where: { id },
      data,
    })
  } catch {
    return null
  }
}

export async function deleteSubmission(id: string) {
  try {
    await db.contactSubmission.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}

// ==================== SERVICES ====================

export async function getServices(where?: Record<string, unknown>) {
  return db.service.findMany({
    orderBy: { order: 'asc' },
  })
}

export async function getService(id: string) {
  return db.service.findUnique({ where: { id } }) ?? null
}

export async function createService(data: { title: string; description: string; icon?: string; order?: number }) {
  const count = await db.service.count()
  return db.service.create({
    data: {
      title: data.title,
      description: data.description,
      icon: data.icon || 'Settings',
      order: data.order || count + 1,
    },
  })
}

export async function updateService(id: string, data: Record<string, unknown>) {
  try {
    return await db.service.update({
      where: { id },
      data,
    })
  } catch {
    return null
  }
}

export async function deleteService(id: string) {
  try {
    await db.service.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}

// ==================== TEAM MEMBERS ====================

export async function getTeamMembers() {
  const members = await db.teamMember.findMany({
    orderBy: { order: 'asc' },
  })
  return members.map(m => ({
    ...m,
    socialLinks: parseJsonField(m.socialLinks, {}),
  }))
}

export async function getTeamMember(id: string) {
  const member = await db.teamMember.findUnique({ where: { id } })
  if (!member) return null
  return {
    ...member,
    socialLinks: parseJsonField(member.socialLinks, {}),
  }
}

export async function createTeamMember(data: { name: string; role: string; image?: string; bio?: string; phone?: string; email?: string; socialLinks?: Record<string, string>; order?: number }) {
  const count = await db.teamMember.count()
  const member = await db.teamMember.create({
    data: {
      name: data.name,
      role: data.role,
      image: data.image || '',
      bio: data.bio || '',
      phone: data.phone || '',
      email: data.email || '',
      socialLinks: stringifyJsonField(data.socialLinks),
      order: data.order || count + 1,
    },
  })
  return {
    ...member,
    socialLinks: parseJsonField(member.socialLinks, {}),
  }
}

export async function updateTeamMember(id: string, data: Record<string, unknown>) {
  try {
    const updateData: Record<string, unknown> = { ...data }
    if (data.socialLinks !== undefined) {
      updateData.socialLinks = stringifyJsonField(data.socialLinks)
    }
    const member = await db.teamMember.update({
      where: { id },
      data: updateData,
    })
    return {
      ...member,
      socialLinks: parseJsonField(member.socialLinks, {}),
    }
  } catch {
    return null
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await db.teamMember.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}

// ==================== CLIENTS ====================

export async function getClients() {
  return db.client.findMany({
    orderBy: { order: 'asc' },
  })
}

export async function getClient(id: string) {
  return db.client.findUnique({ where: { id } }) ?? null
}

export async function createClient(data: { name: string; logo?: string; website?: string; order?: number }) {
  const count = await db.client.count()
  return db.client.create({
    data: {
      name: data.name,
      logo: data.logo || '',
      website: data.website || '',
      order: data.order || count + 1,
    },
  })
}

export async function updateClient(id: string, data: Record<string, unknown>) {
  try {
    return await db.client.update({
      where: { id },
      data,
    })
  } catch {
    return null
  }
}

export async function deleteClient(id: string) {
  try {
    await db.client.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}

// ==================== TESTIMONIALS ====================

export async function getTestimonials() {
  return db.testimonial.findMany({
    orderBy: { order: 'asc' },
  })
}

export async function getTestimonial(id: string) {
  return db.testimonial.findUnique({ where: { id } }) ?? null
}

export async function createTestimonial(data: { quote: string; client: string; type?: string; order?: number }) {
  const count = await db.testimonial.count()
  return db.testimonial.create({
    data: {
      quote: data.quote,
      client: data.client,
      type: data.type || 'Client',
      order: data.order || count + 1,
    },
  })
}

export async function updateTestimonial(id: string, data: Record<string, unknown>) {
  try {
    return await db.testimonial.update({
      where: { id },
      data,
    })
  } catch {
    return null
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await db.testimonial.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}

// ==================== ABOUT (SINGLE DOCUMENT) ====================

export async function getAbout() {
  return db.about.findFirst() ?? null
}

export async function updateAbout(data: Record<string, unknown>) {
  const existing = await db.about.findFirst()
  if (!existing) {
    return db.about.create({
      data: {
        id: 'about-main',
        ...data,
      },
    })
  }
  return db.about.update({
    where: { id: existing.id },
    data,
  })
}

// ==================== HERO (SINGLE DOCUMENT) ====================

export async function getHero() {
  const hero = await db.hero.findFirst()
  if (!hero) return null
  return {
    ...hero,
    stats: parseJsonField(hero.stats, []),
  }
}

export async function updateHero(data: Record<string, unknown>) {
  const existing = await db.hero.findFirst()
  const updateData: Record<string, unknown> = { ...data }
  if (data.stats !== undefined) {
    updateData.stats = stringifyJsonField(data.stats)
  }
  if (!existing) {
    const hero = await db.hero.create({
      data: {
        id: 'hero-main',
        ...updateData,
      },
    })
    return {
      ...hero,
      stats: parseJsonField(hero.stats, []),
    }
  }
  const hero = await db.hero.update({
    where: { id: existing.id },
    data: updateData,
  })
  return {
    ...hero,
    stats: parseJsonField(hero.stats, []),
  }
}

// ==================== SITE SETTINGS (SINGLE DOCUMENT) ====================

export async function getSettings() {
  return db.siteSettings.findFirst() ?? null
}

export async function updateSettings(data: Record<string, unknown>) {
  const existing = await db.siteSettings.findFirst()
  if (!existing) {
    return db.siteSettings.create({
      data: {
        id: 'settings-main',
        ...data,
      },
    })
  }
  return db.siteSettings.update({
    where: { id: existing.id },
    data,
  })
}
