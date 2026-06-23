'use client'

import { FormEvent, useState } from 'react'

type Settings = Record<string, unknown>

const fields = [
  ['brandName', 'Brand Name'],
  ['tagline', 'Tagline'],
  ['heroTitle', 'Hero Headline'],
  ['heroSubtitle', 'Hero Subheadline'],
  ['heroImage', 'Hero Image URL'],
  ['aboutText', 'About Text'],
  ['ownerName', 'Owner Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['whatsapp', 'WhatsApp'],
  ['instagram', 'Instagram'],
  ['tiktok', 'TikTok'],
  ['github', 'GitHub'],
  ['linkedin', 'LinkedIn'],
  ['youtube', 'YouTube'],
  ['footerText', 'Footer Text'],
  ['primaryColor', 'Primary Color'],
  ['secondaryColor', 'Secondary Color'],
] as const

export function SettingsForm({ settings }: { settings: Settings | null }) {
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function valueFor(name: string) {
    const value = settings?.[name]
    return typeof value === 'string' ? value : ''
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setError(null)
    const formData = new FormData(event.currentTarget)
    const payload: Record<string, string | null> = {}

    for (const [name] of fields) {
      const value = String(formData.get(name) ?? '').trim()
      payload[name] = value || null
    }

    const response = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      setError(body.error ?? 'Unable to save settings')
      return
    }

    setMessage('Settings saved')
  }

  return (
    <form onSubmit={submit} className="glass-panel grid gap-5 rounded-xl p-6 md:grid-cols-2">
      {fields.map(([name, label]) => (
        <label key={name} className={name === 'heroSubtitle' || name === 'aboutText' ? 'space-y-2 md:col-span-2' : 'space-y-2'}>
          <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">{label}</span>
          {name === 'heroSubtitle' || name === 'aboutText' ? (
            <textarea
              name={name}
              defaultValue={valueFor(name)}
              rows={5}
              className="w-full rounded border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-primary"
            />
          ) : (
            <input
              name={name}
              defaultValue={valueFor(name)}
              className="w-full rounded border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-primary"
            />
          )}
        </label>
      ))}
      {error ? <p className="text-sm text-red-400 md:col-span-2">{error}</p> : null}
      {message ? <p className="text-sm text-primary md:col-span-2">{message}</p> : null}
      <button className="rounded bg-primary-container px-5 py-3 font-bold text-on-primary-fixed hover:brightness-110 md:w-fit">
        Save Settings
      </button>
    </form>
  )
}
