import { useEffect, useMemo } from 'react'
import gameHtml from '../games/tangkap-bola.html?raw'

interface CatchBallGateProps {
  /** Fired when the 60s "Tangkap Bola" mission is finished and the user taps continue. */
  onComplete: () => void
  /** Action phrase in the result subtext, e.g. "putar spin wheel" / "gosok kartu". */
  nextAction: string
  /** Short uppercase action on the continue button, e.g. "SPIN" / "GOSOK". */
  nextButton: string
}

/**
 * 60-second "Tangkap Bola" mini-game shown before the undian. The game is a
 * self-contained HTML/JS document rendered in an isolated iframe (so its global
 * game loop, styles and timers can't clash with the host app). The result copy
 * is tailored to the undian that follows via the __NEXT_ACTION__/__NEXT_BTN__
 * placeholders. When the mission ends and the user taps the result button, the
 * document posts `catchball:done` and we hand control to the real game.
 */
export function CatchBallGate({ onComplete, nextAction, nextButton }: CatchBallGateProps) {
  const html = useMemo(
    () => gameHtml.replace(/__NEXT_ACTION__/g, nextAction).replace(/__NEXT_BTN__/g, nextButton),
    [nextAction, nextButton],
  )

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data === 'catchball:done') onComplete()
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [onComplete])

  return <iframe title="Tangkap Bola" srcDoc={html} className="block h-svh w-full border-0" />
}
