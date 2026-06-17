import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { PhoneFrame } from './components/PhoneFrame'
import { CatchBallGate } from './components/CatchBallGate'
import { GosokPage } from './pages/GosokPage'
import './styles.css'

// Double variant — Tiket (Gosok) game served at telkomsel2double on port 5285.
// A 60s "Tangkap Bola" mission gates the undian: play it first, then continue.
// Tangkap Bola gate temporarily disabled for this variant — flip to true to
// re-enable (files kept intact). Only koper-double keeps the gate active.
const GATE_ENABLED = false
function Root() {
  const [passed, setPassed] = useState(false)
  if (GATE_ENABLED && !passed)
    return <CatchBallGate onComplete={() => setPassed(true)} nextAction="gosok kartu" nextButton="GOSOK" />
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
