import Papa from 'papaparse'
import bomAlunoCsv from '../../../../dados/sinteticos/bom_aluno_bh_documentos_sinteticos.csv?raw'
import inteliCsv from '../../../../dados/sinteticos/inteli_documentos_sinteticos.csv?raw'
import maristaCsv from '../../../../dados/sinteticos/marista_dom_silverio_documentos_sinteticos.csv?raw'
import type { Candidate, CandidateStatus, DocumentRecord, DocumentStatus, InstitutionId, ProcessMilestone } from '../types'

interface CsvRecord {
  instituicao: InstitutionId
  edicao: string
  candidatura_id: string
  cenario_teste: string
  membro_id: string
  relacao: string
  idade: string
  categoria_documental: string
  tipo_documento: string
  obrigatoriedade: string
  arquivo_id: string
  status_documento: string
  valor_declarado: string
  valor_extraido: string
  confianca_extracao: string
  pendencia_esperada: string
  revisao_humana_esperada: string
}

const institutions: Record<InstitutionId, string> = {
  inteli: 'Inteli',
  bom_aluno_bh: 'Instituto Bom Aluno de BH',
  marista_dom_silverio: 'Colégio Marista Dom Silvério',
}
const firstNames = ['Ana', 'Bruno', 'Camila', 'Daniel', 'Elisa', 'Felipe', 'Gabriela', 'Henrique', 'Isabela', 'João', 'Larissa', 'Mateus', 'Natália', 'Otávio', 'Paula', 'Rafael', 'Sofia', 'Thiago', 'Vitória', 'Yasmin']
const lastNames = ['Almeida', 'Barbosa', 'Cardoso', 'Dias', 'Ferreira', 'Gomes', 'Lima', 'Martins', 'Nascimento', 'Oliveira', 'Pereira', 'Ramos', 'Rocha', 'Santos', 'Silva', 'Souza']
const labelize = (value: string) => value.replaceAll('_', ' ').replace(/\b\w/g, (character) => character.toUpperCase())

const normalizeDocumentStatus = (record: CsvRecord): DocumentStatus => {
  const raw = record.status_documento.toLowerCase()
  const issue = record.pendencia_esperada.toLowerCase()
  if (raw.includes('ileg') || issue.includes('ileg')) return 'ilegivel'
  if (raw.includes('incons') || issue.includes('diverg') || issue.includes('incons')) return 'inconsistente'
  if (raw === 'ok' && (issue === 'nenhuma' || issue === 'nao_se_aplica')) return 'ok'
  return 'pendente'
}

const rows = [inteliCsv, bomAlunoCsv, maristaCsv].flatMap((csv) =>
  Papa.parse<CsvRecord>(csv, { header: true, skipEmptyLines: true }).data,
)
const groupedRows = rows.reduce((groups, row) => {
  const current = groups.get(row.candidatura_id) ?? []
  current.push(row)
  groups.set(row.candidatura_id, current)
  return groups
}, new Map<string, CsvRecord[]>())

