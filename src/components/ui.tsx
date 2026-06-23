'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
}

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  ({ children, delay = 0, className, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  ),
)

Reveal.displayName = 'Reveal'

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
      {children}
    </span>
  )
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-3xl font-semibold text-white md:text-4xl md:leading-[48px]">
      {children}
    </h2>
  )
}

export function PrimaryButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded bg-primary-container px-8 py-4 font-bold text-on-primary-fixed transition-all hover:scale-95 hover:brightness-110 active:scale-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function GhostButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded border border-white/20 px-8 py-4 font-bold text-white transition-colors hover:bg-white/5 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
