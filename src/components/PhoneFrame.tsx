import type { ReactNode } from 'react'

/**
 * Mobile-only container. The UI is designed for a phone; on wider viewports we
 * simply center a ~460px column over a dark backdrop (no desktop layout).
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-[#15060b]">
      <div className="relative w-full max-w-[460px] overflow-hidden bg-gradient-to-b from-tsel-red via-tsel-magenta to-tsel-crimson shadow-2xl">
        {/* decorative clay blobs — purely cosmetic */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-24 h-48 w-48 rounded-full bg-tsel-orange/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-[40%] h-56 w-56 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  )
}
