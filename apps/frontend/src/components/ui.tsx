import { AlertTriangle, Check, Clock3, FileQuestion, LoaderCircle } from 'lucide-react'
import type { CandidateStatus, DocumentStatus } from '../types'

export function StatusBadge({ status }: { status: CandidateStatus | DocumentStatus }) {
  const normalized = status.toLowerCase()
  const tone = normalized.includes('apto') || normalized === 'ok' || normalized.includes('aprovado')
    ? 'success'
    : normalized.includes('revis') || normalized.includes('incons')
      ? 'danger'
      : normalized.includes('pend') || normalized.includes('ileg')
        ? 'warning'
        : 'neutral'
  const Icon = tone === 'success' ? Check : tone === 'danger' ? AlertTriangle : tone === 'warning' ? FileQuestion : Clock3
  return <span className={`status status--${tone}`}><Icon size={13} />{status}</span>
}

export function PageHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <header className="page-heading">
      <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1><p>{description}</p></div>
      {action && <div className="page-heading__action">{action}</div>}
    </header>
  )
}

export function LoadingState({ label = 'Organizando informações…' }: { label?: string }) {
  return <div className="state-panel" role="status"><LoaderCircle className="spin" size={26} /><strong>{label}</strong><span>Isso leva só alguns instantes.</span></div>
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="state-panel"><FileQuestion size={28} /><strong>{title}</strong><span>{description}</span></div>
}

export function Avatar({ initials, large = false }: { initials: string; large?: boolean }) {
  return <span className={`avatar ${large ? 'avatar--large' : ''}`} aria-hidden="true">{initials}</span>
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div className="progress-wrap" aria-label={`${label ?? 'Progresso'}: ${value}%`}>
      <div className="progress"><span style={{ width: `${value}%` }} /></div>
      <small>{value}%</small>
    </div>
  )
}
