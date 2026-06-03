import { Lock } from 'lucide-react'

interface TicketGridProps {
  count: number
  /** Index the user committed to (others lock), or null. */
  selectedIndex: number | null
  /** Timer expired — all tickets become void. */
  expired: boolean
  onPick: (index: number) => void
}

/** A silver scratch ticket styled after the campaign banner ("GOSOK DI SINI"). */
function Ticket({
  index,
  state,
  onPick,
}: {
  index: number
  state: 'idle' | 'selected' | 'locked' | 'expired'
  onPick: (i: number) => void
}) {
  const interactive = state === 'idle'
  return (
    <button
      type="button"
      disabled={!interactive}
      onClick={() => onPick(index)}
      aria-label={`Tiket ${index + 1}`}
      className={[
        'relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl',
        'font-display text-[13px] font-bold tracking-wide shadow-clay transition-transform duration-150',
        interactive ? 'cursor-pointer active:scale-[0.96]' : 'cursor-not-allowed',
        state === 'expired' || state === 'locked' ? 'opacity-50 saturate-50' : '',
        'bg-gradient-to-br from-silver-1 via-[#d6d6d6] to-silver-2 text-neutral-500',
        'ring-1 ring-inset ring-white/40',
      ].join(' ')}
    >
      {/* ticket notches */}
      <span aria-hidden className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-tsel-magenta" />
      <span aria-hidden className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-tsel-magenta" />

      {state === 'locked' || state === 'expired' ? (
        <Lock className="h-7 w-7 text-neutral-500" strokeWidth={2.5} />
      ) : state === 'selected' ? (
        <span className="text-tsel-ink">DIPILIH</span>
      ) : (
        <span className="leading-tight">
          GOSOK
          <br />
          DI SINI
        </span>
      )}
    </button>
  )
}

export function TicketGrid({ count, selectedIndex, expired, onPick }: TicketGridProps) {
  const hasPick = selectedIndex !== null
  return (
    <div className="grid w-full max-w-[22rem] grid-cols-3 gap-2.5">
      {Array.from({ length: count }, (_, i) => {
        let state: 'idle' | 'selected' | 'locked' | 'expired' = 'idle'
        if (expired) state = 'expired'
        else if (selectedIndex === i) state = 'selected'
        else if (hasPick) state = 'locked'
        return <Ticket key={i} index={i} state={state} onPick={onPick} />
      })}
    </div>
  )
}
