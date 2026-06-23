import { AdminCrud } from '@/components/admin/AdminCrud'
import { AdminHeader } from '@/components/admin/AdminShell'
import { prisma } from '@/lib/prisma'

export default async function MessagesAdminPage() {
  const messages = prisma ? await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }) : []

  return (
    <>
      <AdminHeader title="Messages" description="Review, update status, and remove contact messages from visitors." />
      <AdminCrud
        title="Message"
        endpoint="/api/messages"
        initialItems={messages}
        columns={['name', 'email', 'subject', 'status']}
        fields={[
          { name: 'name', label: 'Name', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'subject', label: 'Subject', required: true },
          { name: 'message', label: 'Message', type: 'textarea', required: true },
          { name: 'status', label: 'Status', type: 'select', options: ['Unread', 'Read', 'Replied'] },
        ]}
      />
    </>
  )
}
