import { GameScreen } from '../components/GameScreen'
import { ResultOverlay } from '../components/ResultOverlay'
import { SpinWheel } from '../components/games/SpinWheel'
import { GAMES } from '../lib/games'
import { getPrize } from '../lib/prizes'
import { useGameSession } from '../lib/useGameSession'

const WIN = getPrize('kuota15')

export function SpinPage() {
  const { prize, revealed, expired, setExpired, reveal, reduced } = useGameSession()
  return (
    <>
      <GameScreen
        dapat={GAMES.spin.lead}
        instruction={GAMES.spin.instruction}
        expired={expired}
        onExpire={() => setExpired(true)}
      >
        <SpinWheel disabled={expired || revealed} reduced={reduced} prize={WIN} onResult={reveal} />
      </GameScreen>
      <ResultOverlay open={revealed} prize={prize} />
    </>
  )
}
