import type { ReactNode } from 'react'
import { TicketPercent } from 'lucide-react'
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
    <div className="relative mx-1 flex items-center justify-between gap-3 rounded-3xl bg-tsel-cream px-5 py-3 shadow-clay-sm ring-1 ring-inset ring-white/40">
      <div className="min-w-0">
        <p className="font-display text-[13px] font-semibold leading-tight text-tsel-ink/70">Hangus dalam</p>
        <div className="mt-0.5 flex items-center gap-2 font-display text-[28px] font-extrabold leading-none text-tsel-red">
          <span aria-hidden className="inline-block h-2 w-2 shrink-0 rounded-full bg-tsel-red" />
          {expired ? (
            <span>Hangus</span>
          ) : (
            <CountdownTimer seconds={CAMPAIGN.countdownSeconds} onExpire={onExpire} />
          )}
        </div>
      </div>
      <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-tsel-orange/15 text-tsel-orange">
        <TicketPercent className="h-7 w-7" strokeWidth={2.2} />
      </span>
    </div>
  )
}

/**
 * Single-screen game chrome (no scroll): compact Telkomsel home chip,
 * a celebratory intro, the big countdown bar, the game, and a consent footer.
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
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-4 px-5 pt-2">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-display text-[44px] font-extrabold leading-none text-tsel-gold drop-shadow-[0_3px_0_rgba(123,12,30,0.35)]">
            Selamat!
          </h1>
          <p className="mt-2 font-display text-[19px] font-extrabold leading-snug text-white">
            <Highlight text={dapat} />
          </p>
          <p className="mx-auto mt-1.5 max-w-[34ch] text-[13px] leading-snug text-white/85">{instruction}</p>
        </div>

        <CountdownBar expired={expired} onExpire={onExpire} />

        <div className="grid min-h-0 w-full flex-1 place-items-center">{children}</div>
      </div>

      <footer className="relative z-10 shrink-0 px-6 pb-4 pt-2 text-center text-[11px] leading-relaxed text-white/65">
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
