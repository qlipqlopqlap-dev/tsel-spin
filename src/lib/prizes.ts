import { Wifi, Smartphone, Ticket, Trophy, type LucideIcon } from 'lucide-react'

export type PrizeId =
  | 'kuota5'
  | 'kuota15'
  | 'pulsa25'
  | 'pulsa50'
  | 'voucher'
  | 'iphone17'

export interface Prize {
  id: PrizeId
  /** Full label shown on the result screen, e.g. "Kuota 15GB". */
  label: string
  /** Short label for compact chips. */
  short: string
  /** One-line description of the reward. */
  desc: string
  /** Relative draw weight (higher = more common). */
  weight: number
  icon: LucideIcon
  /** Tailwind classes for the prize's accent badge. */
  accent: string
}

export const PRIZES: Prize[] = [
  {
    id: 'kuota5',
    label: 'Kuota 5GB',
    short: '5GB',
    desc: 'Internet 5GB berlaku 7 hari di semua jaringan.',
    weight: 30,
    icon: Wifi,
    accent: 'bg-emerald-500',
  },
  {
    id: 'pulsa25',
    label: 'Pulsa 25rb',
    short: '25rb',
    desc: 'Pulsa Rp25.000 langsung masuk ke nomormu.',
    weight: 25,
    icon: Smartphone,
    accent: 'bg-tsel-orange',
  },
  {
    id: 'kuota15',
    label: 'Kuota 15GB',
    short: '15GB',
    desc: 'Internet 15GB berlaku 30 hari di semua jaringan.',
    weight: 20,
    icon: Wifi,
    accent: 'bg-sky-500',
  },
  {
    id: 'pulsa50',
    label: 'Pulsa 50rb',
    short: '50rb',
    desc: 'Pulsa Rp50.000 langsung masuk ke nomormu.',
    weight: 15,
    icon: Smartphone,
    accent: 'bg-amber-500',
  },
  {
    id: 'voucher',
    label: 'Voucher Belanja',
    short: 'Voucher',
    desc: 'Voucher belanja Rp100.000 dari partner Telkomsel.',
    weight: 9,
    icon: Ticket,
    accent: 'bg-violet-500',
  },
  {
    id: 'iphone17',
    label: 'iPhone 17',
    short: 'iPhone 17',
    desc: 'Grand prize! iPhone 17 256GB resmi Telkomsel.',
    weight: 1,
    icon: Trophy,
    accent: 'bg-slate-800',
  },
]

const PRIZE_BY_ID = new Map(PRIZES.map((p) => [p.id, p]))

export function isPrizeId(value: string): value is PrizeId {
  return PRIZE_BY_ID.has(value as PrizeId)
}

export function getPrize(id: PrizeId): Prize {
  const prize = PRIZE_BY_ID.get(id)
  if (!prize) throw new Error(`Unknown prize id: ${id}`)
  return prize
}

/**
 * Weighted random prize draw. `rng` is injectable so the logic is testable
 * with a deterministic source.
 */
export function pickPrize(rng: () => number = Math.random): Prize {
  const total = PRIZES.reduce((sum, p) => sum + p.weight, 0)
  let roll = rng() * total
  for (const prize of PRIZES) {
    roll -= prize.weight
    if (roll < 0) return prize
  }
  return PRIZES[0]
}
