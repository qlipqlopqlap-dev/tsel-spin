import type { ReactNode } from 'react'
import { Clock, Sparkles } from 'lucide-react'
import { CountdownTimer } from './CountdownTimer'
import { CAMPAIGN } from '../lib/content'
import { homeUrl } from '../lib/urls'

interface GameScreenProps {
  /** "Kamu dapat ..." line; text in {curly braces} is highlighted gold. */
  dapat: string
  /** One-line instruction below the lead. */
  instruction: string
  expired: boolean
  onExpire: () => void
  /** The game UI — centered in the remaining space. */
  children: ReactNode
}

const FAQ_URL = 'https://content.imobile.id/sehat1/faq/'

/** Highlights the {braced} portion of a string in gold. */
function Highlight({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(\{[^}]*\})/g)
        .filter(Boolean)
        .map((part, i) =>
          part.startsWith('{') ? (
            <span key={i} className="text-tsel-gold">
              {part.slice(1, -1)}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
    </>
  )
}

/**
 * Single-screen game chrome (no scroll): compact brand + countdown header,
 * a celebratory intro, the game, and a consent footer.
 */
export function GameScreen({ dapat, instruction, expired, onExpire, children }: GameScreenProps) {
  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-[radial-gradient(125%_95%_at_50%_6%,#F0315A_0%,#D81E34_36%,#A8112A_70%,#7C0C1E_100%)]">
      {/* soft spotlight behind the game for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[55%] h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tsel-gold/15 blur-[64px]"
      />

      <header className="relative z-10 flex shrink-0 items-center justify-between px-5 pt-4">
        <a
          href={homeUrl()}
          className="rounded-full bg-white px-3 py-1.5 font-display text-sm font-extrabold text-tsel-red shadow-clay-sm"
        >
          {CAMPAIGN.brand}
        </a>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-tsel-ink/55 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-inset ring-white/20">
          <Clock className="h-3.5 w-3.5 text-tsel-gold" />
          {expired ? (
            'Hangus'
          ) : (
            <CountdownTimer seconds={CAMPAIGN.countdownSeconds} onExpire={onExpire} className="text-tsel-gold" />
          )}
        </span>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-5">
        <div className="flex flex-col items-center text-center">
          <span className="mb-2 grid h-11 w-11 place-items-center rounded-full bg-tsel-gold/90 text-tsel-ink shadow-clay">
            <Sparkles className="h-6 w-6" strokeWidth={2.5} />
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-none text-tsel-gold drop-shadow-[0_3px_0_rgba(123,12,30,0.35)]">
            Selamat!
          </h1>
          <p className="mt-2 font-display text-lg font-bold leading-snug text-white">
            <Highlight text={dapat} />
          </p>
          <p className="mx-auto mt-1.5 max-w-[30ch] text-sm leading-snug text-white/80">{instruction}</p>
        </div>

        <div className="grid w-full place-items-center">{children}</div>
      </div>

      <footer className="relative z-10 shrink-0 px-6 pb-4 pt-2 text-center text-[11px] leading-relaxed text-white/65">
        Dengan menekan KLAIM, kamu menyetujui{' '}
        <a
          href={FAQ_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-tsel-gold underline underline-offset-2"
        >
          Syarat &amp; Ketentuan
        </a>{' '}
        Telkomsel.
        <br />
        {CAMPAIGN.validUntil}.
      </footer>
    </main>
  )
}
