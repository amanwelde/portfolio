import crypto from 'crypto'

type CloudinaryUpload = {
  public_id: string
  secure_url: string
  bytes: number
  format?: string
  resource_type: 'image' | 'video'
}

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary environment variables are not configured')
  }

  return { cloudName, apiKey, apiSecret }
}

function sign(params: Record<string, string | number>, apiSecret: string) {
  const payload = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return crypto.createHash('sha1').update(`${payload}${apiSecret}`).digest('hex')
}

export async function uploadToCloudinary(file: File, resourceType: 'image' | 'video') {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig()
  const timestamp = Math.round(Date.now() / 1000)
  const params = { folder: 'aman-creative', timestamp }
  const formData = new FormData()

  formData.append('file', file)
  formData.append('api_key', apiKey)
  formData.append('folder', params.folder)
  formData.append('timestamp', String(timestamp))
  formData.append('signature', sign(params, apiSecret))

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error?.message ?? 'Cloudinary upload failed')
  }

  return (await response.json()) as CloudinaryUpload
}

export async function destroyCloudinaryAsset(publicId: string, resourceType: 'image' | 'video') {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig()
  const timestamp = Math.round(Date.now() / 1000)
  const params = { public_id: publicId, timestamp }
  const formData = new FormData()

  formData.append('public_id', publicId)
  formData.append('api_key', apiKey)
  formData.append('timestamp', String(timestamp))
  formData.append('signature', sign(params, apiSecret))

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error?.message ?? 'Cloudinary delete failed')
  }
}

export function cloudinaryVideoThumbnail(publicId: string) {
  const { cloudName } = getCloudinaryConfig()
  return `https://res.cloudinary.com/${cloudName}/video/upload/so_0,w_900,c_scale,q_auto/${publicId}.jpg`
}
