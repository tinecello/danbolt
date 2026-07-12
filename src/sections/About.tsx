import { useEffect, useRef, useState } from 'react'
import { Award, BookOpen, Phone, ArrowRight } from 'lucide-react'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="om" ref={sectionRef} className="relative py-28 lg:py-40 bg-dark overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`relative transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-dark-card to-dark-lighter border border-copper/10 relative">
                <img src="/thorbjorn-danbolt.jpg" alt="Thorbjørn Danbolt - Fagkonsulent i lyd og akustikk" width="1200" height="1600" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-copper/30 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-copper/30 rounded-br-lg" />
              </div>
              <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-dark-card border border-copper/20 rounded-xl p-4 shadow-glow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-copper/15 flex items-center justify-center"><Award size={20} className="text-copper-light" /></div>
                  <div><p className="text-cream font-serif font-semibold">30+ år</p><p className="text-cream/40 text-xs">Erfaring</p></div>
                </div>
              </div>
              <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-copper/5 rounded-full blur-3xl" />
            </div>
          </div>
          <div className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Om meg</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-8 leading-tight">Fagkonsulent i<br /><span className="text-gradient-copper">lyd og akustikk</span></h2>
            <div className="space-y-5 text-cream/60 text-base leading-relaxed mb-8">
              <p>Gjennom mer enn 30 år har jeg arbeidet med lyd, akustikkløsninger for kirker, skoler, kulturhus, auditorier, konferansesentre, møterom og andre akustisk krevende rom.</p>
              <p>Min erfaring spenner fra liveproduksjon, akustiske målinger og praktiske installasjoner til prosjektering, systemdesign, anbudsprosesser, kvalitetssikring og optimalisering av komplette lyd- og AV-løsninger.</p>
              <p>Som <strong className="text-cream">uavhengig fagkonsulent</strong> representerer jeg ikke produsenter eller leverandører. Mine anbefalinger er basert på rommets egenskaper, brukernes behov og prosjektets målsettinger.</p>
              <p className="text-cream/70 italic">Målet er alltid det samme: Å skape rom hvor mennesker kan høre, forstå og bruke stemmen sin uten unødig belastning.</p>
            </div>
            {/* Book CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-dark-card border border-copper/10 rounded-xl mb-5">
              <div className="w-12 h-12 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0"><BookOpen size={22} className="text-copper-light" /></div>
              <div className="flex-1">
                <p className="text-cream font-medium text-sm mb-1">Fagbok: Lydanlegg i kirkene</p>
                <p className="text-cream/40 text-xs">Erfaringer og råd fra 30 år med lyd og akustikk i norske kirker</p>
              </div>
              <a href="#fagbok" onClick={(e) => { e.preventDefault(); document.querySelector('#fagbok')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="flex items-center gap-1 text-copper-light text-sm font-medium hover:gap-2 transition-all group flex-shrink-0">Les mer<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></a>
            </div>
            {/* Kontakt CTA */}
            <a href="#kontakt" onClick={(e) => { e.preventDefault(); document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 text-copper-light font-medium hover:gap-3 transition-all duration-300 group">
              <Phone size={16} />
              Kontakt meg direkte
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
