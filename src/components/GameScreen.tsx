import type { ReactNode } from 'react'
import { TicketPercent, Clock } from 'lucide-react'
import { CountdownTimer } from './CountdownTimer'
import { CAMPAIGN } from '../lib/content'

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
    <div className="relative flex items-center justify-between gap-3 rounded-3xl bg-gradient-to-b from-tsel-cream to-[#f3d896] px-4 py-3 shadow-clay ring-1 ring-inset ring-white/50">
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 font-display text-[11px] font-bold uppercase tracking-wider text-tsel-ink/65">
          <Clock className="h-3 w-3" strokeWidth={2.6} />
          Hangus dalam
        </p>
        <div className="mt-0.5 flex items-center gap-2 font-display text-[26px] font-extrabold leading-none text-tsel-red drop-shadow-[0_1px_0_rgba(124,12,30,0.18)]">
          <span aria-hidden className="inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-tsel-red" />
          {expired ? (
            <span>Hangus</span>
          ) : (
            <CountdownTimer seconds={CAMPAIGN.countdownSeconds} onExpire={onExpire} />
          )}
        </div>
      </div>
      <span
        aria-hidden
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-tsel-orange/25 to-tsel-orange/10 text-tsel-orange ring-1 ring-inset ring-tsel-orange/30"
      >
        <TicketPercent className="h-6 w-6" strokeWidth={2.3} />
      </span>
    </div>
  )
}

/**
 * Game chrome with mobile-first sizing: compact Telkomsel brand chip, a
 * celebratory intro, the big cream countdown bar, the game, and a consent
 * footer. Layout is `min-h-dvh` instead of `h-dvh` so very short viewports
 * (iPhone SE) can scroll a touch instead of clipping the footer. Safe-area
 * insets are respected for the iPhone notch + home indicator.
 */
export function GameScreen({ dapat, instruction, expired, onExpire, children }: GameScreenProps) {
  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-[radial-gradient(125%_95%_at_50%_6%,#F0315A_0%,#D81E34_36%,#A8112A_70%,#7C0C1E_100%)]">
      {/* warm gold ambient glow — clipped by PhoneFrame's overflow-hidden */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[58%] h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tsel-gold/15 blur-[64px]"
      />

      <header
        className="relative z-10 flex shrink-0 items-center justify-between px-5"
        style={{ paddingTop: 'max(12px, env(safe-area-inset-top))' }}
      >
        <span className="rounded-full bg-white px-3.5 py-1.5 font-display text-[13px] font-extrabold text-tsel-red shadow-clay-sm ring-1 ring-inset ring-white">
          {CAMPAIGN.brand}
        </span>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pt-5">
        {/* Hero — "Dobelin {kesempatan menangmu}!" is now the focal point */}
        <div className="flex flex-col items-center text-center">
          <p className="font-display text-[clamp(1.75rem,8.5vw,2.5rem)] font-extrabold leading-[1.05] text-white drop-shadow-[0_3px_0_rgba(124,12,30,0.45)]">
            <Highlight text={dapat} />
          </p>
          <p className="mx-auto mt-2.5 max-w-[34ch] text-[clamp(0.75rem,3.2vw,0.9rem)] leading-snug text-white/85">
            {instruction}
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-4">
          <CountdownBar expired={expired} onExpire={onExpire} />
        </div>

        {/* Game area — flex-grows to absorb leftover vertical room */}
        <div className="grid min-h-0 w-full flex-1 place-items-center pt-3">{children}</div>
      </div>

      <footer
        className="relative z-10 shrink-0 px-6 pt-2 text-center text-[10.5px] leading-relaxed text-white/65"
        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
      >
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
