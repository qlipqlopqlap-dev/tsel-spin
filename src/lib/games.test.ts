import { describe, it, expect } from 'vitest'
import { GAMES, GAME_LIST, WHEEL_SEGMENTS, isGameId } from './games'
import { PRIZES } from './prizes'

describe('game registry', () => {
  it('every game knows its own route and id', () => {
    for (const game of GAME_LIST) {
      expect(GAMES[game.id]).toBe(game)
      expect(game.route.startsWith('/')).toBe(true)
    }
  })

  it('isGameId validates known/unknown ids', () => {
    expect(isGameId('spin')).toBe(true)
    expect(isGameId('egg')).toBe(true)
    expect(isGameId('nope')).toBe(false)
  })
})

describe('spin wheel', () => {
  it('has a segment for every prize so any draw can land', () => {
    const segmentPrizeIds = WHEEL_SEGMENTS.map((s) => s.prizeId).sort()
    const prizeIds = PRIZES.map((p) => p.id).sort()
    expect(segmentPrizeIds).toEqual(prizeIds)
  })

  it('has no duplicate segments', () => {
    const ids = WHEEL_SEGMENTS.map((s) => s.prizeId)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
