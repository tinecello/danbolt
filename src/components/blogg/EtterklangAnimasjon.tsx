
import { useEffect, useRef } from 'react'

export default function EtterklangAnimasjon() {
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
    const rings: number[] = []
    let lastRing = 0

    const draw = () => {
      time += 0.016

      ctx.fillStyle = '#0A0A0F'
      ctx.fillRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2

      const pulse = Math.sin(time * 3) * 0.3 + 0.7
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30)
      glow.addColorStop(0, `rgba(200, 121, 65, ${0.8 * pulse})`)
      glow.addColorStop(0.5, `rgba(200, 121, 65, ${0.2 * pulse})`)
      glow.addColorStop(1, 'rgba(200, 121, 65, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      if (time - lastRing > 1.2) {
        rings.push(0)
        lastRing = time
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        rings[i] += 1.5
        const radius = rings[i]
        const alpha = Math.max(0, 1 - radius / 280)

        if (alpha <= 0) {
          rings.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(200, 121, 65, ${alpha * 0.6})`
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(cx, cy, radius * 0.7, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(212, 165, 116, ${alpha * 0.3})`
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(cx * 0.3, cy, radius * 0.5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(200, 121, 65, ${alpha * 0.15})`
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(cx * 1.7, cy, radius * 0.5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(200, 121, 65, ${alpha * 0.15})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.fillStyle = 'rgba(245, 240, 235, 0.6)'
      ctx.font = '14px Inter, sans-serif'
      ctx.fillText('Lydbølger spres i rommet', 20, h - 20)

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
