import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { PhoneFrame } from './components/PhoneFrame'
import { CatchBallGate } from './components/CatchBallGate'
import { GosokPage } from './pages/GosokPage'
import './styles.css'

// Double variant — Tiket (Gosok) game served at telkomsel2double on port 5285.
// A 60s "Tangkap Bola" mission gates the undian: play it first, then continue.
function Root() {
  const [passed, setPassed] = useState(false)
  if (!passed) return <CatchBallGate onComplete={() => setPassed(true)} nextAction="gosok kartu" nextButton="GOSOK" />
  return <GosokPage />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <PhoneFrame>
        <Root />
      </PhoneFrame>
    </MotionConfig>
  </StrictMode>,
)
