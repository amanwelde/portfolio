import { NextResponse } from 'next/server'
import { handleRouteError, parseJson, requireAdmin, requirePrisma } from '@/lib/api'
import { destroyCloudinaryAsset } from '@/lib/cloudinary-rest'
import { mediaSchema } from '@/lib/validators'

type Context = { params: Promise<{ id: string }> }

export async function GET(_request: Request, context: Context) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    const { id } = await context.params
    const asset = await db.mediaAsset.findUnique({ where: { id } })
    return asset ? NextResponse.json(asset) : NextResponse.json({ error: 'Media asset not found' }, { status: 404 })
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
    const data = await parseJson(request, mediaSchema)
    return NextResponse.json(
      await db.mediaAsset.update({
        where: { id },
        data: {
          type: data.type,
          url: data.url,
          publicId: data.publicId,
          thumbnailUrl: data.thumbnailUrl,
          previewUrl: data.previewUrl,
          format: data.format,
          size: data.size,
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
    const asset = await db.mediaAsset.findUnique({ where: { id } })
    if (!asset) {
      return NextResponse.json({ error: 'Media asset not found' }, { status: 404 })
    }

    await destroyCloudinaryAsset(asset.publicId, asset.type as 'image' | 'video')
    await db.mediaAsset.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return handleRouteError(error)
  }
}
