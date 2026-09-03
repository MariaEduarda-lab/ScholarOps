import { useContext } from 'react'
import { InstitutionSessionContext } from './institution-session'

export function useInstitution() {
  const session = useContext(InstitutionSessionContext)
  if (!session) throw new Error('useInstitution deve ser usado dentro de InstitutionProvider')
  return session
}
