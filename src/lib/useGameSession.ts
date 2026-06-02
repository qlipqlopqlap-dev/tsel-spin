import { useCallback, useState } from 'react'
import type { Prize } from './prizes'
import { usePrefersReducedMotion } from './useReducedMotion'
import { fireConfetti } from './confetti'

/**
 * Runtime state for one game session. The win is shown inline (ResultOverlay),
 * so there is no navigation. `round` increments on play-again so the game
 * component can be re-keyed to reset its internal state.
 */
export function useGameSession() {
  const reduced = usePrefersReducedMotion()
  const [prize, setPrize] = useState<Prize | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [expired, setExpired] = useState(false)
  const [round, setRound] = useState(0)

  const reveal = useCallback(
    (won: Prize) => {
      setPrize(won)
      setRevealed(true)
      if (!reduced) fireConfetti()
    },
    [reduced],
  )

  const playAgain = useCallback(() => {
    setPrize(null)
    setRevealed(false)
    setRound((r) => r + 1)
  }, [])

  return { prize, revealed, expired, setExpired, round, reveal, playAgain, reduced }
}
