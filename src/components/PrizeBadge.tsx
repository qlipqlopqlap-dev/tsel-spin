import type { Prize } from '../lib/prizes'

interface PrizeBadgeProps {
  prize: Prize
  size?: 'sm' | 'md' | 'lg'
  /** Label colour. 'light' = white (for dark/red backgrounds). */
  tone?: 'dark' | 'light'
}

const RING = { sm: 'h-10 w-10', md: 'h-16 w-16', lg: 'h-24 w-24' }
const GLYPH = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' }
const TEXT = { sm: 'text-[11px]', md: 'text-lg', lg: 'text-2xl' }

/** Icon-in-circle + prize label, reused on the reveal and result screens. */
export function PrizeBadge({ prize, size = 'md', tone = 'dark' }: PrizeBadgeProps) {
  const Icon = prize.icon
  const labelColor = tone === 'light' ? 'text-white' : 'text-tsel-ink'
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <span className={['grid place-items-center rounded-full text-white shadow-clay', prize.accent, RING[size]].join(' ')}>
        <Icon className={GLYPH[size]} strokeWidth={2.25} />
      </span>
      <span className={['font-display font-extrabold leading-tight', labelColor, TEXT[size]].join(' ')}>
        {size === 'sm' ? prize.short : prize.label}
      </span>
    </div>
  )
}
