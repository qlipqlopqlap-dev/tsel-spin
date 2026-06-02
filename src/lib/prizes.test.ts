import { describe, it, expect } from 'vitest'
import { PRIZES, pickPrize, isPrizeId, getPrize } from './prizes'

describe('pickPrize', () => {
  it('returns the first prize when rng yields 0', () => {
    expect(pickPrize(() => 0).id).toBe(PRIZES[0].id)
  })

  it('returns the last prize when rng yields ~1', () => {
    expect(pickPrize(() => 0.999999).id).toBe(PRIZES[PRIZES.length - 1].id)
  })

  it('distributes draws proportionally to weights', () => {
    const N = 10_000
    const counts: Record<string, number> = {}
    // Deterministic sweep across the cumulative distribution.
    for (let i = 0; i < N; i++) {
      const p = pickPrize(() => i / N)
      counts[p.id] = (counts[p.id] ?? 0) + 1
    }
    const total = PRIZES.reduce((s, p) => s + p.weight, 0)
    for (const prize of PRIZES) {
      const expected = (prize.weight / total) * N
      expect(Math.abs((counts[prize.id] ?? 0) - expected)).toBeLessThan(N * 0.02)
    }
  })

  it('always returns a valid prize id', () => {
    for (let i = 0; i < 100; i++) {
      expect(isPrizeId(pickPrize().id)).toBe(true)
    }
  })
})

describe('isPrizeId / getPrize', () => {
  it('validates known and unknown ids', () => {
    expect(isPrizeId('kuota15')).toBe(true)
    expect(isPrizeId('not-a-prize')).toBe(false)
  })

  it('getPrize returns the matching prize', () => {
    expect(getPrize('iphone17').label).toBe('iPhone 17')
  })

  it('getPrize throws on an unknown id', () => {
    // @ts-expect-error — exercising the runtime guard
    expect(() => getPrize('xxx')).toThrow()
  })
})
