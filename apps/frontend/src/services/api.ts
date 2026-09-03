import { delay, getCandidateForInstitution, getCandidatesForInstitution, getMetricsForInstitution } from '../data/mock-data'
import type { Candidate, InstitutionId, ProcessMetrics } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'
const mockFallbackEnabled = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false'

interface CandidateListResponse {
  items: Candidate[]
  total: number
  limit: number
  offset: number
}

interface DecisionPayload {
  decision: 'Aprovar para entrevista' | 'Solicitar revisão' | 'Não encaminhar'
  reason: string
}

interface IngestionResponse {
  id: string
  status: string
  rowsReceived: number
  candidatesUpserted: number
  documentsUpserted: number
  errors: Array<{ row: number; message: string }>
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

async function request<T>(path: string, institutionId: InstitutionId, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'X-Institution-Id': institutionId,
      ...(options?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options?.headers,
    },
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({ detail: 'Não foi possível concluir a operação.' }))
    throw new ApiError(response.status, body.detail ?? 'Não foi possível concluir a operação.')
  }
  return response.json() as Promise<T>
}

async function withFallback<T>(operation: () => Promise<T>, fallback: () => T | Promise<T>): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    if (!mockFallbackEnabled || (error instanceof ApiError && error.status < 500)) throw error
    return delay(await fallback(), 180)
  }
}

export const scholarApi = {
  listCandidates(institutionId: InstitutionId, limit = 50): Promise<CandidateListResponse> {
    return withFallback(
      () => request<CandidateListResponse>(`/candidates?limit=${limit}`, institutionId),
      () => {
        const scoped = getCandidatesForInstitution(institutionId)
        return { items: scoped.slice(0, limit), total: scoped.length, limit, offset: 0 }
      },
    )
  },

  getCandidate(candidateId: string, institutionId: InstitutionId): Promise<Candidate | undefined> {
    return withFallback(
      () => request<Candidate>(`/candidates/${encodeURIComponent(candidateId)}`, institutionId),
      () => getCandidateForInstitution(candidateId, institutionId),
    )
  },

  getMetrics(institutionId: InstitutionId): Promise<ProcessMetrics> {
    return withFallback(
      () => request<ProcessMetrics>('/metrics', institutionId),
      () => ({ ...getMetricsForInstitution(institutionId), approved: 0, rejected: 0 }),
    )
  },

  createDecision(candidateId: string, institutionId: InstitutionId, payload: DecisionPayload) {
    return withFallback(
      () => request(`/candidates/${encodeURIComponent(candidateId)}/decisions`, institutionId, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
      () => ({ id: `local-${Date.now()}`, ...payload }),
    )
  },

  runAnalysis(candidateId: string, institutionId: InstitutionId) {
    return request(`/candidates/${encodeURIComponent(candidateId)}/analysis`, institutionId, { method: 'POST' })
  },

  patchCandidate(candidateId: string, institutionId: InstitutionId, changes: Partial<Candidate>) {
    return request<Candidate>(`/candidates/${encodeURIComponent(candidateId)}`, institutionId, {
      method: 'PATCH',
      body: JSON.stringify(changes),
    })
  },

  ingestRows(institutionId: InstitutionId, rows: Record<string, unknown>[], sourceName = 'api') {
    return request<IngestionResponse>('/ingestions/rows', institutionId, {
      method: 'POST',
      body: JSON.stringify({ rows, sourceName }),
    })
  },

  uploadTable(institutionId: InstitutionId, file: File) {
    const form = new FormData()
    form.append('file', file)
    return request<IngestionResponse>('/ingestions/file', institutionId, { method: 'POST', body: form })
  },
}
