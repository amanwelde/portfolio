import { NextResponse } from 'next/server'
import { handleRouteError, parseJson, requireAdmin, requirePrisma } from '@/lib/api'
import { testimonialSchema } from '@/lib/validators'

export async function GET() {
  try {
    const db = requirePrisma()
    return NextResponse.json(await db.testimonial.findMany({ orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }] }))
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    const data = await parseJson(request, testimonialSchema)
    return NextResponse.json(
      await db.testimonial.create({
        data: {
          clientName: data.clientName ?? '',
          clientPosition: data.clientPosition ?? '',
          message: data.message ?? '',
          avatar: data.avatar,
          featured: data.featured ?? false,
        },
      }),
      { status: 201 },
    )
  } catch (error) {
    return handleRouteError(error)
  }
}
