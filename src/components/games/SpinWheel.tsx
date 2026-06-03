import { useState } from 'react'
import { Check } from 'lucide-react'
import { WHEEL_SEGMENTS } from '../../lib/games'
import type { Prize } from '../../lib/prizes'

interface SpinWheelProps {
  disabled: boolean
  reduced: boolean
  /** The prize the wheel will land on. */
  prize: Prize
  onResult: (prize: Prize) => void
}

const CENTER = 100
const RADIUS = 94
const SEG = 360 / WHEEL_SEGMENTS.length

/** Point on the wheel at `deg` measured clockwise from the top (12 o'clock). */
function pointAt(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180
  return { x: CENTER + r * Math.sin(rad), y: CENTER - r * Math.cos(rad) }
}

function sectorPath(index: number): string {
  const a0 = index * SEG
  const a1 = (index + 1) * SEG
  const p0 = pointAt(a0, RADIUS)
  const p1 = pointAt(a1, RADIUS)
  return `M ${CENTER} ${CENTER} L ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${RADIUS} ${RADIUS} 0 0 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} Z`
}

export function SpinWheel({ disabled, reduced, prize, onResult }: SpinWheelProps) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [done, setDone] = useState(false)

  function spin() {
    if (spinning || done || disabled) return
    const index = WHEEL_SEGMENTS.findIndex((s) => s.prizeId === prize.id)
    const segCenter = index * SEG + SEG / 2
    const targetMod = ((360 - segCenter) % 360 + 360) % 360
    const turns = reduced ? 0 : 5
    const base = rotation - (rotation % 360)
    let next = base + turns * 360 + targetMod
    if (next <= rotation) next += 360

    setSpinning(true)
    setRotation(next)

    const finish = () => {
      setSpinning(false)
      setDone(true)
      onResult(prize)
    }
    // Match the CSS transition duration below (or resolve instantly when reduced).
    window.setTimeout(finish, reduced ? 60 : 4300)
  }

  return (
    <div className="relative mx-auto w-full max-w-[360px] px-2">
      {/* fixed pointer */}
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1">
        <div className="h-0 w-0 border-x-[14px] border-t-[22px] border-x-transparent border-t-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" />
      </div>

      <svg viewBox="0 0 200 200" className="w-full drop-shadow-[0_10px_18px_rgba(74,4,17,0.4)]">
        {/* gold rim */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS + 5} fill="#E9B949" />
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: '100px 100px',
            transition: reduced || !spinning ? 'none' : 'transform 4.2s cubic-bezier(0.16,0.84,0.3,1)',
          }}
        >
          {WHEEL_SEGMENTS.map((seg, i) => {
            const labelPos = pointAt(i * SEG + SEG / 2, RADIUS * 0.6)
            const words = seg.label.split(' ')
            return (
              <g key={seg.prizeId}>
                <path d={sectorPath(i)} fill={seg.fill} stroke="#fff" strokeWidth={1.2} />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Poppins, sans-serif"
                  fontWeight={700}
                  fontSize={9}
                  fill={seg.text}
                >
                  {words.map((w, wi) => (
                    <tspan key={wi} x={labelPos.x} dy={wi === 0 ? (words.length > 1 ? '-0.35em' : '0.32em') : '1em'}>
                      {w}
                    </tspan>
                  ))}
                </text>
              </g>
            )
          })}
          {/* rim studs */}
          {WHEEL_SEGMENTS.map((_, i) => {
            const p = pointAt(i * SEG, RADIUS - 2)
            return <circle key={i} cx={p.x} cy={p.y} r={2.2} fill="#fff" />
          })}
        </g>
      </svg>

      {/* center hub / spin button */}
      <button
        type="button"
        onClick={spin}
        disabled={disabled || spinning || done}
        aria-label="Putar roda"
        className="absolute left-1/2 top-1/2 grid h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white font-display text-xs font-extrabold text-tsel-ink shadow-clay ring-4 ring-tsel-gold transition-transform duration-150 active:scale-95 disabled:opacity-100"
      >
        {done ? <Check className="h-5 w-5 text-emerald-600" strokeWidth={3} /> : spinning ? 'WAIT' : 'SPIN'}
      </button>
    </div>
  )
}
