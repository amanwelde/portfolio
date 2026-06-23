'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navLinks, site } from '../data/content'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'h-16 bg-black/80' : 'h-20 bg-black/40'
      }`}
    >
      <div className="container-main flex h-full items-center justify-between">
        <a
          href="#home"
          className="font-display text-lg font-bold uppercase tracking-tighter text-on-surface md:text-xl"
        >
          {site.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-primary ${
                i === 0 ? 'border-b-2 border-primary pb-1 font-bold text-primary' : 'text-on-surface'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="rounded bg-primary-container px-5 py-2 text-sm font-bold text-on-primary-fixed transition-transform hover:scale-95"
        >
          Contact
        </a>
      </div>
    </motion.nav>
  )
}
