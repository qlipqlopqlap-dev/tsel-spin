import confetti from 'canvas-confetti'

const COLORS = ['#FF6B35', '#F8E6B0', '#FFFFFF', '#E8174C', '#FFD24C']

/** Celebratory burst used on prize reveal / claim. No-op-safe in tests. */
export function fireConfetti(): void {
  if (typeof window === 'undefined') return
  confetti({ particleCount: 90, spread: 72, startVelocity: 42, origin: { y: 0.55 }, colors: COLORS })
  window.setTimeout(
    () => confetti({ particleCount: 50, spread: 110, scalar: 0.9, origin: { y: 0.45 }, colors: COLORS }),
    160,
  )
}
