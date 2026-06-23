import { NextResponse } from 'next/server'
import { handleRouteError, requireAdmin, requirePrisma } from '@/lib/api'
import { messageSchema } from '@/lib/validators'

export async function GET() {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(messages)
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: Request) {
  try {
    const db = requirePrisma()
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const parsed = messageSchema.safeParse(body)
    if (!parsed.success) {
      const flattened = parsed.error.flatten()
      const message =
        flattened.formErrors.join(', ') ||
        Object.values(flattened.fieldErrors).flat().filter(Boolean).join(', ') ||
        'Invalid message payload'
      return NextResponse.json({ error: message }, { status: 400 })
    }

    const created = await db.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message,
        status: parsed.data.status ?? 'Unread',
      },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    return handleRouteError(error)
  }
}
