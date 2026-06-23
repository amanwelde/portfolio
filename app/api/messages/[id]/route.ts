import { NextResponse } from 'next/server'
import { handleRouteError, parseJson, requireAdmin, requirePrisma } from '@/lib/api'
import { messageSchema } from '@/lib/validators'

type Context = { params: Promise<{ id: string }> }

export async function GET(_request: Request, context: Context) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    const { id } = await context.params
    const message = await db.contactMessage.findUnique({ where: { id } })
    return message ? NextResponse.json(message) : NextResponse.json({ error: 'Message not found' }, { status: 404 })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function PUT(request: Request, context: Context) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    const { id } = await context.params
    const data = await parseJson(request, messageSchema)
    return NextResponse.json(await db.contactMessage.update({ where: { id }, data }))
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function DELETE(_request: Request, context: Context) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    const { id } = await context.params
    await db.contactMessage.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return handleRouteError(error)
  }
}
