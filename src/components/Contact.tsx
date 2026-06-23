'use client'

import { FormEvent, useState } from 'react'
import { socialLinks } from '../data/content'
import { Reveal, SectionLabel, SectionTitle } from './ui'

interface ContactProps {
  email?: string
}

export function Contact({ email }: ContactProps) {
  const contactEmail = email ?? 'hello@amancreative.com'
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)

    const payload = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      subject: formData.get('subject')?.toString() ?? '',
      message: formData.get('message')?.toString() ?? '',
    }

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const body = await response.json()
        throw new Error(body?.error ?? 'Unable to send message')
      }

      setSubmitted(true)
      e.currentTarget.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send message')
    }
  }

  return (
    <section id="contact" className="border-t border-white/5 bg-surface-container-low py-[120px]">
      <div className="container-main grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
        <Reveal className="space-y-4">
          <SectionLabel>Get in Touch</SectionLabel>
          <SectionTitle>
            Let&apos;s Create Something{' '}
            <span className="text-primary">Legendary</span>
          </SectionTitle>
          <p className="text-lg text-on-surface-variant">
            Ready to elevate your visual content? Fill out the form or reach out through our
            social channels. We typically respond within 24 hours.
          </p>

          <div className="flex flex-col gap-6 pt-10">
            <a href={`mailto:${contactEmail}`} className="group flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:bg-primary/10">
                <span className="material-symbols-outlined text-primary">mail</span>
              </div>
              <div>
                <div className="font-mono text-xs text-on-surface-variant">EMAIL US</div>
                <div className="font-bold text-white">{contactEmail}</div>
              </div>
            </a>

            <div className="group flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:bg-primary/10">
                <span className="material-symbols-outlined text-primary">share</span>
              </div>
              <div>
                <div className="font-mono text-xs text-on-surface-variant">FOLLOW US</div>
                <div className="flex gap-4 font-bold text-white">
                  {socialLinks.map((link) => (
                    <span
                      key={link}
                      className="cursor-pointer transition-colors hover:text-primary"
                    >
                      {link}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="glass-panel space-y-6 rounded-xl p-10">
            <div className="space-y-2">
              <label htmlFor="name" className="font-mono text-xs text-on-surface-variant">
                FULL NAME
              </label>
              <input
                id="name"
                name="name"
                required
                type="text"
                placeholder="Your Name"
                className="w-full border-0 border-b border-white/10 bg-transparent py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="font-mono text-xs text-on-surface-variant">
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                name="email"
                required
                type="email"
                placeholder="you@example.com"
                className="w-full border-0 border-b border-white/10 bg-transparent py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="font-mono text-xs text-on-surface-variant">
                SUBJECT
              </label>
              <input
                id="subject"
                name="subject"
                required
                type="text"
                placeholder="Your project subject"
                className="w-full border-0 border-b border-white/10 bg-transparent py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="font-mono text-xs text-on-surface-variant">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Briefly describe your project..."
                className="h-32 w-full resize-none border-0 border-b border-white/10 bg-transparent py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary"
              />
            </div>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <button
              type="submit"
              className="w-full rounded bg-primary-container py-4 text-sm font-bold uppercase tracking-widest text-on-primary-fixed transition-all hover:brightness-110"
            >
              {submitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
