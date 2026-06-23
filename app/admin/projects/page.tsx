import { Projects } from '../../../src/components/admin/ProjectsAdmin'
import { getProjects } from '@/lib/data'

export const metadata = { title: 'Admin — Projects' }

export default async function AdminProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container-main py-12">
      <h1 className="mb-6 text-2xl font-bold">Projects Admin</h1>
      {/* ProjectsAdmin is a client component that handles create/edit/delete */}
      <Projects initialProjects={projects} />
    </div>
  )
}

