import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { CountdownTimer } from './CountdownTimer'

describe('CountdownTimer', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('renders the initial time as MM:SS', () => {
    render(<CountdownTimer seconds={65} />)
    expect(screen.getByRole('timer')).toHaveTextContent('01:05')
  })

  it('counts down once per second', () => {
    render(<CountdownTimer seconds={5} />)
    act(() => vi.advanceTimersByTime(2000))
    expect(screen.getByRole('timer')).toHaveTextContent('00:03')
  })

  it('fires onExpire exactly once at zero', () => {
    const onExpire = vi.fn()
    render(<CountdownTimer seconds={2} onExpire={onExpire} />)
    act(() => vi.advanceTimersByTime(5000))
    expect(onExpire).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('timer')).toHaveTextContent('00:00')
  })
})
