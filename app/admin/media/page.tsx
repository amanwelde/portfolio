import { MediaLibrary } from '@/components/admin/MediaLibrary'
import { AdminHeader } from '@/components/admin/AdminShell'
import { prisma } from '@/lib/prisma'

export default async function MediaAdminPage() {
  const assets = prisma ? await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } }) : []

  return (
    <>
      <AdminHeader title="Media Library" description="Upload images and videos to Cloudinary, preview assets, search the library, and delete unused media." />
      <MediaLibrary initialAssets={assets} />
    </>
  )
}
