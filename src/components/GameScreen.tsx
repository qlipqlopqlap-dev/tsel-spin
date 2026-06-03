import type { ReactNode } from 'react'
import { TicketPercent, Clock } from 'lucide-react'
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
 * Big cream countdown bar shown prominently below the header — the dominant
 * visual signal of urgency, replacing the old top-right chip.
 */
function CountdownBar({ expired, onExpire }: { expired: boolean; onExpire: () => void }) {
  return (
    <div className="relative flex items-center justify-between gap-3 rounded-3xl bg-gradient-to-b from-tsel-cream to-[#f3d896] px-5 py-3.5 shadow-clay ring-1 ring-inset ring-white/50">
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 font-display text-[12px] font-bold uppercase tracking-wider text-tsel-ink/65">
          <Clock className="h-3 w-3" strokeWidth={2.6} />
          Hangus dalam
        </p>
        <div className="mt-1 flex items-center gap-2 font-display text-[30px] font-extrabold leading-none text-tsel-red drop-shadow-[0_1px_0_rgba(124,12,30,0.18)]">
          <span aria-hidden className="inline-block h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-tsel-red" />
          {expired ? (
            <span>Hangus</span>
          ) : (
            <CountdownTimer seconds={CAMPAIGN.countdownSeconds} onExpire={onExpire} />
          )}
        </div>
      </div>
      <span
        aria-hidden
        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-tsel-orange/25 to-tsel-orange/10 text-tsel-orange ring-1 ring-inset ring-tsel-orange/30"
      >
        <TicketPercent className="h-7 w-7" strokeWidth={2.3} />
      </span>
    </div>
  )
}

/**
 * Single-screen game chrome (no scroll): compact Telkomsel home chip,
 * a celebratory intro (top), a big cream countdown bar (middle), the game,
 * and a consent footer kept slightly off the bottom edge.
 */
export function GameScreen({ dapat, instruction, expired, onExpire, children }: GameScreenProps) {
  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-[radial-gradient(125%_95%_at_50%_6%,#F0315A_0%,#D81E34_36%,#A8112A_70%,#7C0C1E_100%)]">
      {/* warm gold ambient glow behind the game for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[58%] h-[64vmin] w-[64vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tsel-gold/15 blur-[72px]"
      />

      <header className="relative z-10 flex shrink-0 items-center justify-between px-5 pt-3">
        <a
          href={homeUrl()}
          className="rounded-full bg-white px-3.5 py-1.5 font-display text-[13px] font-extrabold text-tsel-red shadow-clay-sm ring-1 ring-inset ring-white"
        >
          {CAMPAIGN.brand}
        </a>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pt-8">
        {/* Hero text — nudged slightly past the top toward vertical center */}
        <div className="flex flex-col items-center text-center">
          <h1 className="font-display text-[46px] font-extrabold leading-[0.95] text-tsel-gold drop-shadow-[0_3px_0_rgba(123,12,30,0.4)]">
            Selamat!
          </h1>
          <p className="mt-1 font-display text-[19px] font-extrabold leading-snug text-white drop-shadow-[0_1px_0_rgba(124,12,30,0.35)]">
            <Highlight text={dapat} />
          </p>
          <p className="mx-auto mt-1.5 max-w-[34ch] text-[13px] leading-snug text-white/85">{instruction}</p>
        </div>

        {/* Countdown — extra breathing room above */}
        <div className="mt-5">
          <CountdownBar expired={expired} onExpire={onExpire} />
        </div>

        {/* Game area */}
        <div className="grid min-h-0 w-full flex-1 place-items-center pt-3">{children}</div>
      </div>

      <footer className="relative z-10 shrink-0 px-6 pb-6 pt-2 text-center text-[11px] leading-relaxed text-white/65">
        Dengan menekan tombol klaim, kamu menyetujui{' '}
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
