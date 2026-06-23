import { cookies } from 'next/headers'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? ''
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''

export function verifyAdmin(email: string, password: string) {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return false
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD
}

export async function createAdminSession() {
  const cookieStore = await cookies()
  const sessionValue = 'admin-authenticated'
  cookieStore.set('admin_session', sessionValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_session')?.value === 'admin-authenticated'
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete({ name: 'admin_session', path: '/' })
}
