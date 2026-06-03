import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Prize } from '../lib/prizes'
import { ScratchCard } from './ScratchCard'
import { PrizeBadge } from './PrizeBadge'

interface ScratchSheetProps {
  open: boolean
  prize: Prize | null
  /** Reduced motion → tap to reveal instead of scratching. */
  instant: boolean
  /** Fired shortly after the card is scratched open. */
  onScratched: () => void
  onClose: () => void
}

/** Centered modal that hosts the scratch interaction for the chosen ticket. */
export function ScratchSheet({ open, prize, instant, onScratched, onClose }: ScratchSheetProps) {
  return (
    <AnimatePresence>
      {open && prize && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gosok tiket"
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-[24rem] rounded-[2rem] bg-gradient-to-b from-tsel-crimson to-[#7d0c1e] p-6 text-white shadow-clay"
          >
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-center font-display text-2xl font-extrabold">Gosok Tiketmu!</h2>
            <p className="mb-5 mt-1 text-center text-sm text-white/85">
              {instant ? 'Ketuk kartu untuk membuka bonusmu.' : 'Gosok area perak untuk membuka bonusmu.'}
            </p>

            <ScratchCard
              key={prize.id}
              instant={instant}
              onComplete={() => window.setTimeout(onScratched, instant ? 150 : 850)}
            >
              <PrizeBadge prize={prize} size="lg" />
            </ScratchCard>

            <p className="mt-5 text-center text-xs font-medium uppercase tracking-widest text-white/70">
              Tiket lainnya terkunci
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
