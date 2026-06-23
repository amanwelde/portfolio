'use client'

import { motion } from 'framer-motion'
import { heroImage as defaultHeroImage } from '../data/content'
import { GhostButton, PrimaryButton, Reveal, SectionLabel } from './ui'

interface HeroProps {
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: string
}

export function Hero({ heroTitle, heroSubtitle, heroImage }: HeroProps) {
  const bannerImage = heroImage ?? defaultHeroImage

  return (
    <header
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(248,159,67,0.08),transparent_50%)]" />
        <div className="cinematic-overlay absolute inset-0" />
      </div>

      <div className="container-main relative z-10 grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
        <Reveal className="space-y-8">
          <SectionLabel>Cinematic Mastery</SectionLabel>
          <h1 className="font-display text-[48px] font-bold leading-[52px] tracking-[-0.01em] text-white md:text-[72px] md:leading-[80px] md:tracking-[-0.02em]">
            {heroTitle ?? 'Digital Marketer & Creative Video Storyteller'}
          </h1>
          <p className="max-w-lg text-lg leading-7 text-on-surface-variant">
            {heroSubtitle ??
              'I create engaging videos for TikTok, Instagram, and other platforms, helping brands grow through creative storytelling, content strategy, and performance analysis.'}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <PrimaryButton className="amber-glow flex items-center gap-2">
              View My Work
              <span className="material-symbols-outlined filled text-xl">play_arrow</span>
            </PrimaryButton>
            <GhostButton>Contact Me</GhostButton>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative hidden md:block">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10"
          >
            <img
              src={bannerImage}
              alt="Professional videographer in cinematic studio"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="glass-panel absolute -bottom-6 -left-6 rounded-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-on-primary-fixed">
                <span className="material-symbols-outlined">movie</span>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-primary">
                  Projects Done
                </div>
                <div className="font-display text-2xl font-semibold text-white">500+</div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </header>
  )
}

export function SupportBar() {
  const items = [
    'SUPPORTING DIGITAL BUSINESS',
    'BRANDING AGENCIES',
    'PRIVATE DOCUMENTARIES',
    'INFLUENCER CREATIVES',
  ]

  return (
    <div className="border-y border-white/5 bg-surface-container-lowest py-10">
      <div className="container-main flex flex-wrap items-center justify-between gap-8 opacity-50 grayscale">
        {items.map((item) => (
          <span key={item} className="font-mono text-xs tracking-widest">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
