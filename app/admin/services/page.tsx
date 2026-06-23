import { AdminCrud } from '@/components/admin/AdminCrud'
import { AdminHeader } from '@/components/admin/AdminShell'
import { prisma } from '@/lib/prisma'

export default async function ServicesAdminPage() {
  const services = prisma ? await prisma.service.findMany({ orderBy: [{ order: 'asc' }, { title: 'asc' }] }) : []

  return (
    <>
      <AdminHeader title="Services" description="Manage the service records shown on the public services section." />
      <AdminCrud
        title="Service"
        endpoint="/api/services"
        initialItems={services}
        columns={['title', 'icon', 'order']}
        fields={[
          { name: 'title', label: 'Title', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'icon', label: 'Material Icon', required: true },
          { name: 'order', label: 'Order', type: 'number' },
        ]}
      />
    </>
  )
}
