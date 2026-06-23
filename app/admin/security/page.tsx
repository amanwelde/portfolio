import { AdminHeader } from '@/components/admin/AdminShell'
import { SecurityForm } from '@/components/admin/SecurityForm'

export default function SecurityAdminPage() {
  return (
    <>
      <AdminHeader title="Security" description="Update your admin password and credentials." />
      <SecurityForm />
    </>
  )
}
