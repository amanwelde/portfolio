import { NextResponse } from 'next/server'
import { handleRouteError, parseJson, requireAdmin, requirePrisma } from '@/lib/api'
import { skillSchema } from '@/lib/validators'

export async function GET() {
  try {
    const db = requirePrisma()
    return NextResponse.json(await db.skill.findMany({ orderBy: [{ order: 'asc' }, { percentage: 'desc' }] }))
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    const data = await parseJson(request, skillSchema)
    return NextResponse.json(
      await db.skill.create({
        data: {
          name: data.name ?? '',
          percentage: data.percentage ?? 0,
          order: data.order ?? 0,
        },
      }),
      { status: 201 },
    )
  } catch (error) {
    return handleRouteError(error)
  }
}
