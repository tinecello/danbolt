import { useState, useEffect, useRef } from 'react'
import { Mic, Lightbulb, Settings, ShieldCheck, ClipboardCheck, GraduationCap, Accessibility, ArrowRight, Phone } from 'lucide-react'

const services = [
  { icon: Mic, title: 'Akustiske målinger og kartlegging', description: 'Vi kartlegger hva rommet faktisk gjør med lyden – etterklangstid, taletydelighet, bakgrunnsstøy og brukeropplevelse. Grunnlaget for alle beslutninger.', details: ['Etterklangstidsmålinger', 'Taletydelighetsmåling (STI)', 'Frekvensanalyse', 'Støymåling'] },
  { icon: Lightbulb, title: 'Uavhengig rådgivning', description: 'Uhildet vurdering, ikke salg. Mine anbefalinger er basert på rommets egenskaper – ikke leverandørens sortiment.', details: ['Behovsanalyse', 'Løsningsforslag', 'Tekniske vurderinger', 'Kostnadsestimat'] },
  { icon: Settings, title: 'Prosjektering og systemdesign', description: 'Riktig løsning for rommet og bruken – design av lyd- og kommunikasjonsanlegg tilpasset akustikk, bruksmønster og tekniske krav.', details: ['Systemdesign', 'Høyttalerplassering', 'Signalbehandling', 'Dokumentasjon'] },
  { icon: ClipboardCheck, title: 'Anbudsbistand', description: 'Så dere kjøper riktig, og ikke for mye. Leverandøruavhengig bistand med kravspesifikasjoner, tekniske beskrivelser og tilbudsevaluering.', details: ['Kravspesifikasjon', 'Teknisk beskrivelse', 'Tilbudsevaluering', 'Innkjøpsbistand'] },
  { icon: ShieldCheck, title: 'Kvalitetssikring og kontrollmåling', description: 'Verifiser at dere fikk det dere betalte for – kontrollmålinger, testing, tuning og verifikasjon av leveransen.', details: ['Installasjonskontroll', 'Funksjonstesting', 'Optimalisering', 'Dokumentasjon'] },
  { icon: Accessibility, title: 'Universell utforming og teleslynge', description: 'Måling av hørselshjelpemidler mot gjeldende krav, slik at rommet er tilgjengelig for alle brukere.', details: ['Teleslyngemåling', 'Krav til universell utforming', 'NS 8175', 'Dokumentasjon av avvik'] },
  { icon: GraduationCap, title: 'Optimalisering av eksisterende anlegg', description: 'Kanskje det ikke må byttes, bare justeres. Praktisk opplæring, dokumentasjon og rådgivning om bruk, drift og videre oppfølging.', details: ['Brukeropplæring', 'Driftsdokumentasjon', 'Vedlikeholdsrutiner', 'Oppfølging'] },
  ]

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="tjenester" ref={sectionRef} className="relative py-28 lg:py-40 bg-dark overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-copper/[0.02] rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Spesialkompetanse</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6">Tjenester tilpasset dine behov</h2>
          <p className="text-cream/50 text-base lg:text-lg max-w-2xl mx-auto">Fra historiske kirker til hypermoderne konferansesenter. Jeg tilpasser alltid løsningen til rommet og brukeren.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon
            const isActive = activeIndex === i
            return (
              <div key={service.title}
                className={`group relative bg-dark-card border rounded-xl p-6 lg:p-8 cursor-pointer transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isActive ? 'border-copper/40 bg-copper/5 shadow-glow' : 'border-copper/10 hover:border-copper/25 hover:bg-copper/[0.02]'}`}
                style={{ transitionDelay: visible ? `${i * 100}ms` : '0ms' }}
                onClick={() => setActiveIndex(isActive ? null : i)} onMouseEnter={() => setActiveIndex(i)}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${isActive ? 'bg-copper/20 text-copper-light' : 'bg-copper/10 text-copper-light/70 group-hover:bg-copper/15'}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-serif text-xl text-cream mb-3 group-hover:text-copper-light transition-colors">{service.title}</h3>
                <p className="text-cream/50 text-sm leading-relaxed mb-4">{service.description}</p>
                <div className={`grid transition-all duration-400 ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden min-h-0 pt-4 border-t border-copper/10 space-y-2">
                    {service.details.map(d => <div key={d} className="flex items-center gap-2 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-copper/60 flex-shrink-0" /><span className="text-cream/60">{d}</span></div>)}
                  </div>
                </div>
                <div className={`absolute bottom-6 right-6 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}><ArrowRight size={16} className="text-copper-light" /></div>
                <div className={`absolute top-0 right-0 w-12 h-12 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-copper/30 to-transparent" />
                  <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-copper/30 to-transparent" />
                </div>
              </div>
            )
          })}
        </div>
        {/* CTA */}
        <div className={`mt-14 text-center transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#kontakt" onClick={(e) => { e.preventDefault(); document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-copper/20 text-copper-light border border-copper/50 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all duration-300 min-h-[52px]">
            <Phone size={16} />
            Be om uforpliktende samtale
          </a>
        </div>
        {/* Hvem jeg hjelper */}
        <div className="mt-14 text-center">
        <h3 className="font-serif text-2xl sm:text-3xl text-cream mb-4">Hvem jeg hjelper</h3>
        <p className="text-cream/50 text-base lg:text-lg max-w-2xl mx-auto">Skoler og barnehager · Kommunale bygg (rådhus, idrettshaller) · Kirker · Møterom og hybridmøterom · Kulturhus og auditorier</p>
        </div>
      </div>
    </section>
  )
}
