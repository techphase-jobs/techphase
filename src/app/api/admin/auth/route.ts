import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Admin credentials from environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'kgozar@techphasesolutions.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'WhyMe2017!.com'

// Simple JWT-like token: base64(json) + "." + base64(secret+hmac)
function createToken(payload: object): string {
  const data = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString('base64url')
  const secret = Buffer.from(process.env.ADMIN_SECRET || 'techphase-admin-secret-key-2024').toString('base64url')
  return `${data}.${secret}`
}

function verifyToken(token: string): object | null {
  try {
    const [data] = token.split('.')
    if (!data) return null
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString())
    if (payload.exp && payload.exp < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

// Verify admin session
export async function getSession(request?: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return null
  return verifyToken(token)
}

// Middleware for protected routes
export async function requireAuth(request?: NextRequest) {
  const session = await getSession(request)
  if (!session) {
    return { error: true, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  return { error: false, session }
}

// POST /api/admin/auth/login
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = createToken({ id: 'admin', email: ADMIN_EMAIL, name: 'Admin' })

    const response = NextResponse.json({ success: true, name: 'Admin' })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

// GET /api/admin/auth/session
export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
  return NextResponse.json({ authenticated: true, ...session })
}

// DELETE /api/admin/auth/logout
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_token', '', { maxAge: 0, path: '/' })
  return response
}
