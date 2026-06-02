import {
  Sparkles,
  RotateCw,
  Egg,
  Briefcase,
  MousePointerClick,
  Hand,
  Hammer,
  Gift,
  PlayCircle,
  Send,
  CircleDot,
  type LucideIcon,
} from 'lucide-react'
import type { PrizeId } from './prizes'

export type GameId = 'scratch' | 'spin' | 'egg' | 'koper'

export interface GameStep {
  icon: LucideIcon
  title: string
  desc: string
}

export interface GameConfig {
  id: GameId
  route: string
  /** Short name for cards/links. */
  name: string
  /** Hero icon. */
  icon: LucideIcon
  /** Hero lead. Text inside {curly braces} is highlighted gold. */
  lead: string
  instruction: string
  /** Idle CTA label (e.g. "Mulai Gosok"). */
  cta: string
  /** Title of the "how to play" block. */
  steps: GameStep[]
}

/** Wheel segment — used only by the spin game. */
export interface WheelSegment {
  prizeId: PrizeId
  label: string
  /** Sector fill + label colour. */
  fill: string
  text: string
}

export const WHEEL_SEGMENTS: WheelSegment[] = [
  { prizeId: 'iphone17', label: 'iPhone 17', fill: '#F5A623', text: '#7a3d00' },
  { prizeId: 'kuota15', label: 'Kuota 15GB', fill: '#F0695A', text: '#6a160d' },
  { prizeId: 'pulsa50', label: 'Pulsa 50rb', fill: '#F6C944', text: '#6e4d00' },
  { prizeId: 'kuota5', label: 'Kuota 5GB', fill: '#2DB9A0', text: '#06463b' },
  { prizeId: 'pulsa25', label: 'Pulsa 25rb', fill: '#F0883C', text: '#6e3500' },
  { prizeId: 'voucher', label: 'Voucher', fill: '#E98C6E', text: '#6a2c17' },
]

export const GAMES: Record<GameId, GameConfig> = {
  scratch: {
    id: 'scratch',
    route: '/gosok',
    name: 'Gosok Kartu',
    icon: Sparkles,
    lead: 'Kamu dapat {1 tiket} yang bisa dibuka!',
    instruction: 'Pilih salah satu tiket di bawah untuk membuka hadiah kuotamu',
    cta: 'Mulai Gosok',
    steps: [
      { icon: MousePointerClick, title: 'Pilih Tiket', desc: 'Tap 1 dari 6 kartu tiket yang tersedia.' },
      { icon: Sparkles, title: 'Gosok Kartu', desc: 'Gosok permukaan perak untuk membuka hadiah.' },
      { icon: Gift, title: 'Klaim Hadiah', desc: 'Tekan KLAIM, hadiah langsung dikirim ke nomormu.' },
    ],
  },
  spin: {
    id: 'spin',
    route: '/spin',
    name: 'Putar Roda',
    icon: RotateCw,
    lead: 'Kamu dapat {1 putaran} roda keberuntungan!',
    instruction: 'Putar roda di bawah untuk membuka hadiah kuotamu',
    cta: 'Putar Sekarang',
    steps: [
      { icon: PlayCircle, title: 'Tekan Putar', desc: 'Tap tombol SPIN di tengah roda.' },
      { icon: RotateCw, title: 'Tunggu Berhenti', desc: 'Roda berputar dan berhenti di hadiahmu.' },
      { icon: Gift, title: 'Klaim Hadiah', desc: 'Tekan KLAIM, hadiah langsung dikirim ke nomormu.' },
    ],
  },
  egg: {
    id: 'egg',
    route: '/egg',
    name: 'Pecahkan Telur',
    icon: Egg,
    lead: 'Kamu dapat {1 telur} yang bisa dipecahkan!',
    instruction: 'Pilih salah satu telur di bawah untuk membuka hadiah kuotamu',
    cta: 'Pecahkan Sekarang',
    steps: [
      { icon: Hand, title: 'Pilih Telur', desc: 'Tap 1 dari 6 telur misteri yang tersedia.' },
      { icon: Hammer, title: 'Pecahkan', desc: 'Telur akan pecah dan hadiah muncul di dalamnya.' },
      { icon: Gift, title: 'Klaim Hadiah', desc: 'Tekan KLAIM, hadiah langsung dikirim ke nomormu.' },
    ],
  },
  koper: {
    id: 'koper',
    route: '/koper',
    name: 'Pilih Koper',
    icon: Briefcase,
    lead: 'Kamu dapat {1 koper} yang bisa dibuka!',
    instruction: 'Pilih salah satu koper di bawah untuk membuka hadiah kuotamu',
    cta: 'Pilih Koper',
    steps: [
      { icon: CircleDot, title: 'Pilih Koper', desc: 'Tap 1 dari 6 koper di panggung.' },
      { icon: Briefcase, title: 'Buka Kopernya', desc: 'Koper terbuka dan hadiah ada di dalamnya.' },
      { icon: Send, title: 'Klaim Hadiah', desc: 'Tekan KLAIM, hadiah langsung dikirim ke nomormu.' },
    ],
  },
}

export const GAME_LIST: GameConfig[] = [GAMES.scratch, GAMES.spin, GAMES.egg, GAMES.koper]

export function isGameId(value: string): value is GameId {
  return value in GAMES
}
