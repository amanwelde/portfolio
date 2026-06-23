import Link from 'next/link'
import { redirect } from 'next/navigation'
import { clearAdminSession } from '@/lib/auth'

const navItems = [
  ['/admin/dashboard', 'Dashboard'],
  ['/admin/projects', 'Projects'],
  ['/admin/services', 'Services'],
  ['/admin/skills', 'Skills'],
  ['/admin/testimonials', 'Testimonials'],
  ['/admin/messages', 'Messages'],
  ['/admin/settings', 'Settings'],
  ['/admin/media', 'Media'],
  ['/admin/security', 'Security'],
] as const

export function AdminShell({ children }: { children: React.ReactNode }) {
  async function logout() {
    'use server'
    await clearAdminSession()
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-black text-on-surface">
      <div className="border-b border-white/10 bg-surface-container-lowest/90 backdrop-blur-xl">
        <div className="container-main flex min-h-20 flex-col justify-between gap-4 py-4 md:flex-row md:items-center">
          <Link href="/admin/dashboard" className="font-display text-xl font-bold uppercase text-white">
            Aman Creative Admin
          </Link>
          <form action={logout}>
            <button className="rounded border border-white/15 px-4 py-2 text-sm font-bold text-white hover:bg-white/5">
              Logout
            </button>
          </form>
        </div>
      </div>
      <div className="container-main grid gap-8 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="glass-panel h-fit rounded-xl p-3">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {navItems.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="whitespace-nowrap rounded px-4 py-3 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-white/5 hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}

export function AdminHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Owner Dashboard</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-white">{title}</h1>
      <p className="mt-3 max-w-2xl text-on-surface-variant">{description}</p>
    </div>
  )
}
