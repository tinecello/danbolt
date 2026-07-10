import { useEffect, useRef } from 'react'

export default function AbsorpsjonDiffusjonAnimasjon() {
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

    const absorbWaves: { x: number; y: number; speed: number; freq: number; amp: number; alpha: number }[] = []
    for (let i = 0; i < 5; i++) {
      absorbWaves.push({
        x: 20,
        y: h * 0.3 + (i * h * 0.4) / 4,
        speed: 1.5 + Math.random() * 0.8,
        freq: 0.02 + Math.random() * 0.01,
        amp: 15 + Math.random() * 10,
        alpha: 1,
      })
    }

    const diffuseRays: { angle: number; speed: number; alpha: number; length: number }[] = []
    for (let i = 0; i < 12; i++) {
      diffuseRays.push({
        angle: -Math.PI * 0.6 + (i * Math.PI * 1.2) / 11,
        speed: 1.2 + Math.random() * 0.6,
        alpha: 1,
        length: 0,
      })
    }

    const draw = () => {
      time += 0.016

      ctx.fillStyle = '#0A0A0F'
      ctx.fillRect(0, 0, w, h)

      ctx.strokeStyle = 'rgba(245, 240, 235, 0.1)'
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(w / 2, 30)
      ctx.lineTo(w / 2, h - 30)
      ctx.stroke()
      ctx.setLineDash([])

      const leftW = w / 2 - 20
      const barrierX = leftW - 30

      ctx.fillStyle = '#1a1410'
      ctx.fillRect(barrierX, 40, 20, h - 80)

      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 2; col++) {
          ctx.fillStyle = `rgba(200, 121, 65, ${0.1 + Math.sin(time * 2 + row) * 0.05})`
          ctx.beginPath()
          ctx.arc(barrierX + 6 + col * 8, 55 + row * 50, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      absorbWaves.forEach((wave, i) => {
        wave.x += wave.speed
        if (wave.x > barrierX - 10) {
          wave.x = 20
          wave.alpha = 1
        }

        const progress = (wave.x - 20) / (barrierX - 30)
        wave.alpha = Math.max(0, 1 - progress * progress * 1.5)

        ctx.beginPath()
        ctx.moveTo(20, wave.y)

        for (let px = 20; px < wave.x; px += 2) {
          const localProgress = (px - 20) / (barrierX - 30)
          const dampen = Math.max(0, 1 - localProgress * localProgress)
          const dy = Math.sin((px - 20) * wave.freq + time * 4 + i) * wave.amp * dampen
          ctx.lineTo(px, wave.y + dy)
        }

        ctx.strokeStyle = `rgba(200, 121, 65, ${wave.alpha * 0.7})`
        ctx.lineWidth = 2
        ctx.stroke()

        if (wave.x > barrierX - 40 && wave.alpha > 0.1) {
          for (let p = 0; p < 2; p++) {
            ctx.fillStyle = `rgba(212, 165, 116, ${wave.alpha * 0.4})`
            ctx.beginPath()
            ctx.arc(
              barrierX - 5 - Math.random() * 15,
              wave.y + (Math.random() - 0.5) * 20,
              2,
              0,
              Math.PI * 2
            )
            ctx.fill()
          }
        }
      })

      ctx.fillStyle = 'rgba(200, 121, 65, 0.9)'
      ctx.font = 'bold 15px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('ABSORPSJON', leftW / 2, 25)

      ctx.fillStyle = 'rgba(245, 240, 235, 0.5)'
      ctx.font = '12px Inter, sans-serif'
      ctx.fillText('Lydenergi absorberes og slukkes', leftW / 2, h - 12)

      const rightCx = w / 2 + leftW / 2
      const rightCy = h / 2

      const surfX = w / 2 + 30
      for (let row = 0; row < 8; row++) {
        const y = 45 + row * 40
        const depths = [8, 16, 4, 12, 6, 14, 2, 10]
        const depth = depths[row] + Math.sin(time * 0.5 + row) * 2

        ctx.fillStyle = `rgba(100, 160, 140, ${0.15 + depth / 80})`
        ctx.fillRect(surfX, y - 15, depth, 30)

        ctx.strokeStyle = `rgba(100, 160, 140, 0.3)`
        ctx.strokeRect(surfX, y - 15, depth, 30)
      }

      diffuseRays.forEach((ray, i) => {
        ray.length += ray.speed
        if (ray.length > 200) {
          ray.length = 0
          ray.alpha = 1
          ray.angle = -Math.PI * 0.6 + (i * Math.PI * 1.2) / 11 + Math.sin(time + i) * 0.2
        }

        ray.alpha = Math.max(0, 1 - ray.length / 250)

        const startX = surfX + 15
        const startY = rightCy
        const endX = startX + Math.cos(ray.angle) * ray.length
        const endY = startY + Math.sin(ray.angle) * ray.length

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = `rgba(120, 180, 160, ${ray.alpha * 0.6})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        if (ray.length > 10) {
          ctx.fillStyle = `rgba(140, 200, 180, ${ray.alpha * 0.5})`
          ctx.beginPath()
          ctx.arc(endX, endY, 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.beginPath()
      for (let px = w / 2 + 10; px < surfX + 5; px += 2) {
        const dy = Math.sin((px - w / 2) * 0.04 - time * 5) * 12
        ctx.lineTo(px, rightCy + dy)
      }
      ctx.strokeStyle = 'rgba(120, 180, 160, 0.5)'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillStyle = 'rgba(120, 180, 160, 0.9)'
      ctx.font = 'bold 15px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('DIFFUSJON', rightCx, 25)

      ctx.fillStyle = 'rgba(245, 240, 235, 0.5)'
      ctx.font = '12px Inter, sans-serif'
      ctx.fillText('Lyd spredes i alle retninger', rightCx, h - 12)

      ctx.fillStyle = 'rgba(200, 121, 65, 0.6)'
      ctx.fillRect(8, h / 2 - 10, 6, 20)
      ctx.beginPath()
      ctx.moveTo(14, h / 2 - 15)
      ctx.lineTo(22, h / 2 - 20)
      ctx.lineTo(22, h / 2 + 20)
      ctx.lineTo(14, h / 2 + 15)
      ctx.closePath()
      ctx.fill()

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
