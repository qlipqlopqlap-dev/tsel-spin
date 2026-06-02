import { GAMES, type GameId } from './games'

type EnvMap = Record<string, string | undefined>

const ENV_KEY: Record<GameId, string> = {
  scratch: 'VITE_URL_GOSOK',
  spin: 'VITE_URL_SPIN',
  egg: 'VITE_URL_EGG',
  koper: 'VITE_URL_KOPER',
}

/**
 * Resolve a game's link target. Uses the per-game env URL when provided
 * (separate-domain deploys), otherwise falls back to the in-app route.
 */
export function resolveGameUrl(id: GameId, env: EnvMap): string {
  const fromEnv = env[ENV_KEY[id]]
  return fromEnv && fromEnv.length > 0 ? fromEnv : GAMES[id].route
}

export function resolveHomeUrl(env: EnvMap): string {
  const home = env.VITE_URL_HOME
  return home && home.length > 0 ? home : '/'
}

/** Registration/claim URL for the KLAIM button, or null to claim inline. */
export function resolveClaimUrl(env: EnvMap): string | null {
  const url = env.VITE_CLAIM_URL
  return url && url.length > 0 ? url : null
}

export function gameUrl(id: GameId): string {
  return resolveGameUrl(id, import.meta.env as unknown as EnvMap)
}

export function homeUrl(): string {
  return resolveHomeUrl(import.meta.env as unknown as EnvMap)
}

export function claimUrl(): string | null {
  return resolveClaimUrl(import.meta.env as unknown as EnvMap)
}

/**
 * Public hostname → game shown at that domain's root. Lets a single build/
 * instance serve every domain: each wrapped domain renders its own game at `/`,
 * while any other host (the IP, the landing domain, localhost) shows the landing.
 */
export const HOST_GAME: Record<string, GameId> = {
  'telkomsel1.qlipmobile.com': 'scratch',
  'telkomsel2.qlipmobile.com': 'spin',
  'telkomsel3.qlipmobile.com': 'egg',
  'telkomsel4.qlipmobile.com': 'koper',
}

/** Game to render at `/` for the given hostname, or null for the landing. */
export function hostGame(hostname: string): GameId | null {
  return HOST_GAME[hostname.toLowerCase()] ?? null
}
