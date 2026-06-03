import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { PhoneFrame } from './components/PhoneFrame'
import { GosokPage } from './pages/GosokPage'
import './styles.css'

// Double variant — Tiket (Gosok) game served at telkomsel2double on port 5285.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <PhoneFrame>
        <GosokPage />
      </PhoneFrame>
    </MotionConfig>
  </StrictMode>,
)
