import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'gold' | 'claim' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const VARIANTS: Record<Variant, string> = {
  // white pill, deep-red text — the campaign's main CTA style
  primary: 'bg-white text-tsel-ink shadow-clay',
  gold: 'bg-tsel-gold text-tsel-ink shadow-clay',
  // elegant minimalist gold — used for the KLAIM action
  claim: 'bg-gradient-to-b from-[#FAD45E] to-[#F2B705] text-[#5A3B00] shadow-clay',
  ghost: 'bg-white/15 text-white ring-1 ring-inset ring-white/40 backdrop-blur-sm',
}

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-6',
        'font-display text-base font-bold tracking-wide',
        'transition-transform duration-150 active:scale-[0.97]',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