const buildCandidate = ([id, candidateRows]: [string, CsvRecord[]], index: number): Candidate => {
  const base = candidateRows[0]
  const institutionId = base.instituicao
  const documents: DocumentRecord[] = candidateRows.map((row) => {
    const pendingRaw = row.pendencia_esperada
    return {
      id: row.arquivo_id,
      category: labelize(row.categoria_documental),
      type: row.tipo_documento,
      label: labelize(row.tipo_documento),
      member: row.membro_id,
      relationship: labelize(row.relacao),
      required: labelize(row.obrigatoriedade),
      status: normalizeDocumentStatus(row),
      issue: pendingRaw === 'nenhuma' || pendingRaw === 'nao_se_aplica' ? null : labelize(pendingRaw),
      confidence: Number(row.confianca_extracao) || 0,
      declaredValue: row.valor_declarado,
      extractedValue: row.valor_extraido,
      humanReview: row.revisao_humana_esperada === 'sim',
    }
  })
  const pendingCount = documents.filter((document) => document.status === 'pendente').length
  const inconsistentCount = documents.filter((document) => document.status === 'inconsistente').length
  const attentionCount = documents.filter((document) => document.humanReview || document.status === 'ilegivel').length
  const okCount = documents.filter((document) => document.status === 'ok').length
  const progress = documents.length ? Math.round((okCount / documents.length) * 100) : 0
  const status: CandidateStatus = inconsistentCount ? 'Em revisão' : pendingCount ? 'Documentação pendente' : attentionCount ? 'Aguardando análise' : 'Apto para entrevista'
  const numberSeed = Number(id.match(/\d+/)?.[0] ?? index + 1)
  const firstName = firstNames[(index * 7 + numberSeed) % firstNames.length]
  const lastName = lastNames[(index * 11 + numberSeed) % lastNames.length]
  const secondLastName = lastNames[(index * 3 + numberSeed + 5) % lastNames.length]
  const name = `${firstName} ${lastName} ${secondLastName}`
  const members = new Set(candidateRows.map((row) => row.membro_id)).size
  const monthlyIncome = 1350 + ((numberSeed * 337) % 4650)
  const phoneDigits = String(80000000 + ((numberSeed * 7919) % 9999999)).padStart(8, '0')
  const slug = `${firstName}.${lastName}`.toLowerCase()
  const insights = [
    pendingCount > 0 ? `${pendingCount} documento(s) ainda exigem complementação.` : 'Documentos obrigatórios recebidos.',
    inconsistentCount > 0 ? `${inconsistentCount} divergência(s) de informação identificada(s).` : 'Não foram identificadas divergências automáticas.',
    attentionCount > 0 ? `${attentionCount} item(ns) precisam de interpretação humana.` : 'Extrações com boa confiança para triagem.',
  ]

  return {
    id, name, initials: `${firstName[0]}${lastName[0]}`, age: Number(base.idade) || 18,
    institutionId, institution: institutions[institutionId], edition: labelize(base.edicao), scenario: labelize(base.cenario_teste),
    status, progress,
    submittedAt: `2026-0${4 + (numberSeed % 2)}-${String(2 + (numberSeed % 25)).padStart(2, '0')}`,
    updatedAt: `Hoje, ${String(8 + (numberSeed % 9)).padStart(2, '0')}:${numberSeed % 2 ? '15' : '40'}`,
    phone: `(31) 9${phoneDigits.slice(0, 4)}-${phoneDigits.slice(4)}`, email: `${slug}${numberSeed}@email.com`,
    city: institutionId === 'inteli' ? 'São Paulo, SP' : 'Belo Horizonte, MG', familyMembers: members,
    monthlyIncome, perCapitaIncome: Math.round(monthlyIncome / Math.max(members, 1)), documents,
    pendingCount, inconsistentCount, attentionCount,
    summary: `${name} se candidatou a ${institutions[institutionId]}. O núcleo familiar informado possui ${members} membro(s), com renda mensal estimada de R$ ${monthlyIncome.toLocaleString('pt-BR')}. A análise automática organizou ${documents.length} documento(s) e destacou os pontos que merecem conferência antes da entrevista.`,
    insights,
  }
}

export const candidates = Array.from(groupedRows.entries())
  .map((entry, index) => buildCandidate(entry, index))
  .sort((a, b) => b.attentionCount + b.inconsistentCount - (a.attentionCount + a.inconsistentCount))
export const featuredCandidates = candidates.slice(0, 48)
export const metrics = {
  total: candidates.length,
  awaiting: candidates.filter((candidate) => candidate.status === 'Aguardando análise').length,
  pending: candidates.filter((candidate) => candidate.status === 'Documentação pendente').length,
  review: candidates.filter((candidate) => candidate.status === 'Em revisão').length,
  ready: candidates.filter((candidate) => candidate.status === 'Apto para entrevista').length,
}
export const milestones: ProcessMilestone[] = [
  { date: '12/05', day: '12', month: 'MAI', title: 'Abertura das inscrições', description: 'Formulário e envio dos documentos disponíveis.', state: 'done' },
  { date: '31/05', day: '31', month: 'MAI', title: 'Encerramento das inscrições', description: 'Último dia para candidaturas e complementações.', state: 'done' },
  { date: '10/06', day: '10', month: 'JUN', title: 'Triagem documental', description: 'Conferência automática e revisão das pendências.', state: 'current' },
  { date: '24/06', day: '24', month: 'JUN', title: 'Entrevistas sociais', description: 'Agenda reservada para os casos encaminhados.', state: 'next' },
  { date: '08/07', day: '08', month: 'JUL', title: 'Resultado final', description: 'Publicação dos resultados e comunicação às famílias.', state: 'next' },
]
export const institutionOptions = Object.entries(institutions).map(([value, label]) => ({ value, label }))
export const getCandidate = (id: string) => candidates.find((candidate) => candidate.id === id)
export const getCandidatesForInstitution = (institutionId: InstitutionId) =>
  candidates.filter((candidate) => candidate.institutionId === institutionId)
export const getCandidateForInstitution = (id: string, institutionId: InstitutionId) =>
  candidates.find((candidate) => candidate.id === id && candidate.institutionId === institutionId)
export const getMetricsForInstitution = (institutionId: InstitutionId) => {
  const scopedCandidates = getCandidatesForInstitution(institutionId)
  return {
    total: scopedCandidates.length,
    awaiting: scopedCandidates.filter((candidate) => candidate.status === 'Aguardando análise').length,
    pending: scopedCandidates.filter((candidate) => candidate.status === 'Documentação pendente').length,
    review: scopedCandidates.filter((candidate) => candidate.status === 'Em revisão').length,
    ready: scopedCandidates.filter((candidate) => candidate.status === 'Apto para entrevista').length,
  }
}
export const delay = <T,>(value: T, milliseconds = 280) => new Promise<T>((resolve) => window.setTimeout(() => resolve(value), milliseconds))
