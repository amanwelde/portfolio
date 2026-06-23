'use client'

import Image from 'next/image'
import { aboutFeatures, aboutImage as defaultAboutImage } from '../data/content'
import { PrimaryButton, Reveal, SectionLabel, SectionTitle } from './ui'

interface AboutProps {
  aboutText?: string
  aboutImage?: string
}

export function About({ aboutText, aboutImage }: AboutProps) {
  const imageSrc = aboutImage ?? defaultAboutImage

  return (
    <section id="about" className="py-[120px]">
      <div className="container-main grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
        <Reveal className="relative">
          <div className="group relative aspect-video overflow-hidden rounded-xl border border-white/10">
            <Image
              src={imageSrc}
              alt="Professional video editing suite"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute -right-10 -top-10 hidden h-40 w-40 rounded-tr-3xl border-r-2 border-t-2 border-primary/30 md:block" />
        </Reveal>

        <Reveal delay={0.1} className="space-y-4">
          <SectionLabel>The Visionary</SectionLabel>
          <SectionTitle>We Always Make The Best</SectionTitle>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            {aboutText ??
              'I am a passionate digital marketer and video editor dedicated to creating high-quality content that captures attention and drives results. From social media campaigns to cinematic wedding films, I combine creativity with data-driven strategies to deliver memorable experiences.'}
          </p>

          <div className="grid grid-cols-2 gap-8 pt-6">
            {aboutFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2 font-bold text-white">
                <span className="material-symbols-outlined filled text-primary">check_circle</span>
                {feature}
              </div>
            ))}
          </div>

          <PrimaryButton className="mt-8 px-8 py-3">Learn More</PrimaryButton>
        </Reveal>
      </div>
    </section>
  )
}
