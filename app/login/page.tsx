import { redirect } from 'next/navigation'
import { createAdminSession, isAdminAuthenticated, verifyAdmin } from '@/lib/auth'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>
}) {
  if (await isAdminAuthenticated()) {
    redirect('/admin/dashboard')
  }

  const params = await searchParams

  async function login(formData: FormData) {
    'use server'
    const email = String(formData.get('email') ?? '')
    const password = String(formData.get('password') ?? '')
    const target = String(formData.get('redirect') ?? '/admin/dashboard')

    if (!(await verifyAdmin(email, password))) {
      redirect(`/login?error=Invalid%20credentials&redirect=${encodeURIComponent(target)}`)
    }

    await createAdminSession()
    redirect(target.startsWith('/admin') ? target : '/admin/dashboard')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5">
      <form action={login} className="glass-panel w-full max-w-md space-y-6 rounded-xl p-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Owner Login</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-white">Aman Creative</h1>
        </div>
        <input type="hidden" name="redirect" value={params.redirect ?? '/admin/dashboard'} />
        <label className="block space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">Email</span>
          <input name="email" type="email" required className="w-full rounded border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-primary" />
        </label>
        <label className="block space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">Password</span>
          <input name="password" type="password" required className="w-full rounded border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-primary" />
        </label>
        {params.error ? <p className="text-sm text-red-400">{params.error}</p> : null}
        <button className="w-full rounded bg-primary-container py-4 font-bold text-on-primary-fixed hover:brightness-110">
          Login
        </button>
      </form>
    </main>
  )
}
