import { NextResponse } from 'next/server'
import { handleRouteError, parseJson, requireAdmin, requirePrisma } from '@/lib/api'
import { settingsSchema } from '@/lib/validators'

export async function GET() {
  try {
    const db = requirePrisma()
    return NextResponse.json(await db.siteSettings.findFirst())
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    const data = await parseJson(request, settingsSchema)
    const settingsData = {
      brandName: data.brandName ?? 'Aman Creative',
      tagline: data.tagline ?? 'Creating Stories That Inspire and Content That Performs',
      heroTitle: data.heroTitle ?? 'Digital Marketer & Creative Video Storyteller',
      heroSubtitle: data.heroSubtitle ?? '',
      heroImage: data.heroImage,
      aboutText: data.aboutText ?? '',
      ownerName: data.ownerName ?? 'Aman Weldemariam',
      email: data.email ?? 'hello@amancreative.com',
      phone: data.phone ?? '+251900000000',
      whatsapp: data.whatsapp,
      github: data.github ?? '',
      linkedin: data.linkedin ?? '',
      instagram: data.instagram ?? '',
      tiktok: data.tiktok,
      youtube: data.youtube,
      footerText: data.footerText ?? 'Creating Stories That Inspire and Content That Performs',
      primaryColor: data.primaryColor ?? '#ffc38d',
      secondaryColor: data.secondaryColor ?? '#f89f43',
    }
    const existing = await db.siteSettings.findFirst()
    const settings = existing
      ? await db.siteSettings.update({ where: { id: existing.id }, data: settingsData })
      : await db.siteSettings.create({ data: settingsData })
    return NextResponse.json(settings, { status: existing ? 200 : 201 })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function PUT(request: Request) {
  return POST(request)
}

export async function DELETE() {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    await db.siteSettings.deleteMany()
    return NextResponse.json({ ok: true })
  } catch (error) {
    return handleRouteError(error)
  }
}
