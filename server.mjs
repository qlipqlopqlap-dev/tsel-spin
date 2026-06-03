// Zero-dependency static server for the built SPA (dist/).
// Serves hashed assets with long cache, and falls back to index.html for any
// non-file path so direct hits / refreshes work. Behind nginx → PM2
// (see ecosystem.config.cjs).

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('.', import.meta.url))
const DIST = join(ROOT, 'dist')
const HOST = process.env.HOST || '127.0.0.1'
const PORT = Number(process.env.PORT || 5285)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers)
  res.end(body)
}

async function sendFile(res, filePath, cacheControl) {
  const data = await readFile(filePath)
  send(res, 200, data, {
    'Content-Type': MIME[extname(filePath).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': cacheControl,
  })
}

const server = createServer(async (req, res) => {
  try {
    const rawPath = decodeURIComponent((req.url || '/').split('?')[0])

    if (rawPath === '/healthz') return send(res, 200, 'ok', { 'Content-Type': 'text/plain' })

    // Resolve within DIST, guarding against path traversal.
    const safePath = normalize(rawPath).replace(/^(\.\.(\/|\\|$))+/, '')
    const filePath = join(DIST, safePath)
    if (filePath !== DIST && !filePath.startsWith(DIST + sep)) {
      return send(res, 403, 'Forbidden', { 'Content-Type': 'text/plain' })
    }

    // Asset request (has extension): serve the file, else 404.
    if (extname(safePath)) {
      try {
        if ((await stat(filePath)).isFile()) {
          const immutable = safePath.startsWith('/assets/') || safePath.startsWith(sep + 'assets')
          return await sendFile(res, filePath, immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=3600')
        }
      } catch {
        /* fall through to 404 */
      }
      return send(res, 404, 'Not found', { 'Content-Type': 'text/plain' })
    }

    // No extension → SPA route → index.html (revalidate so deploys take effect).
    return await sendFile(res, join(DIST, 'index.html'), 'no-cache')
  } catch {
    send(res, 500, 'Server error', { 'Content-Type': 'text/plain' })
  }
})

server.listen(PORT, HOST, () => {
  console.log(`tsel-spin-double serving ${DIST} on http://${HOST}:${PORT}`)
})
