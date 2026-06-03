import { useCallback, useState } from 'react'
import { GameScreen } from '../components/GameScreen'
import { ResultOverlay } from '../components/ResultOverlay'
import { TicketGrid } from '../components/TicketGrid'
import { ScratchSheet } from '../components/ScratchSheet'
import { CAMPAIGN } from '../lib/content'
import { GAMES } from '../lib/games'
import { getPrize } from '../lib/prizes'
import { useGameSession } from '../lib/useGameSession'

const WIN = getPrize('pulsa50')

export function GosokPage() {
  const { prize, revealed, expired, setExpired, reveal, reduced } = useGameSession()
  const [picked, setPicked] = useState<number | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handlePick = useCallback(
    (i: number) => {
      if (expired || picked !== null) return
      setPicked(i)
      setSheetOpen(true)
    },
    [expired, picked],
  )

  const handleScratched = useCallback(() => {
    setSheetOpen(false)
    reveal(WIN)
  }, [reveal])

  const handleCloseSheet = useCallback(() => {
    setSheetOpen(false)
    // Backed out before scratching → unlock the tickets.
    if (!revealed) setPicked(null)
  }, [revealed])

  return (
    <>
      <GameScreen
        dapat={GAMES.scratch.lead}
        instruction={GAMES.scratch.instruction}
        expired={expired}
        onExpire={() => setExpired(true)}
      >
        {revealed && prize ? (
          <ResultOverlay prize={prize} />
        ) : (
          <TicketGrid count={CAMPAIGN.ticketCount} selectedIndex={picked} expired={expired} onPick={handlePick} />
        )}
      </GameScreen>

      <ScratchSheet
        open={sheetOpen}
        prize={WIN}
        instant={reduced}
        onScratched={handleScratched}
        onClose={handleCloseSheet}
      />
    </>
  )
}
