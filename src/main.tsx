import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { PhoneFrame } from './components/PhoneFrame'
import { SpinPage } from './pages/SpinPage'
import './styles.css'

// Single-game app (Putar Roda). Renders one game inside the shared phone
// frame — no router needed; the "home"/claim links are plain <a href> targets
// resolved from VITE_URL_HOME / VITE_CLAIM_URL (see src/lib/urls.ts).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <PhoneFrame>
        <SpinPage />
      </PhoneFrame>
    </MotionConfig>
  </StrictMode>,
)
