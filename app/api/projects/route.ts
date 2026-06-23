import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { projectSchema } from '@/lib/validators'

export async function GET() {
  if (!prisma) return NextResponse.json([], { status: 200 })
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  if (!prisma) return NextResponse.json({ error: 'Database unavailable' }, { status: 500 })

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const parsed = projectSchema.safeParse(body)
  if (!parsed.success) {
    const err = parsed.error.flatten().formErrors.join(', ')
    return NextResponse.json({ error: err || 'Validation failed' }, { status: 400 })
  }

  const data = parsed.data

  const created = await prisma.project.create({
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

  return NextResponse.json(created, { status: 201 })
}

