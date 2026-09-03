import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Brand } from '../components/Brand'

export function NotFoundPage() {
  return <main className="not-found"><Brand /><Compass /><span className="eyebrow">ERRO 404</span><h1>Esta página saiu da rota</h1><p>O endereço pode ter mudado ou não existir neste protótipo.</p><Link className="button button--primary" to="/"><ArrowLeft />Voltar ao início</Link></main>
}
