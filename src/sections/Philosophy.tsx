import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frame = 0

    const updateParallax = () => {
      frame = 0
      if (!sectionRef.current || !imageRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      const progress = -rect.top / window.innerHeight
      imageRef.current.style.transform = `translate3d(0, ${progress * 40}px, 0)`
    }

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section
      id="filosofi"
      ref={sectionRef}
      className="relative py-28 lg:py-40 bg-dark overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`text-center mb-10 lg:mb-14 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-cream leading-tight max-w-4xl mx-auto">
            Et godt lydanlegg begynner ikke
            <br />
            med nye høyttalere
          </h2>
        </div>

        {/* Nature image with parallax */}
        <div
          className={`relative mb-12 lg:mb-16 transition-all duration-1000 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div
            className="relative rounded-2xl overflow-hidden border border-copper/10"
            style={{ height: 'clamp(320px, 45svh, 520px)' }}
          >
            <img
              ref={imageRef}
              src="/natur-rom.jpg"
              alt="Norsk natur - Rommet er grunnlaget for all lyd"
              width="1920"
              height="1080"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-[120%] object-cover"
              style={{
                transform: 'translate3d(0, 0, 0)',
                willChange: 'transform',
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-dark/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/40 via-transparent to-dark/40" />

            {/* Single strong statement over image */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div
                className={`text-center transition-all duration-1000 delay-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="w-16 h-px bg-copper-light/40 mx-auto mb-8" />

                <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream/95 italic leading-tight">
                  Det begynner med rommet
                </p>

                <div className="w-16 h-px bg-copper-light/40 mx-auto mt-8" />
              </div>
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute -top-px -right-px w-16 h-16 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-copper/30 to-transparent" />
            <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-copper/30 to-transparent" />
          </div>
          <div className="absolute -bottom-px -left-px w-16 h-16 pointer-events-none">
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-copper/30 to-transparent" />
            <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-copper/30 to-transparent" />
          </div>
        </div>

        {/* Single concise text */}
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-1000 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-cream/50 text-base lg:text-lg leading-relaxed mb-6">
            Rommets akustiske egenskaper — etterklangstid, frekvensrespons,
            støyisolasjon og geometri — er grunnlaget som alt annet bygger på.
            Når rommet er riktig vurdert, kan lydanlegget gjøre jobben det er ment å gjøre.
          </p>
          <a
            href="#tjenester"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#tjenester')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 text-copper-light font-medium hover:gap-4 transition-all duration-300 group"
          >
            Se hvordan jeg arbeider
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
