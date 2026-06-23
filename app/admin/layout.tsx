import { redirect } from 'next/navigation'
import { AdminShell } from '@/components/admin/AdminShell'
import { isAdminAuthenticated } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    redirect('/login?redirect=/admin/dashboard')
  }

  return <AdminShell>{children}</AdminShell>
}
