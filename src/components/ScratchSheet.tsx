import { AnimatePresence, motion } from 'framer-motion'
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
}

/**
 * Centered modal that hosts the scratch interaction for the chosen ticket.
 * No close affordance: once a ticket is picked, the user must scratch it
 * (every ticket reveals the same prize anyway). The only escape is a refresh.
 */
export function ScratchSheet({ open, prize, instant, onScratched }: ScratchSheetProps) {
  return (
    <AnimatePresence>
      {open && prize && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div aria-hidden className="absolute inset-0 bg-black/60" />

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
