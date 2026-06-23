'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, SectionLabel, SectionTitle } from './ui'
import { projectFilters, projects as defaultProjects } from '../data/content'

interface ProjectItem {
  id: string
  title: string
  image: string
  category: string
}

interface ProjectsProps {
  projects?: ProjectItem[]
}

export function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof projectFilters)[number]>('All Work')
  const visibleProjects =
    projects?.length ? projects : defaultProjects.map((project, index) => ({ id: `${project.title}-${index}`, ...project }))

  const filtered =
    activeFilter === 'All Work'
      ? visibleProjects
      : visibleProjects.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase())

  return (
    <section id="work" className="py-[120px]">
      <div className="container-main">
        <Reveal className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="space-y-4">
            <SectionLabel>Our Portfolio</SectionLabel>
            <SectionTitle>Featured Projects</SectionTitle>
          </div>

          <div className="flex flex-wrap gap-4">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`font-mono text-xs uppercase tracking-widest transition-colors pb-1 ${
                  activeFilter === filter
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 transition-transform duration-500 hover:scale-[1.02]"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                />
                <div className="glass-panel absolute inset-0 flex flex-col justify-end p-8 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
                    {project.category}
                  </span>
                  <h4 className="font-display text-xl font-semibold text-white">{project.title}</h4>
                  <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 backdrop-blur-md">
                    <span className="material-symbols-outlined filled text-3xl text-white">
                      play_arrow
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
