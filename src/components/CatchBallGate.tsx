import { useEffect } from 'react'
import gameHtml from '../games/tangkap-bola.html?raw'

interface CatchBallGateProps {
  /** Fired when the 60s "Tangkap Bola" mission is finished and the user taps continue. */
  onComplete: () => void
}

/**
 * 60-second "Tangkap Bola" mini-game shown before the undian. The game is a
 * self-contained HTML/JS document rendered in an isolated iframe (so its global
 * game loop, styles and timers can't clash with the host app). When the mission
 * ends and the user taps the result button, the document posts
 * `catchball:done` to the parent and we hand control to the real game.
 */
export function CatchBallGate({ onComplete }: CatchBallGateProps) {
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data === 'catchball:done') onComplete()
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [onComplete])

  return (
    <iframe
      title="Tangkap Bola"
      srcDoc={gameHtml}
      className="block h-svh w-full border-0"
    />
  )
}
