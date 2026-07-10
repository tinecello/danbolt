import { useEffect, useRef } from 'react'

export default function NS8175Animasjon() {
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

    const klasseA = 0.4
    const klasseB = 0.5
    const klasseC = 0.6
    const klasseD = 0.8
    const maxScale = 1.0

    const meterX = w / 2
    const meterY = h * 0.55
    const meterR = 110
    const startAngle = Math.PI * 0.75
    const endAngle = Math.PI * 2.25

    const draw = () => {
      time += 0.016

      ctx.fillStyle = '#0A0A0F'
      ctx.fillRect(0, 0, w, h)

      const cycle = (time * 0.4) % 4
      let etterklang: number
      let klasseLabel: string
      let klasseColor: string

      if (cycle < 1) {
        etterklang = klasseA + Math.sin(time * 2) * 0.05
        klasseLabel = 'KLASSE A – UTMERKET'
        klasseColor = '#4CAF50'
      } else if (cycle < 2) {
        etterklang = klasseB + Math.sin(time * 2) * 0.05
        klasseLabel = 'KLASSE B – GOD'
        klasseColor = '#8BC34A'
      } else if (cycle < 3) {
        etterklang = klasseC + Math.sin(time * 2) * 0.05
        klasseLabel = 'KLASSE C – MINSTEKRAV'
        klasseColor = '#FFC107'
      } else {
        etterklang = klasseD - 0.05 + Math.sin(time * 2) * 0.05
        klasseLabel = 'KLASSE D – UNDER KRAV'
        klasseColor = '#F44336'
      }

      ctx.fillStyle = 'rgba(245, 240, 235, 0.9)'
      ctx.font = 'bold 18px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('NS 8175 – Etterklangstid i klasserom', meterX, 35)

      ctx.fillStyle = klasseColor
      ctx.font = 'bold 14px Inter, sans-serif'
      ctx.fillText(klasseLabel, meterX, 58)

      const segments = [
        { start: 0, end: klasseA, color: '#4CAF50', label: 'A' },
        { start: klasseA, end: klasseB, color: '#8BC34A', label: 'B' },
        { start: klasseB, end: klasseC, color: '#FFC107', label: 'C' },
        { start: klasseC, end: klasseD, color: '#FF9800', label: '' },
        { start: klasseD, end: maxScale, color: '#F44336', label: 'D' },
      ]

      segments.forEach(seg => {
        const segStart = startAngle + (seg.start / maxScale) * (endAngle - startAngle)
        const segEnd = startAngle + (seg.end / maxScale) * (endAngle - startAngle)

        ctx.beginPath()
        ctx.arc(meterX, meterY, meterR, segStart, segEnd)
        ctx.strokeStyle = seg.color
        ctx.lineWidth = 18
        ctx.lineCap = 'butt'
        ctx.stroke()
      })

      const markerPositions = [
        { val: klasseA, label: 'A (0.4s)', color: '#4CAF50' },
        { val: klasseB, label: 'B (0.5s)', color: '#8BC34A' },
        { val: klasseC, label: 'C (0.6s)', color: '#FFC107' },
        { val: klasseD, label: 'D (0.8s)', color: '#FF9800' },
      ]

      markerPositions.forEach(m => {
        const angle = startAngle + (m.val / maxScale) * (endAngle - startAngle)
        const mx = meterX + Math.cos(angle) * meterR
        const my = meterY + Math.sin(angle) * meterR

        ctx.fillStyle = '#F5F0EB'
        ctx.beginPath()
        ctx.arc(mx, my, 4, 0, Math.PI * 2)
        ctx.fill()

        const lx = meterX + Math.cos(angle) * (meterR + 32)
        const ly = meterY + Math.sin(angle) * (meterR + 32)
        ctx.fillStyle = m.color
        ctx.font = 'bold 11px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(m.label, lx, ly + 4)
      })

      const needleAngle = startAngle + (etterklang / maxScale) * (endAngle - startAngle)
      const nx = meterX + Math.cos(needleAngle) * (meterR - 5)
      const ny = meterY + Math.sin(needleAngle) * (meterR - 5)

      ctx.beginPath()
      ctx.moveTo(meterX, meterY)
      ctx.lineTo(nx, ny)
      ctx.strokeStyle = '#F5F0EB'
      ctx.lineWidth = 3
      ctx.stroke()

      ctx.fillStyle = '#0A0A0F'
      ctx.beginPath()
      ctx.arc(meterX, meterY, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#C87941'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillStyle = '#F5F0EB'
      ctx.font = 'bold 26px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(etterklang.toFixed(2) + 's', meterX, meterY + 50)

      ctx.fillStyle = 'rgba(245, 240, 235, 0.5)'
      ctx.font = '12px Inter, sans-serif'
      ctx.fillText('etterklangstid', meterX, meterY + 68)

      for (let i = 0; i <= 10; i++) {
        const val = i * 0.1
        const angle = startAngle + (val / maxScale) * (endAngle - startAngle)
        const innerR = meterR - 25
        const outerR = meterR - 18

        ctx.beginPath()
        ctx.moveTo(meterX + Math.cos(angle) * innerR, meterY + Math.sin(angle) * innerR)
        ctx.lineTo(meterX + Math.cos(angle) * outerR, meterY + Math.sin(angle) * outerR)
        ctx.strokeStyle = 'rgba(245, 240, 235, 0.2)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      const infoY = h - 40
      ctx.fillStyle = 'rgba(200, 121, 65, 0.1)'
      ctx.beginPath()
      ctx.roundRect(w * 0.15, infoY - 15, w * 0.7, 30, 6)
      ctx.fill()
      ctx.strokeStyle = 'rgba(200, 121, 65, 0.2)'
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.fillStyle = 'rgba(245, 240, 235, 0.6)'
      ctx.font = '12px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Klasse C (0.6 sek) = lovkrav i TEK17 for skolebygg', meterX, infoY + 5)

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
