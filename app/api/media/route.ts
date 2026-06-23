import { NextResponse } from 'next/server'
import { handleRouteError, parseJson, requireAdmin, requirePrisma } from '@/lib/api'
import { cloudinaryVideoThumbnail, uploadToCloudinary } from '@/lib/cloudinary-rest'
import { mediaSchema } from '@/lib/validators'

export async function GET(request: Request) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    const query = new URL(request.url).searchParams.get('q')?.trim()
    const assets = await db.mediaAsset.findMany({
      where: query
        ? {
            OR: [
              { publicId: { contains: query, mode: 'insensitive' } },
              { type: { contains: query, mode: 'insensitive' } },
              { format: { contains: query, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(assets)
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  try {
    const db = requirePrisma()
    const contentType = request.headers.get('content-type') ?? ''

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('file')
      if (!(file instanceof File)) {
        return NextResponse.json({ error: 'File is required' }, { status: 400 })
      }

      const resourceType = file.type.startsWith('video/') ? 'video' : 'image'
      const upload = await uploadToCloudinary(file, resourceType)
      const asset = await db.mediaAsset.create({
        data: {
          type: resourceType,
          url: upload.secure_url,
          publicId: upload.public_id,
          thumbnailUrl: resourceType === 'video' ? cloudinaryVideoThumbnail(upload.public_id) : upload.secure_url,
          previewUrl: upload.secure_url,
          format: upload.format,
          size: upload.bytes,
        },
      })
      return NextResponse.json(asset, { status: 201 })
    }

    const data = await parseJson(request, mediaSchema)
    return NextResponse.json(
      await db.mediaAsset.create({
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
      { status: 201 },
    )
  } catch (error) {
    return handleRouteError(error)
  }
}
