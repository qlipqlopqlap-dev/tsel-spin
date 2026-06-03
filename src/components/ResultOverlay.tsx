import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Loader2, Check } from 'lucide-react'
import type { Prize } from '../lib/prizes'
import { claimUrl } from '../lib/urls'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'
import { fireConfetti } from '../lib/confetti'

interface ResultOverlayProps {
  prize: Prize
}

/**
 * Inline result panel rendered inside the game area when the user wins.
 * Renders the "Selamat Kamu Menang" title, the orange prize ticket card with
 * the big amount, and the cream claim button. The game's header + countdown
 * above (provided by GameScreen) stays visible so the page reads as one piece.
 */
export function ResultOverlay({ prize }: ResultOverlayProps) {
  const reduced = usePrefersReducedMotion()
  const [connecting, setConnecting] = useState(false)
  const [claimed, setClaimed] = useState(false)

  // Celebrate as soon as the panel mounts.
  useEffect(() => {
    if (!reduced) fireConfetti()
  }, [reduced])

  function claim() {
    const url = claimUrl()
    if (url) {
      setConnecting(true)
      // Briefly show "Menghubungkan ke Telkomsel", then hand off to the claim flow.
      window.setTimeout(() => window.location.assign(url), 900)
      return
    }
    setClaimed(true)
  }

  const showUnit = Boolean(prize.bigUnit)

  return (
    <motion.div
      role="region"
      aria-label="Kamu menang"
      initial={{ scale: 0.94, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      className="w-full text-center"
    >
      {/* ★ Selamat Kamu Menang ★ */}
      <h2 className="flex items-center justify-center gap-2.5 font-display text-[clamp(1.05rem,4.6vw,1.4rem)] font-extrabold text-tsel-gold drop-shadow-[0_2px_0_rgba(124,12,30,0.5)]">
        <Star className="h-5 w-5 fill-tsel-gold text-tsel-gold" strokeWidth={2} />
        Selamat
        <Star className="h-5 w-5 fill-tsel-gold text-tsel-gold" strokeWidth={2} />
      </h2>

      {/* Orange ticket card with side notches */}
      <div className="relative mt-3 mx-auto max-w-[20rem]">
        <span
          aria-hidden
          className="absolute left-0 top-1/2 z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tsel-ink"
        />
        <span
          aria-hidden
          className="absolute right-0 top-1/2 z-10 h-7 w-7 -translate-y-1/2 translate-x-1/2 rounded-full bg-tsel-ink"
        />
        <div className="rounded-[2rem] bg-gradient-to-b from-[#FFC97A] via-[#FF9F4A] to-[#FF6B35] px-5 py-5 shadow-clay ring-1 ring-inset ring-white/30">
          <p className="mx-auto max-w-[22ch] font-display text-[13px] font-semibold leading-tight text-white">
            {prize.tagline}
          </p>
          <div className="mt-2.5 flex flex-col items-center leading-none">
            <span className="font-display text-[clamp(3.5rem,18vw,5rem)] font-extrabold leading-[0.85] text-white drop-shadow-[0_5px_0_rgba(160,40,12,0.35)]">
              {prize.bigValue}
            </span>
            {showUnit && (
              <span className="mt-2 font-display text-[clamp(1.25rem,5vw,1.6rem)] font-extrabold tracking-[0.04em] text-white drop-shadow-[0_3px_0_rgba(160,40,12,0.3)]">
                {prize.bigUnit}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Cream claim button (or connecting / claimed state) */}
      <div className="mx-auto mt-4 max-w-[20rem]">
        {claimed ? (
          <div className="flex items-center justify-center gap-2 rounded-3xl bg-tsel-cream px-5 py-3 font-display text-sm font-extrabold text-tsel-red shadow-clay-sm">
            <Check className="h-5 w-5" />
            Bonus berhasil diklaim!
          </div>
        ) : connecting ? (
          <div className="flex items-center justify-center gap-2 rounded-3xl bg-tsel-cream px-5 py-3 font-display text-sm font-extrabold text-tsel-red shadow-clay-sm">
            <Loader2 className="h-5 w-5 animate-spin" />
            Menghubungkan ke Telkomsel…
          </div>
        ) : (
          <button
            type="button"
            onClick={claim}
            className="block w-full rounded-3xl bg-tsel-cream px-5 py-2.5 shadow-clay-sm ring-1 ring-inset ring-white/40 transition-transform active:scale-[0.98]"
          >
            <span className="block font-display text-[clamp(1rem,4.5vw,1.2rem)] font-extrabold leading-tight text-tsel-red">
              Klik Disini Untuk Klaim
            </span>
            <span className="mt-0.5 block text-[11px] font-semibold text-tsel-ink/70">
              (Menghubungkan ke Telkomsel)
            </span>
          </button>
        )}
      </div>
    </motion.div>
  )
}
