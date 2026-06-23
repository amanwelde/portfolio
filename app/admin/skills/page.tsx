import { AdminCrud } from '@/components/admin/AdminCrud'
import { AdminHeader } from '@/components/admin/AdminShell'
import { prisma } from '@/lib/prisma'

export default async function SkillsAdminPage() {
  const skills = prisma ? await prisma.skill.findMany({ orderBy: [{ order: 'asc' }, { percentage: 'desc' }] }) : []

  return (
    <>
      <AdminHeader title="Skills" description="Manage software, marketing, analytics, and storytelling skills." />
      <AdminCrud
        title="Skill"
        endpoint="/api/skills"
        initialItems={skills}
        columns={['name', 'percentage', 'order']}
        fields={[
          { name: 'name', label: 'Name', required: true },
          { name: 'percentage', label: 'Percentage', type: 'number', required: true },
          { name: 'order', label: 'Order', type: 'number' },
        ]}
      />
    </>
  )
}
