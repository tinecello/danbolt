import { Phone, Mail, MapPin } from 'lucide-react'

const navLinks = [
  { label: 'Hjem', href: '#hjem' },
  { label: 'Om meg', href: '#om' },
  { label: 'Tjenester', href: '#tjenester' },
  { label: 'Prosjektering', href: '#prosjektering' },
  { label: 'Referanser', href: '#referanser' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="relative bg-dark-card border-t border-copper/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#hjem"
              onClick={(e) => handleClick(e, '#hjem')}
              className="font-serif text-2xl font-semibold text-cream hover:text-copper-light transition-colors inline-block mb-4"
            >
              THORBJØRN DANBOLT
            </a>
            <p className="text-cream/50 text-sm leading-relaxed max-w-sm mb-6">
              Uavhengig teknisk rådgiver innen lyd, bilde og romakustikk – fra måling og tiltaksplan til ferdig kvalitetssikret anlegg.
              Spesialist på kirker, konferansesenter og møterom.
            </p>
            <div className="flex items-center gap-4 text-sm text-cream/40">
              <a href="tel:+4797721779" className="hover:text-copper-light transition-colors flex items-center gap-1.5">
                <Phone size={13} />
                +47 977 21 779
              </a>
              <span className="text-cream/10">|</span>
              <a href="mailto:thorbjorn@danbolt.no" className="hover:text-copper-light transition-colors flex items-center gap-1.5">
                <Mail size={13} />
                thorbjorn@danbolt.no
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-cream/30 text-xs uppercase tracking-wider mb-4">Navigasjon</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-cream/50 text-sm hover:text-copper-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-cream/30 text-xs uppercase tracking-wider mb-4">Kontakt</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-cream/50 text-sm">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-copper-light/50" />
                <span>Lørenskog, Norge</span>
              </li>
              <li>
                <a
                  href="tel:+4797721779"
                  className="flex items-center gap-2 text-cream/50 text-sm hover:text-copper-light transition-colors"
                >
                  <Phone size={14} className="flex-shrink-0 text-copper-light/50" />
                  +47 977 21 779
                </a>
              </li>
              <li>
                <a
                  href="mailto:thorbjorn@danbolt.no"
                  className="flex items-center gap-2 text-cream/50 text-sm hover:text-copper-light transition-colors"
                >
                  <Mail size={14} className="flex-shrink-0 text-copper-light/50" />
                  thorbjorn@danbolt.no
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-cream/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/20 text-xs">
            &copy; {new Date().getFullYear()} Danbolt DA. Alle rettigheter reservert.
          </p>
          <p className="text-cream/20 text-xs">
            Uavhengig teknisk rådgiver innen lyd, bilde og romakustikk.
          </p>
        </div>
      </div>
    </footer>
  )
}
