import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ScratchCard } from './ScratchCard'

describe('ScratchCard (reduced-motion / instant mode)', () => {
  it('reveals the prize on tap and fires onComplete once', async () => {
    const onComplete = vi.fn()
    render(
      <ScratchCard instant onComplete={onComplete}>
        <span>Kuota 15GB</span>
      </ScratchCard>,
    )
    await userEvent.click(screen.getByRole('button', { name: /ketuk untuk buka/i }))
    expect(onComplete).toHaveBeenCalledTimes(1)
  })
})
