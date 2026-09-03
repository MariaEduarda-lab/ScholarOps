import type { ReactNode } from 'react'
import { demoSession, InstitutionSessionContext } from './institution-session'

export function InstitutionProvider({ children }: { children: ReactNode }) {
  return <InstitutionSessionContext.Provider value={demoSession}>{children}</InstitutionSessionContext.Provider>
}
