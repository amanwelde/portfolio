import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aman Creative',
  description: 'Creating Stories That Inspire and Content That Performs',
}

import { Plus_Jakarta_Sans, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '800'],
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['500'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${hanken.variable} ${jetbrains.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0;1&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
