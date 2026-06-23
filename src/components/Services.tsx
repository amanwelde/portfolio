'use client'

import { services as defaultServices } from '../data/content'
import { Reveal, SectionLabel, SectionTitle } from './ui'

interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
}

interface ServicesProps {
  services?: ServiceItem[]
}

export function Services({ services }: ServicesProps) {
  const visibleServices =
    services?.length ? services : defaultServices.map((service) => ({ id: service.title, ...service }))

  return (
    <section id="services" className="bg-surface-container-lowest py-[120px]">
      <div className="container-main">
        <Reveal className="mb-16 space-y-4 text-center">
          <SectionLabel>Our Expertise</SectionLabel>
          <SectionTitle>Premium Creative Services</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08}>
              <article className="glass-panel group rounded-xl p-10 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1">
                <span className="material-symbols-outlined mb-6 inline-block text-4xl text-primary transition-transform group-hover:scale-110">
                  {service.icon}
                </span>
                <h3 className="mb-4 font-display text-2xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-on-surface-variant">{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
