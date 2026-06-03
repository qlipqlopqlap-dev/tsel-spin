import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TicketGrid } from './TicketGrid'

describe('TicketGrid', () => {
  it('calls onPick with the chosen ticket index', async () => {
    const onPick = vi.fn()
    render(<TicketGrid count={6} selectedIndex={null} expired={false} onPick={onPick} />)
    await userEvent.click(screen.getAllByRole('button')[2])
    expect(onPick).toHaveBeenCalledWith(2)
  })

  it('locks every ticket after a selection and marks the chosen one', () => {
    render(<TicketGrid count={6} selectedIndex={1} expired={false} onPick={() => {}} />)
    const tickets = screen.getAllByRole('button')
    tickets.forEach((t) => expect(t).toBeDisabled())
    expect(tickets[1]).toHaveTextContent('DIPILIH')
  })

  it('disables all tickets when the timer has expired', () => {
    render(<TicketGrid count={6} selectedIndex={null} expired onPick={() => {}} />)
    screen.getAllByRole('button').forEach((t) => expect(t).toBeDisabled())
  })
})
