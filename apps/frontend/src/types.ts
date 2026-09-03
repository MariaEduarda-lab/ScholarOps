export type InstitutionId = 'inteli' | 'bom_aluno_bh' | 'marista_dom_silverio'
export type DocumentStatus = 'ok' | 'pendente' | 'inconsistente' | 'ilegivel'
export type CandidateStatus =
  | 'Aguardando análise'
  | 'Em revisão'
  | 'Documentação pendente'
  | 'Apto para entrevista'
  | 'Aprovado'
  | 'Reprovado'

export interface DocumentRecord {
  id: string
  category: string
  type: string
  label: string
  member: string
  relationship: string
  required: string
  status: DocumentStatus
  issue: string | null
  confidence: number
  declaredValue: string
  extractedValue: string
  humanReview: boolean
}

export interface Candidate {
  id: string
  name: string
  initials: string
  age: number
  institutionId: InstitutionId
  institution: string
  edition: string
  scenario: string
  status: CandidateStatus
  progress: number
  submittedAt: string
  updatedAt: string
  phone: string
  email: string
  city: string
  familyMembers: number
  monthlyIncome: number
  perCapitaIncome: number
  documents: DocumentRecord[]
  pendingCount: number
  inconsistentCount: number
  attentionCount: number
  summary: string
  insights: string[]
}

export interface ProcessMilestone {
  date: string
  day: string
  month: string
  title: string
  description: string
  state: 'done' | 'current' | 'next'
}
