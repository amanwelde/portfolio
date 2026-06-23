'use client'

import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function AnimatedCounter({ value }: { value: string | number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState("0")
  
  // Extract numbers and non-numbers (like '+')
  const numericString = String(value).replace(/[^0-9.]/g, '')
  const suffix = String(value).replace(/[0-9.]/g, '')
  const target = parseFloat(numericString)

  useEffect(() => {
    if (inView && !isNaN(target)) {
      const controls = animate(0, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            setDisplayValue(Math.floor(latest).toString())
          }
        }
      })
      return controls.stop
    } else if (isNaN(target)) {
      setDisplayValue(String(value))
    }
  }, [inView, target, value])

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}
