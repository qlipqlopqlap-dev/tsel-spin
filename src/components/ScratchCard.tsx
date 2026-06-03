import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'

interface ScratchCardProps {
  /** Fired once when the card is considered "scratched open". */
  onComplete: () => void
  /** Fraction (0–1) of the surface that must be cleared to auto-reveal. */
  threshold?: number
  /** The prize content sitting underneath the silver coating. */
  children: ReactNode
  /** Reduced-motion: skip the canvas, reveal with a single tap instead. */
  instant?: boolean
}

const BRUSH_RADIUS = 20

/** Samples the canvas alpha channel to estimate how much has been cleared. */
function clearedRatio(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): number {
  const { width, height } = canvas
  if (!width || !height) return 0
  const data = ctx.getImageData(0, 0, width, height).data
  let cleared = 0
  let total = 0
  // sample every 20th pixel for speed
  for (let i = 3; i < data.length; i += 4 * 20) {
    total++
    if (data[i] === 0) cleared++
  }
  return total ? cleared / total : 0
}

export function ScratchCard({ onComplete, threshold = 0.5, children, instant = false }: ScratchCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const completedRef = useRef(false)
  const lastCheckRef = useRef(0)
  const [revealed, setRevealed] = useState(false)

  const complete = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    setRevealed(true)
    onComplete()
  }, [onComplete])

  // Paint the silver coating on mount (skipped in reduced-motion mode).
  useEffect(() => {
    if (instant) return
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const rect = wrap.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.max(1, Math.floor(rect.width * dpr))
    canvas.height = Math.max(1, Math.floor(rect.height * dpr))
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      complete()
      return
    }
    // Idempotent paint: reset transform + composite so a re-run (e.g. React
    // StrictMode's double-invoke) repaints the coating instead of erasing it.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalCompositeOperation = 'source-over'
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height)
    grad.addColorStop(0, '#ECECEC')
    grad.addColorStop(0.5, '#C9C9C9')
    grad.addColorStop(1, '#ADADAD')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.fillStyle = 'rgba(110,110,110,0.85)'
    ctx.font = '700 15px Poppins, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('GOSOK DI SINI', rect.width / 2, rect.height / 2)
    ctx.globalCompositeOperation = 'destination-out'
  }, [instant, complete])

  const scratch = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      if (completedRef.current) return
      if (e.type === 'pointermove' && e.buttons === 0) return
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const rect = canvas.getBoundingClientRect()
      ctx.beginPath()
      ctx.arc(e.clientX - rect.left, e.clientY - rect.top, BRUSH_RADIUS, 0, Math.PI * 2)
      ctx.fill()

      const now = performance.now()
      if (now - lastCheckRef.current > 120) {
        lastCheckRef.current = now
        if (clearedRatio(canvas, ctx) > threshold) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          complete()
        }
      }
    },
    [threshold, complete],
  )

  return (
    <div ref={wrapRef} className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-white shadow-clay">
      {/* prize layer */}
      <div className="absolute inset-0 grid place-items-center">{children}</div>

      {/* reduced-motion: tap to reveal */}
      {instant && !revealed && (
        <button
          onClick={complete}
          className="absolute inset-0 grid place-items-center bg-gradient-to-br from-silver-1 to-silver-2 font-display text-base font-bold text-neutral-600"
        >
          Ketuk untuk buka
        </button>
      )}

      {/* scratchable coating */}
      {!instant && (
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            scratch(e)
          }}
          onPointerMove={scratch}
          className={[
            'absolute inset-0 h-full w-full touch-none cursor-grab transition-opacity duration-300',
            revealed ? 'pointer-events-none opacity-0' : 'opacity-100',
          ].join(' ')}
          aria-label="Gosok kartu untuk membuka bonus"
        />
      )}
    </div>
  )
}
