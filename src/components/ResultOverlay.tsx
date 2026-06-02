import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, PartyPopper, ShieldCheck } from 'lucide-react'
import type { Prize } from '../lib/prizes'
import { PrizeBadge } from './PrizeBadge'
import { Button } from './Button'
import { CAMPAIGN } from '../lib/content'
import { claimUrl } from '../lib/urls'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'
import { fireConfetti } from '../lib/confetti'

interface ResultOverlayProps {
  open: boolean
  prize: Prize | null
}

/** Full-screen win overlay shared by every game. Claiming happens inline. */
export function ResultOverlay({ open, prize }: ResultOverlayProps) {
  const reduced = usePrefersReducedMotion()
  const [claimed, setClaimed] = useState(false)

  function claim() {
    // When a registration URL is configured, KLAIM sends the user there
    // (the real conversion). Otherwise show the inline success state.
    const url = claimUrl()
    if (url) {
      window.location.assign(url)
      return
    }
    setClaimed(true)
    if (!reduced) fireConfetti()
  }

  return (
    <AnimatePresence>
      {open && prize && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Hasil undian"
            initial={{ scale: 0.85, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-[24rem] rounded-[2rem] bg-white p-6 text-center shadow-clay"
          >
            <span className="mx-auto mb-2 grid h-14 w-14 place-items-center rounded-full bg-tsel-gold text-tsel-ink shadow-clay">
              <PartyPopper className="h-8 w-8" strokeWidth={2.5} />
            </span>
            <h2 className="font-display text-3xl font-extrabold text-tsel-ink">Selamat!</h2>
            <p className="mb-4 mt-0.5 text-sm text-neutral-500">Kamu memenangkan hadiah</p>

            <PrizeBadge prize={prize} size="lg" />
            <p className="mx-auto mt-3 max-w-[30ch] text-sm leading-relaxed text-neutral-600">{prize.desc}</p>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-tsel-gold/40 px-3 py-1 text-xs font-semibold text-tsel-ink">
              <ShieldCheck className="h-4 w-4" />
              {CAMPAIGN.validUntil}
            </div>

            <div className="mt-5">
              {claimed ? (
                <div className="flex items-center justify-center gap-2 rounded-full bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  <Check className="h-5 w-5" />
                  Berhasil diklaim! Diproses 1x24 jam.
                </div>
              ) : (
                <Button variant="claim" onClick={claim}>
                  KLAIM SEKARANG
                </Button>
              )}
            </div>

            {claimed && (
              <p className="mt-3 text-xs leading-relaxed text-neutral-500">
                Hadiah dikirim otomatis ke nomor Telkomsel-mu. Hubungi {CAMPAIGN.callCenter} bila perlu.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
