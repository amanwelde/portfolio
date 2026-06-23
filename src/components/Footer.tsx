import { site, socialLinks } from '../data/content'

interface FooterProps {
  footerText?: string
  email?: string
  phone?: string
  brandName?: string
}

export function Footer({ footerText, email, phone, brandName }: FooterProps) {
  const displayName = brandName ?? site.name

  return (
    <footer className="border-t border-surface-container-high bg-surface-container-lowest py-8">
      <div className="container-main flex flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <div className="font-display text-lg font-bold uppercase tracking-tighter text-on-surface">
            {displayName}
          </div>
          <p className="mt-2 text-sm text-on-surface-variant">{footerText}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="font-mono text-xs text-on-surface-variant">
          © {new Date().getFullYear()} {site.name}. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}
