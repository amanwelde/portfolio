'use client'

import { motion } from 'framer-motion'
import { testimonials as defaultTestimonials } from '../data/content'
import { Reveal, SectionLabel, SectionTitle } from './ui'

interface TestimonialItem {
  id: string
  clientName: string
  clientPosition: string
  message: string
}

interface TestimonialsProps {
  testimonials?: TestimonialItem[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const visibleTestimonials =
    testimonials?.length
      ? testimonials
      : defaultTestimonials.map((item) => ({
          id: item.name,
          clientName: item.name,
          clientPosition: item.role,
          message: item.quote,
        }))

  return (
    <section id="testimonials" className="overflow-hidden py-[120px]">
      <div className="container-main">
        <Reveal className="mb-16 space-y-4 text-center">
          <SectionLabel>Voices of Trust</SectionLabel>
          <SectionTitle>Client Success Stories</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {visibleTestimonials.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="glass-panel group relative overflow-hidden rounded-xl p-10 transition-all hover:border-primary/30"
              >
                <span className="material-symbols-outlined absolute -right-4 -top-4 text-8xl text-primary/20">
                  format_quote
                </span>
                <p className="relative z-10 mb-8 text-lg italic text-white">&ldquo;{item.message}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10" />
                  <div>
                    <div className="font-bold text-white">{item.clientName}</div>
                    <div className="font-mono text-xs text-on-surface-variant">{item.clientPosition}</div>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
