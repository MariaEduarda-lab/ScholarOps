import { createContext } from 'react'
import type { InstitutionId } from '../types'

export interface InstitutionProfile {
  id: InstitutionId
  name: string
  shortName: string
  initials: string
  processName: string
  edition: string
  educationLevel: string
  description: string
}

interface AuthenticatedUser {
  id: string
  name: string
  initials: string
  role: string
  email: string
  institutionId: InstitutionId
}

export interface InstitutionSession {
  user: AuthenticatedUser
  institution: InstitutionProfile
}

const institutionProfiles: Record<InstitutionId, InstitutionProfile> = {
  inteli: {
    id: 'inteli',
    name: 'Instituto de Tecnologia e Liderança',
    shortName: 'Inteli',
    initials: 'IN',
    processName: 'Inteli Social',
    edition: 'Graduação 2026',
    educationLevel: 'Ensino superior',
    description: 'Apoio integral ou parcial para estudantes da graduação, conforme avaliação socioeconômica.',
  },
  bom_aluno_bh: {
    id: 'bom_aluno_bh',
    name: 'Instituto Bom Aluno de Belo Horizonte',
    shortName: 'Bom Aluno BH',
    initials: 'BA',
    processName: 'Seleção Bom Aluno',
    edition: 'Seleção 2026',
    educationLevel: 'Educação básica',
    description: 'Processo de identificação e acompanhamento de estudantes com critérios acadêmicos e socioeconômicos.',
  },
  marista_dom_silverio: {
    id: 'marista_dom_silverio',
    name: 'Colégio Marista Dom Silvério',
    shortName: 'Marista Dom Silvério',
    initials: 'MD',
    processName: 'Bolsa Social',
    edition: 'Bolsa Social 2026',
    educationLevel: 'Educação básica',
    description: 'Concessão de bolsas sociais mediante análise documental e avaliação socioeconômica da família.',
  },
}

// Sessão artificial. No backend, o institutionId virá do usuário autenticado
// e será aplicado também na autorização de cada consulta.
const demoUser: AuthenticatedUser = {
  id: 'USR-DEMO-001',
  name: 'Marina Souza',
  initials: 'MS',
  role: 'Assistente social',
  email: 'marina.souza@inteli.edu.br',
  institutionId: 'inteli',
}

export const demoSession: InstitutionSession = {
  user: demoUser,
  institution: institutionProfiles[demoUser.institutionId],
}

export const InstitutionSessionContext = createContext<InstitutionSession | null>(null)
