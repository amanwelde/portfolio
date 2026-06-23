import { NextResponse } from 'next/server'
import { handleRouteError, parseJson, requireAdmin, requirePrisma } from '@/lib/api'
import { settingsSchema } from '@/lib/validators'
const defaultHeroImage = '/media/profileImage.JPG'

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
      heroImage: data.heroImage ?? defaultHeroImage,
      aboutImage: data.aboutImage ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfqoG1fWu6o8U7iReqpeoilgQ9PNZ6uk9nc4ECTGr4rNgTZWeVimZU_4aAyeUnOfPAjdAZInc7rBQQURS16RVGKK0l0Ie2NeRTKDztPn0jsBrdIkVjtmXsEqO_NHjjY3ScicaMo-I-ZMIgOiDjVIRzxtaclPlgb-1o9s_hEBKqiKk4h79X_GGITDpVBODf-5kTjnc38UANVGBxaFJPwGK_tXydw5wECCwmx2aZLQVrBdNOUpbBpRHvhZWTOehuAM0CZoLa90C6IhTV',
      aboutText: data.aboutText ?? '',
      ownerName: data.ownerName ?? 'Aman Weldemariam',
      email: data.email ?? 'amanuealweldemariam@gmail.com',
      phone: data.phone ?? '0993103133',
      whatsapp: data.whatsapp ?? '0993103133',
      github: data.github ?? 'https://github.com/',
      linkedin: data.linkedin ?? 'https://www.linkedin.com/in/amanueal-weldemariam-b1622a329?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      instagram: data.instagram ?? 'https://www.instagram.com/aman_welde',
      tiktok: data.tiktok ?? 'https://www.tiktok.com/@amanuwelde',
      youtube: data.youtube ?? 'https://www.youtube.com/@amfame-369',
      footerText: data.footerText ?? 'Creating Stories That Inspire and Content That Performs',
      primaryColor: data.primaryColor ?? '#ffc38d',
      secondaryColor: data.secondaryColor ?? '#f89f43',
      heroCtaText: data.heroCtaText ?? null,
      heroCtaLink: data.heroCtaLink ?? null,
      heroSecondaryCtaText: data.heroSecondaryCtaText ?? null,
      heroSecondaryCtaLink: data.heroSecondaryCtaLink ?? null,
      projectsCompleted: data.projectsCompleted ?? null,
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
