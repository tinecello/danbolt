import { useEffect, useRef, useCallback } from 'react'
import { Phone } from 'lucide-react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const waves = [
      { amplitude: 40, frequency: 0.008, speed: 0.008, yOffset: 0.35, alpha: 0.3, color: [200, 121, 65] },
      { amplitude: 30, frequency: 0.012, speed: 0.012, yOffset: 0.38, alpha: 0.25, color: [212, 165, 116] },
      { amplitude: 50, frequency: 0.006, speed: 0.006, yOffset: 0.42, alpha: 0.15, color: [200, 121, 65] },
      { amplitude: 25, frequency: 0.015, speed: 0.015, yOffset: 0.32, alpha: 0.2, color: [180, 130, 80] },
      { amplitude: 35, frequency: 0.01, speed: 0.009, yOffset: 0.45, alpha: 0.12, color: [212, 165, 116] },
    ]

    const particles: Array<{
      x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: number[]
    }> = []

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.3 + Math.random() * 0.7
      particles.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 0.5,
        life: 0, maxLife: 80 + Math.random() * 60, size: 1 + Math.random() * 2,
        color: [200 + Math.random() * 30, 120 + Math.random() * 50, 65 + Math.random() * 20],
      })
    }

    const drawWave = (wave: (typeof waves)[0], time: number, layerIndex: number) => {
      ctx.beginPath()
      const baseY = height * wave.yOffset
      for (let x = 0; x <= width; x += 2) {
        let y = baseY
        y += Math.sin(x * wave.frequency + time * wave.speed * 60 + layerIndex) * wave.amplitude
        y += Math.sin(x * wave.frequency * 2.3 + time * wave.speed * 45 + layerIndex * 2) * (wave.amplitude * 0.3)
        y += Math.sin(x * wave.frequency * 0.7 + time * wave.speed * 35) * (wave.amplitude * 0.5)
        if (mouseRef.current.active) {
          const dx = x - mouseRef.current.x
          const dist = Math.sqrt(dx * dx)
          if (dist < 250) {
            const influence = (1 - dist / 250) * 30
            y += Math.sin(dist * 0.05 - time * 3) * influence
          }
        }
        if (x === 0) { ctx.moveTo(x, y) } else { ctx.lineTo(x, y) }
      }
      const gradient = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, height)
      gradient.addColorStop(0, `rgba(${wave.color[0]}, ${wave.color[1]}, ${wave.color[2]}, ${wave.alpha})`)
      gradient.addColorStop(0.5, `rgba(${wave.color[0]}, ${wave.color[1]}, ${wave.color[2]}, ${wave.alpha * 0.5})`)
      gradient.addColorStop(1, `rgba(${wave.color[0]}, ${wave.color[1]}, ${wave.color[2]}, 0)`)
      ctx.strokeStyle = `rgba(${wave.color[0]}, ${wave.color[1]}, ${wave.color[2]}, ${wave.alpha * 1.5})`
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()
    }

    const animate = () => {
      timeRef.current += 0.016
      const time = timeRef.current
      ctx.clearRect(0, 0, width, height)
      waves.forEach((wave, i) => drawWave(wave, time, i))
      if (mouseRef.current.active && Math.random() > 0.7) {
        createParticle(mouseRef.current.x, mouseRef.current.y)
      }
      if (Math.random() > 0.85) {
        const x = Math.random() * width
        const wave = waves[Math.floor(Math.random() * waves.length)]
        const baseY = height * wave.yOffset
        const y = baseY + Math.sin(x * wave.frequency + time * wave.speed * 60) * wave.amplitude
        createParticle(x, y)
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.01
        const lifeRatio = p.life / p.maxLife
        const alpha = (1 - lifeRatio) * 0.6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (1 - lifeRatio * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${alpha})`
        ctx.fill()
        if (p.life >= p.maxLife) particles.splice(i, 1)
      }
      if (particles.length > 150) particles.splice(0, particles.length - 150)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <section id="hjem" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" style={{ zIndex: 1 }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, transparent 0%, rgba(10,10,15,0.6) 70%, rgba(10,10,15,0.95) 100%)', zIndex: 2 }} />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ marginTop: '-5vh' }}>
        <p className="text-copper-light text-xs sm:text-sm lg:text-base font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-4 sm:mb-6 opacity-80">
          Uavhengig teknisk rådgiver
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream mb-4 leading-[1.05]">
          Lyd<br /><span className="text-gradient-copper">&amp; Akustikk</span>
        </h1>
        <p className="text-cream/60 text-sm sm:text-base lg:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                    Uavhengig rådgivning, akustiske målinger og kvalitetssikring for skoler, barnehager, kirker, møterom, idrettshaller, kulturhus og offentlige bygg – med uavhengig vurdering av universell utforming og teleslynge.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a href="#kontakt" onClick={(e) => { e.preventDefault(); document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="w-full sm:w-auto group px-8 py-3.5 bg-copper/20 text-copper-light border border-copper/50 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]">
            <Phone size={16} />
            Kontakt meg
          </a>
          <a href="#tjenester" onClick={(e) => { e.preventDefault(); document.querySelector('#tjenester')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="w-full sm:w-auto px-8 py-3.5 text-cream/70 border border-cream/20 rounded-full font-medium hover:text-cream hover:border-cream/40 transition-all duration-300 min-h-[48px]">
            Se tjenester
          </a>
        </div>
      </div>
    </section>
  )
}
