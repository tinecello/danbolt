import { useEffect, useRef, useState } from 'react'
import { Search, PenTool, Sliders, ClipboardList, CheckCircle, ArrowRight, Phone } from 'lucide-react'

const steps = [
  { icon: Search, title: 'Behovsanalyse', description: 'Jeg kartlegger rommets bruksmønster, brukergruppe og akustiske utfordringer. Hva skal rommet brukes til? Hvem skal bruke det?' },
  { icon: PenTool, title: 'Akustisk Vurdering', description: 'Grundige akustiske målinger og analyse av rommets egenskaper. Etterklangstid, taletydelighet, støy og frekvensrespons.' },
  { icon: Sliders, title: 'Systemdesign', description: 'Prosjektering av lydanlegg tilpasset rommets akustikk. Høyttalerplassering, signalveier, og integrasjon med eksisterende systemer. Noen ganger er konklusjonen at rommet trenger akustisk behandling – ikke nytt anlegg. Da prosjekterer jeg tiltakene i stedet.' },
  { icon: ClipboardList, title: 'Anbudsdokument', description: 'Leverandøruavhengig kravspesifikasjon og teknisk beskrivelse som sikrer riktig innkjøp til riktig pris.' },
  { icon: CheckCircle, title: 'Kvalitetssikring', description: 'Kontrollmålinger, testing og verifisering av at det leverte systemet møter spesifikasjonen og fungerer i praksis.' },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => setActiveStep(p => (p + 1) % steps.length), 4000)
    return () => clearInterval(interval)
  }, [visible])

  return (
    <section id="prosjektering" ref={sectionRef} className="relative py-28 lg:py-40 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Min prosjekteringsprosess</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6">Prosjektering i 5 steg</h2>
          <p className="text-cream/50 text-base lg:text-lg max-w-2xl mx-auto">En strukturert prosess som sikrer at lydanlegget blir riktig — fra første analyse til ferdig kvalitetssikring.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = activeStep === i
              return (
                <div key={step.title}
                  className={`group relative flex gap-5 py-6 cursor-pointer transition-all duration-500 border-l-2 pl-8 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} ${isActive ? 'border-copper bg-copper/5' : 'border-cream/10 hover:border-cream/20'}`}
                  style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
                  onClick={() => setActiveStep(i)}>
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-copper/20 text-copper-light' : 'bg-copper/5 text-cream/40 group-hover:text-cream/60'}`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-medium tracking-wider uppercase transition-colors ${isActive ? 'text-copper-light' : 'text-cream/30'}`}>Steg {i + 1}</span>
                      {isActive && <ArrowRight size={12} className="text-copper-light/60" />}
                    </div>
                    <h3 className={`font-serif text-xl mb-2 transition-colors ${isActive ? 'text-cream' : 'text-cream/60'}`}>{step.title}</h3>
              <div className={`grid transition-all duration-300 ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] lg:grid-rows-[1fr]'}`}><p className={`text-sm leading-relaxed overflow-hidden min-h-0 ${isActive ? 'text-cream/60' : 'text-cream/30 lg:text-cream/40'}`}>{step.description}</p></div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={`relative transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="sticky top-28 bg-dark-card rounded-2xl border border-copper/10 p-8 lg:p-10">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-copper-light text-sm font-medium tracking-wider uppercase">Aktivt steg</span>
                  <span className="text-cream/30 text-sm">{activeStep + 1} / {steps.length}</span>
                </div>
                <div className="h-1 bg-cream/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-copper to-copper-light rounded-full transition-all duration-1000 ease-out" style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} />
                </div>
              </div>
              <div className="text-center mb-8">
                <div className="inline-flex w-20 h-20 rounded-2xl bg-copper/10 border border-copper/20 items-center justify-center mb-4">
                  {(() => { const Icon = steps[activeStep].icon; return <Icon size={36} className="text-copper-light" /> })()}
                </div>
                <h3 className="font-serif text-2xl text-cream mb-3">{steps[activeStep].title}</h3>
                <p className="text-cream/50 text-sm leading-relaxed max-w-sm mx-auto">{steps[activeStep].description}</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                {steps.map((_, i) => (
                  <button key={i} onClick={() => setActiveStep(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === activeStep ? 'w-8 bg-copper' : i < activeStep ? 'w-2 bg-copper/50' : 'w-2 bg-cream/10 hover:bg-cream/20'}`}
                    aria-label={`Gå til steg ${i + 1}`} />
                ))}
              </div>
              <div className="absolute -top-px -right-px w-20 h-20">
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-copper/30 to-transparent" />
                <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-copper/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
        {/* CTA etter steg 5 */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col items-center gap-4 p-6 bg-copper/5 border border-copper/15 rounded-xl">
            <p className="text-cream/70 text-sm lg:text-base">Klar for å starte ditt prosjekt?</p>
            <a href="#kontakt" onClick={(e) => { e.preventDefault(); document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-copper/20 text-copper-light border border-copper/50 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all duration-300 min-h-[48px]">
              <Phone size={16} />
              Start ditt prosjekt — ta kontakt
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
