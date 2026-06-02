import { describe, it, expect } from 'vitest'
import { resolveGameUrl, resolveHomeUrl, resolveClaimUrl, hostGame } from './urls'
import { GAMES } from './games'

describe('resolveGameUrl', () => {
  it('uses the env URL when set', () => {
    expect(resolveGameUrl('spin', { VITE_URL_SPIN: 'https://spin.example/' })).toBe('https://spin.example/')
  })

  it('falls back to the in-app route when env is missing or empty', () => {
    expect(resolveGameUrl('spin', {})).toBe(GAMES.spin.route)
    expect(resolveGameUrl('scratch', { VITE_URL_GOSOK: '' })).toBe(GAMES.scratch.route)
  })
})

describe('resolveHomeUrl', () => {
  it('uses env home when set, otherwise /', () => {
    expect(resolveHomeUrl({ VITE_URL_HOME: 'https://home.example/' })).toBe('https://home.example/')
    expect(resolveHomeUrl({})).toBe('/')
  })
})

describe('resolveClaimUrl', () => {
  it('returns the claim URL when set, otherwise null', () => {
    expect(resolveClaimUrl({ VITE_CLAIM_URL: 'https://wap.imobile.id/sehat1/register.php' })).toBe(
      'https://wap.imobile.id/sehat1/register.php',
    )
    expect(resolveClaimUrl({})).toBeNull()
    expect(resolveClaimUrl({ VITE_CLAIM_URL: '' })).toBeNull()
  })
})

describe('hostGame', () => {
  it('maps each wrapped domain to its game (case-insensitive)', () => {
    expect(hostGame('telkomsel1.qlipmobile.com')).toBe('scratch')
    expect(hostGame('telkomsel2.qlipmobile.com')).toBe('spin')
    expect(hostGame('telkomsel3.qlipmobile.com')).toBe('egg')
    expect(hostGame('TELKOMSEL4.qlipmobile.com')).toBe('koper')
  })

  it('returns null for the landing/IP/localhost hosts', () => {
    expect(hostGame('telkomsel-landing.qlipmobile.com')).toBeNull()
    expect(hostGame('148.230.100.213')).toBeNull()
    expect(hostGame('localhost')).toBeNull()
  })
})
