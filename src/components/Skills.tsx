'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { skills as defaultSkills, software } from '../data/content'
import { Reveal, SectionLabel, SectionTitle } from './ui'

interface SkillItem {
  id: string
  name: string
  percentage: number
}

interface SkillsProps {
  skills?: SkillItem[]
}

export function Skills({ skills }: SkillsProps) {
  const visibleSkills =
    skills?.length ? skills : defaultSkills.map((skill) => ({ id: skill.name, name: skill.name, percentage: skill.value }))

  return (
    <section id="skills" className="bg-surface-container py-[120px]">
      <div className="container-main grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
        <Reveal className="space-y-4">
          <SectionLabel>Our Arsenal</SectionLabel>
          <SectionTitle>Technical Mastery</SectionTitle>
          <p className="text-on-surface-variant">
            We utilize the industry&apos;s most powerful tools to ensure your content is rendered
            with peak fidelity and creative flair. From surgical edits in Premiere to advanced
            grading in DaVinci.
          </p>

          <div className="space-y-8 pt-6">
            {visibleSkills.map((skill, i) => (
              <div key={skill.name}>
                <div className="mb-2 flex justify-between font-mono text-xs uppercase tracking-widest">
                  <span>{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.15, ease: [0.65, 0, 0.35, 1] }}
                    className="h-full bg-gradient-to-r from-primary-container to-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
          {software.map((item) => (
            <div
              key={item.name}
              className={`glass-panel rounded-xl p-6 text-center transition-transform hover:-translate-y-1 ${'offset' in item && item.offset ? 'mt-8' : ''}`}
            >
              <Image width={48} height={48}
                src={item.image}
                alt={item.name}
                className="mx-auto mb-4 grayscale transition-all hover:grayscale-0"
              />
              <div className="font-mono text-[10px] tracking-widest">{item.name}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
