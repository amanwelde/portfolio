'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, site } from '../data/content'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded bg-primary-container px-5 py-2 text-sm font-bold text-on-primary-fixed transition-transform hover:scale-95"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`h-0.5 w-6 bg-current transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-current transition-transform duration-300 ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute left-0 top-full w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 md:hidden overflow-hidden shadow-2xl"
          >
            <div className="container-main flex flex-col gap-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-white hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 rounded bg-primary-container px-6 py-3 text-center text-sm font-bold text-on-primary-fixed"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
