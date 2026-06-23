'use client'

import { FormEvent, useState } from 'react'

export function SecurityForm() {
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const currentPassword = String(formData.get('currentPassword') || '')
    const newPassword = String(formData.get('newPassword') || '')
    const confirmPassword = String(formData.get('confirmPassword') || '')

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    const response = await fetch('/api/admin/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      setError(body.error ?? 'Failed to update password')
      return
    }

    setMessage('Password updated successfully')
    ;(event.target as HTMLFormElement).reset()
  }

  return (
    <form onSubmit={submit} className="glass-panel space-y-6 rounded-xl p-6 max-w-xl">
      <div className="space-y-1 border-b border-white/10 pb-3">
        <h2 className="font-display text-2xl font-semibold text-white">Change Password</h2>
      </div>

      <label className="block space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">Current Password</span>
        <input name="currentPassword" type="password" required className="w-full rounded border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-primary" />
      </label>

      <label className="block space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">New Password</span>
        <input name="newPassword" type="password" required className="w-full rounded border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-primary" />
      </label>

      <label className="block space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">Confirm New Password</span>
        <input name="confirmPassword" type="password" required className="w-full rounded border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-primary" />
      </label>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {message ? <p className="text-sm text-primary">{message}</p> : null}

      <button className="rounded bg-primary-container px-5 py-3 font-bold text-on-primary-fixed hover:brightness-110">
        Update Password
      </button>
    </form>
  )
}
