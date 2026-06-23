'use client'

import { FormEvent, useState } from 'react'

type Settings = Record<string, unknown>

const sections = [
  {
    title: 'Brand & Hero',
    description: 'Controls the top of the homepage and the identity shown in the header and hero.',
    fields: [
      ['brandName', 'Brand Name'],
      ['tagline', 'Tagline'],
      ['heroTitle', 'Hero Headline'],
      ['heroSubtitle', 'Hero Subheadline'],
      ['heroImage', 'Hero Image URL'],
      ['aboutImage', 'About Image URL'],
      ['aboutText', 'About Text'],
      ['ownerName', 'Owner Name'],
      ['heroCtaText', 'Hero Primary Button Text'],
      ['heroCtaLink', 'Hero Primary Button Link'],
      ['heroSecondaryCtaText', 'Hero Secondary Button Text'],
      ['heroSecondaryCtaLink', 'Hero Secondary Button Link'],
      ['projectsCompleted', 'Manual Videos Edited (Leave blank for auto)'],
    ] as const,
  },
  {
    title: 'Contact & Social',
    description: 'Feeds the contact section, footer links, and public social destinations.',
    fields: [
      ['email', 'Email'],
      ['phone', 'Phone'],
      ['whatsapp', 'WhatsApp'],
      ['instagram', 'Instagram'],
      ['tiktok', 'TikTok'],
      ['github', 'GitHub'],
      ['linkedin', 'LinkedIn'],
      ['youtube', 'YouTube'],
    ] as const,
  },
  {
    title: 'Appearance',
    description: 'Adjusts the footer copy and the main theme colors used across the site.',
    fields: [
      ['footerText', 'Footer Text'],
      ['primaryColor', 'Primary Color'],
      ['secondaryColor', 'Secondary Color'],
    ] as const,
  },
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

    for (const section of sections) {
      for (const [name] of section.fields) {
        const value = String(formData.get(name) ?? '').trim()
        payload[name] = value || null
      }
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
    <form onSubmit={submit} className="glass-panel space-y-8 rounded-xl p-6">
      {sections.map((section) => (
        <section key={section.title} className="space-y-4">
          <div className="space-y-1 border-b border-white/10 pb-3">
            <h2 className="font-display text-2xl font-semibold text-white">{section.title}</h2>
            <p className="max-w-2xl text-sm text-on-surface-variant">{section.description}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {section.fields.map(([name, label]) => (
              <label
                key={name}
                className={name === 'heroSubtitle' || name === 'aboutText' ? 'space-y-2 md:col-span-2' : 'space-y-2'}
              >
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
          </div>
        </section>
      ))}
      {error ? <p className="text-sm text-red-400 md:col-span-2">{error}</p> : null}
      {message ? <p className="text-sm text-primary md:col-span-2">{message}</p> : null}
      <button className="rounded bg-primary-container px-5 py-3 font-bold text-on-primary-fixed hover:brightness-110 md:w-fit">
        Save Settings
      </button>
    </form>
  )
}
