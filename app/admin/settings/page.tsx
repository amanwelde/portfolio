import { SettingsForm } from '@/components/admin/SettingsForm'
import { AdminHeader } from '@/components/admin/AdminShell'
import { prisma } from '@/lib/prisma'

export default async function SettingsAdminPage() {
  const settings = prisma ? await prisma.siteSettings.findFirst() : null

  return (
    <>
      <AdminHeader title="Settings" description="Update brand, hero, about, footer, and contact information consumed by public components." />
      <SettingsForm settings={settings} />
    </>
  )
}
