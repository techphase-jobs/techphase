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

  // Seed blog posts from data.ts
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

  // Seed products from data.ts
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

export function updateBlogPost(id: string, data: Partial<typeof createBlogPost extends (_: infer T) => any ? T : never>) {
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
