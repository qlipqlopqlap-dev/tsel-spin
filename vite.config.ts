import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Hosts allowed to reach the dev/preview server behind the reverse proxy.
const ALLOWED_HOSTS = ['telkomsel2.qlipmobile.com']

// Single-game SPA (Putar Roda). One page rendered at '/', no router.
// Dev/preview bind to the game's own port so the landing's localhost links work.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Bind to IPv4 loopback only (nginx proxies to 127.0.0.1). Never 0.0.0.0.
  server: { host: '127.0.0.1', port: 5281, allowedHosts: ALLOWED_HOSTS },
  preview: { host: '127.0.0.1', port: 5281, allowedHosts: ALLOWED_HOSTS },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
