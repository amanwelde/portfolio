import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { projectSchema } from '@/lib/validators'

type Context = { params: Promise<{ id: string }> }

export async function GET(_request: Request, context: Context) {
  if (!prisma) return NextResponse.json({ error: 'Database unavailable' }, { status: 500 })
  const { id } = await context.params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(request: Request, context: Context) {
  if (!prisma) return NextResponse.json({ error: 'Database unavailable' }, { status: 500 })
  const { id } = await context.params
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const parsed = projectSchema.safeParse(body)
  if (!parsed.success) {
    const err = parsed.error.flatten().formErrors.join(', ')
    return NextResponse.json({ error: err || 'Validation failed' }, { status: 400 })
  }

  const data = parsed.data
  const updated = await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      category: data.category,
      tags: data.tags ?? [],
      thumbnailUrl: data.thumbnailUrl ?? data.thumbnail ?? '',
      videoUrl: data.videoUrl ?? null,
      cloudinaryPublicId: data.cloudinaryPublicId ?? data.cloudinaryId ?? null,
      duration: data.duration ?? null,
      featured: data.featured ?? false,
      order: data.order ?? 0,
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, context: Context) {
  if (!prisma) return NextResponse.json({ error: 'Database unavailable' }, { status: 500 })
  const { id } = await context.params
  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ success: true })
}

