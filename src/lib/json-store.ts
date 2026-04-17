// Simple file-based database for Vercel serverless
// Stores data in JSON files under /tmp which persists within a deployment
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const DATA_DIR = process.env.NODE_ENV === 'production' ? '/tmp/techphase-data' : join(process.cwd(), 'db')

function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readData(collection: string): any[] {
  ensureDir()
  const filePath = join(DATA_DIR, `${collection}.json`)
  if (!existsSync(filePath)) return []
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'))
  } catch {
    return []
  }
}

function writeData(collection: string, data: any[]) {
  ensureDir()
  const filePath = join(DATA_DIR, `${collection}.json`)
  writeFileSync(filePath, JSON.stringify(data, null, 2))
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

// ==================== SEED DATA ====================

let seeded = false

export function seedIfEmpty() {
  if (seeded) return
  seeded = true

  // Seed blog posts
  const existingPosts = readData('blog_posts')
  if (existingPosts.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { BLOG_POSTS } = require('@/lib/data')
    const blogSeed = (BLOG_POSTS || []).map((post: any, i: number) => ({
      id: `seed-blog-${i}`,
      slug: post.slug,
      title: post.title,
      category: post.category || 'IT Solutions',
      content: post.content || '',
      author: post.author || 'Techphase Team',
      featuredImage: post.featuredImage || '',
      published: true,
      createdAt: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
      updatedAt: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    }))
    writeData('blog_posts', blogSeed)
  }

  // Seed products
  const existingProducts = readData('products')
  if (existingProducts.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PRODUCTS } = require('@/lib/data')
    const productSeed = (PRODUCTS || []).map((p: any, i: number) => ({
      id: `seed-product-${i}`,
      name: p.title,
      category: 'General',
      description: p.description || '',
      price: 0,
      currency: 'GHS',
      image: p.image || '',
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
    writeData('products', productSeed)
  }

  // Seed services
  const existingServices = readData('services')
  if (existingServices.length === 0) {
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
    writeData('services', services.map((s, i) => ({ ...s, id: `seed-service-${i}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })))
  }

  // Seed team members
  const existingTeam = readData('team_members')
  if (existingTeam.length === 0) {
    const team = [
      { name: 'Robert Kwashie Gozar', role: 'Chief Executive Officer', image: '/images/team-ceo.png', order: 1 },
      { name: 'Mawuli Kofi', role: 'Accounts Manager', image: '/images/team-mawuli.png', order: 2 },
      { name: 'Felix Kofi Gozar', role: 'Technical Support Manager', image: '/images/team-felix.png', order: 3 },
      { name: 'Hansen Neequaye', role: 'Technical Support', image: '/images/team-hansen.png', order: 4 },
      { name: 'Celestine Bortey', role: 'Technical Support', image: '/images/team-celestine.png', order: 5 },
    ]
    writeData('team_members', team.map((t, i) => ({ ...t, id: `seed-team-${i}`, bio: '', phone: '', email: '', socialLinks: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })))
  }

  // Seed clients
  const existingClients = readData('clients')
  if (existingClients.length === 0) {
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
    writeData('clients', clients.map((c, i) => ({ ...c, id: `seed-client-${i}`, logo: '', website: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })))
  }

  // Seed testimonials
  const existingTestimonials = readData('testimonials')
  if (existingTestimonials.length === 0) {
    const testimonials = [
      { quote: 'Techphase Solutions has been our trusted IT partner for years. Their reliability and professionalism in maintaining our hospital IT systems have been exceptional. We highly recommend them to any organization seeking quality IT solutions.', client: 'BOMA Government Hospital', type: 'Healthcare Client', order: 1 },
      { quote: 'The team at Techphase is professional, responsive, and always goes above and beyond. Their networking solutions have significantly improved our operational efficiency. Working with them has been a great experience.', client: 'MINSOL Limited', type: 'Corporate Client', order: 2 },
      { quote: "We've worked with Techphase for IT equipment and maintenance services for several years now. Their commitment to quality and customer satisfaction is unmatched. They are our go-to IT solutions provider.", client: 'WACO Ghana Limited', type: 'Long-term Client', order: 3 },
      { quote: 'Techphase installed our entire CCTV security system across three branch locations. The installation was seamless, the quality of equipment is outstanding, and their after-sales support has been truly reliable. Highly recommended!', client: 'Tepa Government Hospital', type: 'Healthcare Client', order: 4 },
      { quote: 'As a growing enterprise, we needed a partner who could scale our IT infrastructure as we expanded. Techphase Solutions delivered beyond expectations with their cloud services and networking expertise. They understand business needs.', client: 'AMANTRA Ghana Limited', type: 'Enterprise Client', order: 5 },
      { quote: 'From procurement to deployment and ongoing maintenance, Techphase has been exceptional. Their team is knowledgeable, punctual, and always available when we need them. A truly dependable IT partner.', client: 'MROCHEKROM Limited', type: 'Corporate Client', order: 6 },
    ]
    writeData('testimonials', testimonials.map((t, i) => ({ ...t, id: `seed-testimonial-${i}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })))
  }

  // Seed about content
  const existingAbout = readData('about')
  if (existingAbout.length === 0) {
    const about = [{
      id: 'about-main',
      title: 'Techphase Solutions',
      subtitle: 'Your Trusted IT Partner in Ghana',
      description: 'Techphase Solutions is a Ghanaian IT company dedicated to providing high-quality, reliable, and cost-effective information technology products and services. Established in 2014, we have built a strong reputation for excellence in IT solutions delivery across various sectors including healthcare, government, and private enterprises.',
      mission: 'To empower businesses across Ghana with innovative, reliable, and cost-effective IT solutions that drive growth, efficiency, and digital transformation.',
      vision: 'To be the leading IT solutions provider in West Africa, recognized for excellence in service delivery, innovation, and customer satisfaction.',
      values: 'Professionalism, Integrity, Innovation, Customer Satisfaction, Reliability',
      history: 'Founded in 2014 by Robert Kwashie Gozar, Techphase Solutions started with a simple mission: to bridge the technology gap for businesses in Ghana. Over the years, we have grown from a small IT shop to a comprehensive solutions provider, serving healthcare facilities, government agencies, corporate organizations, and SMEs across the country. Our team of skilled professionals brings together expertise in networking, system administration, software development, and hardware maintenance to offer comprehensive solutions that meet the evolving needs of modern businesses.',
      image: '/images/about-team.jpg',
    }]
    writeData('about', about)
  }

  // Seed hero content
  const existingHero = readData('hero')
  if (existingHero.length === 0) {
    const hero = [{
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
      stats: [
        { value: '10+', label: 'Years Experience' },
        { value: '20+', label: 'Happy Clients' },
        { value: '500+', label: 'Projects Done' },
      ],
    }]
    writeData('hero', hero)
  }

  // Seed site settings
  const existingSettings = readData('settings')
  if (existingSettings.length === 0) {
    const settings = [{
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
    }]
    writeData('settings', settings)
  }
}

// ==================== BLOG POSTS ====================

export function getBlogPosts(where?: Record<string, unknown>) {
  let posts = readData('blog_posts')
  if (where?.published === true) posts = posts.filter((p: any) => p.published)
  if (where?.published === false) posts = posts.filter((p: any) => !p.published)
  return posts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getBlogPost(id: string) {
  const posts = readData('blog_posts')
  return posts.find((p: any) => p.id === id) || null
}

export function createBlogPost(data: { title: string; category?: string; content?: string; author?: string; featuredImage?: string; published?: boolean }) {
  const posts = readData('blog_posts')
  const slug = data.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
  const post = {
    id: generateId(),
    slug,
    category: data.category || 'IT Solutions',
    content: data.content || '',
    author: data.author || 'Techphase Team',
    featuredImage: data.featuredImage || '',
    published: data.published || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data,
  }
  posts.push(post)
  writeData('blog_posts', posts)
  return post
}

export function updateBlogPost(id: string, data: Record<string, unknown>) {
  const posts = readData('blog_posts')
  const index = posts.findIndex((p: any) => p.id === id)
  if (index === -1) return null
  posts[index] = { ...posts[index], ...data, updatedAt: new Date().toISOString() }
  writeData('blog_posts', posts)
  return posts[index]
}

export function deleteBlogPost(id: string) {
  const posts = readData('blog_posts')
  const filtered = posts.filter((p: any) => p.id !== id)
  if (filtered.length === posts.length) return false
  writeData('blog_posts', filtered)
  return true
}

// ==================== PRODUCTS ====================

export function getProducts(where?: Record<string, unknown>) {
  let products = readData('products')
  if (where?.category) products = products.filter((p: any) => p.category === where.category)
  return products.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getProduct(id: string) {
  const products = readData('products')
  return products.find((p: any) => p.id === id) || null
}

export function createProduct(data: { name: string; category?: string; description?: string; price?: number; currency?: string; image?: string; inStock?: boolean }) {
  const products = readData('products')
  const product = {
    id: generateId(),
    category: data.category || 'General',
    description: data.description || '',
    price: data.price || 0,
    currency: data.currency || 'GHS',
    image: data.image || '',
    inStock: data.inStock !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data,
  }
  products.push(product)
  writeData('products', products)
  return product
}

export function updateProduct(id: string, data: Record<string, unknown>) {
  const products = readData('products')
  const index = products.findIndex((p: any) => p.id === id)
  if (index === -1) return null
  products[index] = { ...products[index], ...data, updatedAt: new Date().toISOString() }
  writeData('products', products)
  return products[index]
}

export function deleteProduct(id: string) {
  const products = readData('products')
  const filtered = products.filter((p: any) => p.id !== id)
  if (filtered.length === products.length) return false
  writeData('products', filtered)
  return true
}

// ==================== CONTACT SUBMISSIONS ====================

export function getSubmissions(where?: Record<string, unknown>) {
  let submissions = readData('submissions')
  if (where?.status) submissions = submissions.filter((s: any) => s.status === where.status)
  return submissions.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function createSubmission(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  ip?: string
  userAgent?: string
  browser?: string
}) {
  const submissions = readData('submissions')
  const submission = {
    id: generateId(),
    status: 'new',
    createdAt: new Date().toISOString(),
    ip: data.ip || 'Unknown',
    userAgent: data.userAgent || '',
    browser: data.browser || 'Unknown',
    phone: data.phone || '',
    ...data,
  }
  submissions.push(submission)
  writeData('submissions', submissions)
  return submission
}

export function updateSubmission(id: string, data: { status: string }) {
  const submissions = readData('submissions')
  const index = submissions.findIndex((s: any) => s.id === id)
  if (index === -1) return null
  submissions[index] = { ...submissions[index], ...data }
  writeData('submissions', submissions)
  return submissions[index]
}

export function deleteSubmission(id: string) {
  const submissions = readData('submissions')
  const filtered = submissions.filter((s: any) => s.id !== id)
  if (filtered.length === submissions.length) return false
  writeData('submissions', filtered)
  return true
}

// ==================== SERVICES ====================

export function getServices(where?: Record<string, unknown>) {
  let services = readData('services')
  return services.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
}

export function getService(id: string) {
  const services = readData('services')
  return services.find((s: any) => s.id === id) || null
}

export function createService(data: { title: string; description: string; icon?: string; order?: number }) {
  const services = readData('services')
  const service = {
    id: generateId(),
    icon: data.icon || 'Settings',
    order: data.order || services.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data,
  }
  services.push(service)
  writeData('services', services)
  return service
}

export function updateService(id: string, data: Record<string, unknown>) {
  const services = readData('services')
  const index = services.findIndex((s: any) => s.id === id)
  if (index === -1) return null
  services[index] = { ...services[index], ...data, updatedAt: new Date().toISOString() }
  writeData('services', services)
  return services[index]
}

export function deleteService(id: string) {
  const services = readData('services')
  const filtered = services.filter((s: any) => s.id !== id)
  if (filtered.length === services.length) return false
  writeData('services', filtered)
  return true
}

// ==================== TEAM MEMBERS ====================

export function getTeamMembers() {
  return readData('team_members').sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
}

export function getTeamMember(id: string) {
  const members = readData('team_members')
  return members.find((m: any) => m.id === id) || null
}

export function createTeamMember(data: { name: string; role: string; image?: string; bio?: string; phone?: string; email?: string; socialLinks?: Record<string, string>; order?: number }) {
  const members = readData('team_members')
  const member = {
    id: generateId(),
    image: data.image || '',
    bio: data.bio || '',
    phone: data.phone || '',
    email: data.email || '',
    socialLinks: data.socialLinks || {},
    order: data.order || members.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data,
  }
  members.push(member)
  writeData('team_members', members)
  return member
}

export function updateTeamMember(id: string, data: Record<string, unknown>) {
  const members = readData('team_members')
  const index = members.findIndex((m: any) => m.id === id)
  if (index === -1) return null
  members[index] = { ...members[index], ...data, updatedAt: new Date().toISOString() }
  writeData('team_members', members)
  return members[index]
}

export function deleteTeamMember(id: string) {
  const members = readData('team_members')
  const filtered = members.filter((m: any) => m.id !== id)
  if (filtered.length === members.length) return false
  writeData('team_members', filtered)
  return true
}

// ==================== CLIENTS ====================

export function getClients() {
  return readData('clients').sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
}

export function getClient(id: string) {
  const clients = readData('clients')
  return clients.find((c: any) => c.id === id) || null
}

export function createClient(data: { name: string; logo?: string; website?: string; order?: number }) {
  const clients = readData('clients')
  const client = {
    id: generateId(),
    logo: data.logo || '',
    website: data.website || '',
    order: data.order || clients.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data,
  }
  clients.push(client)
  writeData('clients', clients)
  return client
}

export function updateClient(id: string, data: Record<string, unknown>) {
  const clients = readData('clients')
  const index = clients.findIndex((c: any) => c.id === id)
  if (index === -1) return null
  clients[index] = { ...clients[index], ...data, updatedAt: new Date().toISOString() }
  writeData('clients', clients)
  return clients[index]
}

export function deleteClient(id: string) {
  const clients = readData('clients')
  const filtered = clients.filter((c: any) => c.id !== id)
  if (filtered.length === clients.length) return false
  writeData('clients', filtered)
  return true
}

// ==================== TESTIMONIALS ====================

export function getTestimonials() {
  return readData('testimonials').sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
}

export function getTestimonial(id: string) {
  const items = readData('testimonials')
  return items.find((t: any) => t.id === id) || null
}

export function createTestimonial(data: { quote: string; client: string; type?: string; order?: number }) {
  const items = readData('testimonials')
  const item = {
    id: generateId(),
    type: data.type || 'Client',
    order: data.order || items.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data,
  }
  items.push(item)
  writeData('testimonials', items)
  return item
}

export function updateTestimonial(id: string, data: Record<string, unknown>) {
  const items = readData('testimonials')
  const index = items.findIndex((t: any) => t.id === id)
  if (index === -1) return null
  items[index] = { ...items[index], ...data, updatedAt: new Date().toISOString() }
  writeData('testimonials', items)
  return items[index]
}

export function deleteTestimonial(id: string) {
  const items = readData('testimonials')
  const filtered = items.filter((t: any) => t.id !== id)
  if (filtered.length === items.length) return false
  writeData('testimonials', filtered)
  return true
}

// ==================== ABOUT (SINGLE DOCUMENT) ====================

export function getAbout() {
  const items = readData('about')
  return items[0] || null
}

export function updateAbout(data: Record<string, unknown>) {
  let items = readData('about')
  if (items.length === 0) {
    const newItem = { id: 'about-main', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...data }
    items = [newItem]
    writeData('about', items)
    return newItem
  }
  items[0] = { ...items[0], ...data, updatedAt: new Date().toISOString() }
  writeData('about', items)
  return items[0]
}

// ==================== HERO (SINGLE DOCUMENT) ====================

export function getHero() {
  const items = readData('hero')
  return items[0] || null
}

export function updateHero(data: Record<string, unknown>) {
  let items = readData('hero')
  if (items.length === 0) {
    const newItem = { id: 'hero-main', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...data }
    items = [newItem]
    writeData('hero', items)
    return newItem
  }
  items[0] = { ...items[0], ...data, updatedAt: new Date().toISOString() }
  writeData('hero', items)
  return items[0]
}

// ==================== SITE SETTINGS (SINGLE DOCUMENT) ====================

export function getSettings() {
  const items = readData('settings')
  return items[0] || null
}

export function updateSettings(data: Record<string, unknown>) {
  let items = readData('settings')
  if (items.length === 0) {
    const newItem = { id: 'settings-main', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...data }
    items = [newItem]
    writeData('settings', items)
    return newItem
  }
  items[0] = { ...items[0], ...data, updatedAt: new Date().toISOString() }
  writeData('settings', items)
  return items[0]
}
