import { useEffect, useRef, useState } from 'react'

interface CountdownTimerProps {
  /** Initial duration in seconds. */
  seconds: number
  /** Called once when the timer reaches zero. */
  onExpire?: () => void
  className?: string
}

function format(total: number): string {
  const mm = String(Math.floor(total / 60)).padStart(2, '0')
  const ss = String(total % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

/** Counts down from `seconds`, rendering MM:SS with tabular figures. */
export function CountdownTimer({ seconds, onExpire, className = '' }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(seconds)
  const firedRef = useRef(false)

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (remaining === 0 && !firedRef.current) {
      firedRef.current = true
      onExpire?.()
    }
  }, [remaining, onExpire])

  return (
    <span className={`tabular-nums ${className}`} aria-live="polite" role="timer">
      {format(remaining)}
    </span>
  )
}
