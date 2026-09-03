import { HeartHandshake } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand ${compact ? 'brand--compact' : ''}`} to="/" aria-label="ScholarOps — início">
      <span className="brand__mark"><HeartHandshake size={24} strokeWidth={2.3} /></span>
      <span>
        <strong>Scholar<span>Ops</span></strong>
        {!compact && <small>Assistência que transforma</small>}
      </span>
    </Link>
  )
}
