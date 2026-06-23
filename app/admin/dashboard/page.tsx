import { AdminHeader } from '@/components/admin/AdminShell'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const [projects, services, skills, testimonials, messages, media] = prisma
    ? await Promise.all([
        prisma.project.count(),
        prisma.service.count(),
        prisma.skill.count(),
        prisma.testimonial.count(),
        prisma.contactMessage.count(),
        prisma.mediaAsset.count(),
      ])
    : [0, 0, 0, 0, 0, 0]

  const stats = [
    ['Projects', projects],
    ['Services', services],
    ['Skills', skills],
    ['Testimonials', testimonials],
    ['Messages', messages],
    ['Media Assets', media],
  ]

  return (
    <>
      <AdminHeader title="Dashboard" description="Manage the public portfolio content, media library, and inbound contact messages." />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value]) => (
          <article key={label} className="glass-panel rounded-xl p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">{label}</div>
            <div className="mt-4 font-display text-5xl font-semibold text-white">{value}</div>
          </article>
        ))}
      </div>
    </>
  )
}
