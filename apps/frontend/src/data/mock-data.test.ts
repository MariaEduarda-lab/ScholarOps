import { describe, expect, it } from 'vitest'
import { candidates, getCandidate, getCandidateForInstitution, getCandidatesForInstitution, institutionOptions } from './mock-data'

describe('base sintética de candidaturas', () => {
  it('consolida candidaturas das três instituições', () => {
    expect(candidates.length).toBeGreaterThan(100)
    expect(new Set(candidates.map((candidate) => candidate.institutionId)).size).toBe(3)
    expect(institutionOptions).toHaveLength(3)
  })

  it('mantém os documentos vinculados à candidatura correta', () => {
    const candidate = candidates[0]
    expect(candidate.documents.length).toBeGreaterThan(0)
    expect(candidate.documents.every((document) => document.id)).toBe(true)
    expect(getCandidate(candidate.id)).toEqual(candidate)
  })

  it('calcula indicadores coerentes com os documentos', () => {
    for (const candidate of candidates) {
      expect(candidate.progress).toBeGreaterThanOrEqual(0)
      expect(candidate.progress).toBeLessThanOrEqual(100)
      expect(candidate.pendingCount).toBe(candidate.documents.filter((document) => document.status === 'pendente').length)
    }
  })

  it('isola candidaturas pelo vínculo institucional', () => {
    const inteliCandidates = getCandidatesForInstitution('inteli')
    expect(inteliCandidates).toHaveLength(100)
    expect(inteliCandidates.every((candidate) => candidate.institutionId === 'inteli')).toBe(true)

    const externalCandidate = candidates.find((candidate) => candidate.institutionId !== 'inteli')
    expect(externalCandidate).toBeDefined()
    expect(getCandidateForInstitution(externalCandidate!.id, 'inteli')).toBeUndefined()
  })
})
