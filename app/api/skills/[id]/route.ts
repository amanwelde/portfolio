import { NextResponse } from 'next/server'
import { handleRouteError, parseJson, requireAdmin, requirePrisma } from '@/lib/api'
import { skillSchema } from '@/lib/validators'

type Context = { params: Promise<{ id: string }> }

export async function GET(_request: Request, context: Context) {
  try {
    const db = requirePrisma()
    const { id } = await context.params
    const skill = await db.skill.findUnique({ where: { id } })
    return skill ? NextResponse.json(skill) : NextResponse.json({ error: 'Skill not found' }, { status: 404 })
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
    const data = await parseJson(request, skillSchema)
    return NextResponse.json(
      await db.skill.update({
        where: { id },
        data: {
          name: data.name ?? '',
          percentage: data.percentage ?? 0,
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
    await db.skill.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return handleRouteError(error)
  }
}
