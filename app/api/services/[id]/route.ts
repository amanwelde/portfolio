import { NextResponse } from 'next/server'
import { handleRouteError, parseJson, requireAdmin, requirePrisma } from '@/lib/api'
import { serviceSchema } from '@/lib/validators'

type Context = { params: Promise<{ id: string }> }

export async function GET(_request: Request, context: Context) {
  try {
    const db = requirePrisma()
    const { id } = await context.params
    const service = await db.service.findUnique({ where: { id } })
    return service ? NextResponse.json(service) : NextResponse.json({ error: 'Service not found' }, { status: 404 })
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
    const data = await parseJson(request, serviceSchema)
    return NextResponse.json(
      await db.service.update({
        where: { id },
        data: {
          title: data.title ?? '',
          description: data.description ?? '',
          icon: data.icon ?? '',
          order: data.order ?? 0,
        },
      }),
    )
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
    await db.service.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return handleRouteError(error)
  }
}
