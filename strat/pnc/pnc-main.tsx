import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PNCEngagementPlan from './pnc_ipe'
import '../solutionengineering/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PNCEngagementPlan />
  </StrictMode>,
)

