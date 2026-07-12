import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { bloggposts, kategorier, formatDato } from '../data/bloggposts'

export default function Blogg() {
  const [aktivKategori, setAktivKategori] = useState('Alle')
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const featured = bloggposts.find(p => p.featured)
  const filtrerte = aktivKategori === 'Alle'
    ? bloggposts.filter(p => !p.featured)
    : bloggposts.filter(p => p.kategori === aktivKategori && !p.featured)

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-dark overflow-hidden pt-20">
      <Helmet>
        <title>Blogg | Thorbjørn Danbolt – Uavhengig rådgiver lyd &amp; akustikk</title>
        <meta name="description" content="Faglige artikler om akustikk, taletydelighet, lydanlegg og lydkrav i kirker, skoler, kulturhus og møterom. Erfaringer og råd fra 30 år i bransjen." />
        <link rel="canonical" href="https://danbolt.no/blogg" />
        <meta property="og:title" content="Blogg | Thorbjørn Danbolt – Lyd & Akustikk" />
        <meta property="og:description" content="Faglige artikler om akustikk, taletydelighet, lydanlegg og lydkrav i kirker, skoler, kulturhus og møterom." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://danbolt.no/blogg" />
        <meta property="og:image" content="https://danbolt.no/thorbjorn-danbolt.jpg" />
        <meta property="og:locale" content="nb_NO" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blogg | Thorbjørn Danbolt – Lyd &amp; Akustikk" />
        <meta name="twitter:description" content="Faglige artikler om akustikk, taletydelighet, lydanlegg og lydkrav i kirker, skoler, kulturhus og møterom." />
        <meta name="twitter:image" content="https://danbolt.no/thorbjorn-danbolt.jpg" />
      </Helmet>

      {/* Header */}
      <div className={`text-center pt-16 pb-12 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Faglige innsikter</p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream mb-4">Akustisk Innsikt</h1>
        <p className="text-cream/50 text-base lg:text-lg max-w-xl mx-auto">
          Erfaringer, råd og faglige perspektiver fra 30 år med lyd og akustikk.
        </p>
      </div>

      {/* Featured Post */}
      {featured && (
        <div className={`max-w-5xl mx-auto px-6 lg:px-8 mb-16 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <Link to={`/blogg/${featured.slug}`} className="group block relative rounded-2xl overflow-hidden border border-copper/10 hover:border-copper/30 transition-all duration-500">
            <div className="relative aspect-[21/9]">
              <img src={featured.bilde} alt={featured.tittel} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                <span className="inline-block self-start px-3 py-1 bg-copper text-dark text-xs font-semibold uppercase tracking-wider rounded mb-4">Featured</span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-cream mb-3 group-hover:text-copper-light transition-colors">{featured.tittel}</h2>
                <p className="text-cream/60 text-sm lg:text-base max-w-xl mb-4">{featured.ingress}</p>
                <div className="flex items-center gap-4 text-cream/40 text-xs">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {formatDato(featured.dato)}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {featured.lestetid} min lesning</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Kategori-filter */}
      <div className={`max-w-6xl mx-auto px-6 lg:px-8 mb-10 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex flex-wrap gap-3 justify-center">
          {kategorier.map(kat => (
            <button key={kat} onClick={() => setAktivKategori(kat)}
              className={`px-5 py-2 text-sm rounded-full border transition-all duration-300 ${aktivKategori === kat ? 'bg-copper/20 border-copper/50 text-copper-light' : 'border-cream/10 text-cream/50 hover:border-cream/20 hover:text-cream/70'}`}>
              {kat}
            </button>
          ))}
        </div>
      </div>

      {/* Blogg-grid */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrerte.map((post, i) => (
            <Link to={`/blogg/${post.slug}`} key={post.id}
              className={`group relative bg-dark-card rounded-xl border border-copper/10 overflow-hidden transition-all duration-500 hover:border-copper/30 hover:shadow-glow hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: visible ? `${400 + i * 100}ms` : '0ms' }}>
              <div className="aspect-video overflow-hidden">
                <img src={post.bilde} alt={post.tittel} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 bg-copper/15 text-copper-light text-[11px] font-medium uppercase tracking-wider rounded">{post.kategori}</span>
                  <span className="text-cream/30 text-xs flex items-center gap-1"><Calendar size={11} /> {formatDato(post.dato)}</span>
                </div>
                <h3 className="font-serif text-lg text-cream mb-2 group-hover:text-copper-light transition-colors leading-snug">{post.tittel}</h3>
                <p className="text-cream/45 text-sm leading-relaxed line-clamp-2 mb-4">{post.ingress}</p>
                <span className="inline-flex items-center gap-1.5 text-copper-light text-sm font-medium group-hover:gap-2.5 transition-all">
                  Les mer <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        {filtrerte.length === 0 && (
          <div className="text-center py-20">
            <p className="text-cream/40 text-lg">Ingen poster i denne kategorien ennå.</p>
          </div>
        )}
      </div>
    </section>
  )
}
