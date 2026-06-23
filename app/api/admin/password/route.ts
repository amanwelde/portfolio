import { NextResponse } from 'next/server'
import { requireAdmin, requirePrisma } from '@/lib/api'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const email = process.env.ADMIN_EMAIL ?? 'amanuealweldemariam@gmail.com'
    const adminUser = await db.adminUser.findUnique({ where: { email } })

    if (!adminUser) {
      return NextResponse.json({ error: 'Admin user not found in database' }, { status: 404 })
    }

    const isValid = await bcrypt.compare(currentPassword, adminUser.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect current password' }, { status: 401 })
    }

    const passwordHash = await bcrypt.hash(newPassword, 10)
    await db.adminUser.update({
      where: { email },
      data: { passwordHash }
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
