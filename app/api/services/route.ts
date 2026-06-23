import { NextResponse } from 'next/server'
import { handleRouteError, parseJson, requireAdmin, requirePrisma } from '@/lib/api'
import { serviceSchema } from '@/lib/validators'

export async function GET() {
  try {
    const db = requirePrisma()
    return NextResponse.json(await db.service.findMany({ orderBy: [{ order: 'asc' }, { title: 'asc' }] }))
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    const data = await parseJson(request, serviceSchema)
    return NextResponse.json(
      await db.service.create({
        data: {
          title: data.title ?? '',
          description: data.description ?? '',
          icon: data.icon ?? '',
          order: data.order ?? 0,
        },
      }),
      { status: 201 },
    )
  } catch (error) {
    return handleRouteError(error)
  }
}
