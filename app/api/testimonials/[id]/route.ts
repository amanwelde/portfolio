import { NextResponse } from 'next/server'
import { handleRouteError, parseJson, requireAdmin, requirePrisma } from '@/lib/api'
import { testimonialSchema } from '@/lib/validators'

type Context = { params: Promise<{ id: string }> }

export async function GET(_request: Request, context: Context) {
  try {
    const db = requirePrisma()
    const { id } = await context.params
    const testimonial = await db.testimonial.findUnique({ where: { id } })
    return testimonial ? NextResponse.json(testimonial) : NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
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
    const data = await parseJson(request, testimonialSchema)
    return NextResponse.json(
      await db.testimonial.update({
        where: { id },
        data: {
          clientName: data.clientName ?? '',
          clientPosition: data.clientPosition ?? '',
          message: data.message ?? '',
          avatar: data.avatar,
          featured: data.featured ?? false,
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
    await db.testimonial.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return handleRouteError(error)
  }
}
