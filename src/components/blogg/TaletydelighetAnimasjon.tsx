import { useEffect, useRef } from 'react'

export default function TaletydelighetAnimasjon() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = 800
    const h = 400
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    let time = 0

    interface SpeechParticle {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      size: number
      modulated: boolean
    }

    const particles: SpeechParticle[] = []
    let lastSpawn = 0

    interface NoiseParticle {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      size: number
    }

    const noiseParticles: NoiseParticle[] = []

    const listenerY = [h * 0.25, h * 0.5, h * 0.75]
    const listenerX = w - 60

    const modulation = (t: number) => Math.sin(t * 8) * Math.sin(t * 3) * 0.5 + 0.5

    const draw = () => {
      time += 0.016

      ctx.fillStyle = '#0A0A0F'
      ctx.fillRect(0, 0, w, h)

      const mod = modulation(time)

      const speakerX = 50
      const speakerY = h / 2

      ctx.fillStyle = 'rgba(200, 121, 65, 0.8)'
      ctx.beginPath()
      ctx.arc(speakerX, speakerY - 25, 12, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(speakerX, speakerY + 8, 15, 22, 0, Math.PI, 0)
      ctx.fill()

      ctx.fillStyle = `rgba(240, 200, 160, ${0.5 + mod * 0.5})`
      ctx.beginPath()
      ctx.ellipse(speakerX, speakerY - 22, 4 + mod * 3, 2 + mod * 2, 0, 0, Math.PI * 2)
      ctx.fill()

      for (let i = 0; i < 3; i++) {
        const ringR = ((time * 60 + i * 40) % 120)
        const alpha = Math.max(0, 1 - ringR / 120) * (0.3 + mod * 0.3)
        ctx.beginPath()
        ctx.arc(speakerX + 5, speakerY - 15, ringR, -0.3, 0.3)
        ctx.strokeStyle = `rgba(200, 121, 65, ${alpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      if (time - lastSpawn > 0.06) {
        lastSpawn = time
        for (let row = 0; row < 3; row++) {
          particles.push({
            x: speakerX + 20,
            y: listenerY[row] + (Math.random() - 0.5) * 30,
            vx: 2.5 + Math.random() * 0.5,
            vy: (Math.random() - 0.5) * 0.3,
            life: 0,
            maxLife: 250,
            size: 2 + mod * 2,
            modulated: true,
          })
        }

        if (Math.random() > 0.3) {
          noiseParticles.push({
            x: speakerX + 30 + Math.random() * 100,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            life: 0,
            size: 1.5 + Math.random(),
          })
        }
      }

      const reverbZoneStart = w * 0.35
      const reverbZoneEnd = w * 0.65

      ctx.fillStyle = 'rgba(180, 100, 50, 0.05)'
      ctx.fillRect(reverbZoneStart, 0, reverbZoneEnd - reverbZoneStart, h)
      ctx.strokeStyle = 'rgba(180, 100, 50, 0.15)'
      ctx.strokeRect(reverbZoneStart, 0, reverbZoneEnd - reverbZoneStart, h)

      ctx.fillStyle = 'rgba(180, 100, 50, 0.4)'
      ctx.font = '11px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('ROMMET (etterklang)', (reverbZoneStart + reverbZoneEnd) / 2, 18)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy + Math.sin(time * 3 + p.life * 0.05) * 0.3
        p.life++

        const lifeProgress = p.life / p.maxLife
        const inReverbZone = p.x > reverbZoneStart && p.x < reverbZoneEnd

        const particleMod = modulation(time - p.life * 0.02)
        const isCoherent = particleMod > 0.3

        let alpha = Math.max(0, 1 - lifeProgress * 1.5)
        if (inReverbZone) {
          alpha *= 0.7
        }

        if (isCoherent) {
          ctx.fillStyle = `rgba(140, 200, 160, ${alpha * 0.8})`
        } else {
          ctx.fillStyle = `rgba(200, 121, 65, ${alpha * 0.6})`
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (1 - lifeProgress * 0.3), 0, Math.PI * 2)
        ctx.fill()

        if (p.life > p.maxLife || p.x > w - 40) {
          particles.splice(i, 1)
        }
      }

      for (let i = noiseParticles.length - 1; i >= 0; i--) {
        const p = noiseParticles[i]
        p.x += p.vx
        p.y += p.vy
        p.life++

        const alpha = Math.max(0, 1 - p.life / 120) * 0.4

        ctx.fillStyle = `rgba(120, 100, 100, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        if (p.life > 120) {
          noiseParticles.splice(i, 1)
        }
      }

      for (let row = 0; row < 3; row++) {
        const ly = listenerY[row]

        ctx.fillStyle = 'rgba(140, 180, 200, 0.7)'
        ctx.beginPath()
        ctx.arc(listenerX, ly - 10, 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.ellipse(listenerX, ly + 6, 10, 14, 0, Math.PI, 0)
        ctx.fill()

        ctx.fillStyle = `rgba(140, 200, 160, ${0.3 + mod * 0.3})`
        ctx.beginPath()
        ctx.arc(listenerX - 8, ly - 10, 4, 0, Math.PI * 2)
        ctx.fill()

        if (mod > 0.4) {
          ctx.strokeStyle = `rgba(140, 200, 160, ${(mod - 0.4) * 0.6})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(listenerX, ly, 20 + mod * 5, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

      const stiY = h - 35
      const stiX = w / 2
      const stiWidth = 200
      const stiHeight = 16

      ctx.fillStyle = 'rgba(245, 240, 235, 0.08)'
      ctx.beginPath()
      ctx.roundRect(stiX - stiWidth / 2, stiY, stiWidth, stiHeight, 8)
      ctx.fill()

      const stiValue = 0.45 + mod * 0.35
      const fillWidth = stiWidth * ((stiValue - 0.3) / 0.7)

      let stiR: number, stiG: number, stiB: number
      if (stiValue < 0.5) {
        stiR = 200
        stiG = 80 + (stiValue - 0.3) / 0.2 * 100
        stiB = 50
      } else if (stiValue < 0.7) {
        stiR = 200 - (stiValue - 0.5) / 0.2 * 100
        stiG = 180
        stiB = 80
      } else {
        stiR = 100 - (stiValue - 0.7) / 0.3 * 50
        stiG = 200
        stiB = 140
      }

      ctx.fillStyle = `rgba(${stiR}, ${stiG}, ${stiB}, 0.8)`
      ctx.beginPath()
      ctx.roundRect(stiX - stiWidth / 2, stiY, fillWidth, stiHeight, 8)
      ctx.fill()

      ctx.fillStyle = 'rgba(245, 240, 235, 0.8)'
      ctx.font = 'bold 13px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`STI = ${stiValue.toFixed(2)}`, stiX, stiY + stiHeight + 18)

      let quality: string
      if (stiValue > 0.75) quality = 'Utmerket'
      else if (stiValue > 0.6) quality = 'God'
      else if (stiValue > 0.45) quality = 'Akseptabel'
      else quality = 'Dårlig'

      ctx.fillStyle = `rgba(${stiR}, ${stiG}, ${stiB}, 0.7)`
      ctx.font = '11px Inter, sans-serif'
      ctx.fillText(quality, stiX + stiWidth / 2 + 40, stiY + stiHeight + 18)

      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(140, 200, 160, 0.7)'
      ctx.font = '10px Inter, sans-serif'
      ctx.fillText('● Tale (modulert signal)', 15, stiY + stiHeight + 18)
      ctx.fillStyle = 'rgba(120, 100, 100, 0.5)'
      ctx.font = '10px Inter, sans-serif'
      ctx.fillText('● Støy (bakgrunn)', 160, stiY + stiHeight + 18)

      ctx.textAlign = 'left'
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <div className="w-full rounded-xl overflow-hidden border border-copper/10 my-6">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        className="bg-dark"
      />
    </div>
  )
}
