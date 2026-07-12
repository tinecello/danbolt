import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const forsideLinks = [
  { label: 'Hjem', href: '#hjem' },
  { label: 'Om', href: '#om' },
  { label: 'Tjenester', href: '#tjenester' },
  { label: 'Prosjektering', href: '#prosjektering' },
  { label: 'Referanser', href: '#referanser' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Navigation({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const erForside = location.pathname === '/'

  const handleForsideClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform-gpu ${
      scrolled ? 'bg-dark/95 lg:bg-dark/90 lg:backdrop-blur-md border-b border-copper/10 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="font-serif text-lg lg:text-xl font-semibold text-cream tracking-wide hover:text-copper-light transition-colors">
            THORBJØRN DANBOLT
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {erForside && forsideLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => handleForsideClick(e, link.href)}
                className="text-sm font-medium text-cream/70 hover:text-copper-light transition-colors duration-300 tracking-wide">
                {link.label}
              </a>
            ))}
            {!erForside && (
              <Link to="/" className="text-sm font-medium text-cream/70 hover:text-copper-light transition-colors duration-300 tracking-wide">Hjem</Link>
            )}
            <Link to="/blogg"
              className={`text-sm font-medium transition-colors duration-300 tracking-wide ${location.pathname.startsWith('/blogg') ? 'text-copper-light' : 'text-cream/70 hover:text-copper-light'}`}>
              Blogg
            </Link>
            <Link to="/" onClick={(e) => { if (erForside) handleForsideClick(e, '#kontakt') }}
              className="px-5 py-2 text-sm font-medium bg-copper/15 text-copper-light border border-copper/30 rounded-full hover:bg-copper/25 hover:border-copper/50 transition-all duration-300">
              Kontakt meg
            </Link>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-cream/70 hover:text-copper-light transition-colors" aria-label="Åpne meny">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-lg border-b border-copper/10 transition-all duration-300 overflow-hidden ${
        menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-4 space-y-1">
          {erForside ? forsideLinks.map(link => (
            <a key={link.href} href={link.href} onClick={(e) => handleForsideClick(e, link.href)}
              className="block py-3 text-cream/70 hover:text-copper-light transition-colors border-b border-white/5">{link.label}</a>
          )) : (
            <Link to="/" onClick={() => setMenuOpen(false)} className="block py-3 text-cream/70 hover:text-copper-light transition-colors border-b border-white/5">Hjem</Link>
          )}
          <Link to="/blogg" onClick={() => setMenuOpen(false)}
            className={`block py-3 transition-colors border-b border-white/5 ${location.pathname.startsWith('/blogg') ? 'text-copper-light' : 'text-cream/70 hover:text-copper-light'}`}>Blogg</Link>
          <Link to="/" className="block mt-4 px-5 py-3 text-center text-sm font-medium bg-copper/15 text-copper-light border border-copper/30 rounded-full">Kontakt meg</Link>
        </div>
      </div>
    </nav>
  )
}
