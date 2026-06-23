import { AdminCrud } from '@/components/admin/AdminCrud'
import { AdminHeader } from '@/components/admin/AdminShell'
import { prisma } from '@/lib/prisma'

export default async function TestimonialsAdminPage() {
  const testimonials = prisma ? await prisma.testimonial.findMany({ orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }] }) : []

  return (
    <>
      <AdminHeader title="Testimonials" description="Manage animated glassmorphism testimonial card content." />
      <AdminCrud
        title="Testimonial"
        endpoint="/api/testimonials"
        initialItems={testimonials}
        columns={['clientName', 'clientPosition', 'featured']}
        fields={[
          { name: 'clientName', label: 'Client Name', required: true },
          { name: 'clientPosition', label: 'Client Position', required: true },
          { name: 'message', label: 'Message', type: 'textarea', required: true },
          { name: 'avatar', label: 'Avatar URL', type: 'url' },
          { name: 'featured', label: 'Featured', type: 'checkbox' },
        ]}
      />
    </>
  )
}
