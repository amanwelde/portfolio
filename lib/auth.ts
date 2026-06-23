import { cookies } from 'next/headers'

import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export async function verifyAdmin(email: string, password: string) {
  try {
    const adminUser = await prisma.adminUser.findUnique({ where: { email } })
    if (!adminUser) return false
    return bcrypt.compare(password, adminUser.passwordHash)
  } catch (error) {
    console.error('Error verifying admin:', error)
    return false
  }
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
