import { useState } from 'react'
import { AlertTriangle, ArrowRight, Check, CheckCircle2, FileText, Mail, MessageCircle, RotateCcw, ShieldAlert, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getCandidatesForInstitution } from '../data/mock-data'
import { Avatar, PageHeading, ProgressBar, StatusBadge } from '../components/ui'
import { useInstitution } from '../context/useInstitution'

type Decision = 'Aprovar para entrevista' | 'Solicitar revisão' | 'Não encaminhar'

export function OperationsPage() {
  const { institution } = useInstitution()
  const queue = getCandidatesForInstitution(institution.id).filter((candidate) => candidate.attentionCount > 0 || candidate.pendingCount > 0).slice(0, 12)
  const [current, setCurrent] = useState(0)
  const [decision, setDecision] = useState<Decision | null>(null)
  const [reason, setReason] = useState('')
  const [completed, setCompleted] = useState(0)
  const candidate = queue[current % queue.length]
  const confirmDecision = () => { if (!reason.trim()) return; setDecision(null); setReason(''); setCompleted((value) => value + 1); setCurrent((value) => value + 1) }

  return <>
    <PageHeading eyebrow={`${institution.shortName.toUpperCase()} · CENTRAL DE ANÁLISE`} title="Uma candidatura por vez" description={`Fila exclusiva de ${institution.processName}. Revise sinais, consulte evidências e registre sua avaliação profissional.`} action={<div className="queue-progress"><span><strong>{completed}</strong> revisadas hoje</span><span>{Math.max(queue.length - completed, 0)} na fila</span></div>} />
    <div className="review-layout">
      <main className="review-card card"><header className="review-profile"><div><Avatar initials={candidate.initials} large /><span><small>{candidate.id}</small><h2>{candidate.name}</h2><p>{candidate.institution} · {candidate.edition}</p></span></div><StatusBadge status={candidate.status} /></header>
        <div className="review-progress"><span>Completude documental</span><ProgressBar value={candidate.progress} /></div>
        <section className="review-summary"><span className="eyebrow">RESUMO PARA ANÁLISE</span><p>{candidate.summary}</p><Link to={`/app/inscricoes/${candidate.id}`}>Abrir candidatura completa <ArrowRight size={15} /></Link></section>
        <section><div className="review-section-title"><span className="eyebrow">SINAIS IDENTIFICADOS</span><small>Confira antes de decidir</small></div><div className="review-signals">
          {candidate.inconsistentCount > 0 && <article className="signal signal--danger"><ShieldAlert /><div><strong>{candidate.inconsistentCount} inconsistência(s) encontrada(s)</strong><p>Há valores ou informações que não coincidem entre documentos.</p></div></article>}
          {candidate.pendingCount > 0 && <article className="signal signal--warning"><AlertTriangle /><div><strong>{candidate.pendingCount} pendência(s) documental(is)</strong><p>Alguns itens obrigatórios estão ausentes ou incompletos.</p></div></article>}
          <article className="signal signal--success"><CheckCircle2 /><div><strong>{candidate.documents.filter((item) => item.status === 'ok').length} documento(s) sem ressalvas</strong><p>Itens lidos com boa confiança e sem divergências automáticas.</p></div></article>
        </div></section>
        <section><div className="review-section-title"><span className="eyebrow">AMOSTRA DE DOCUMENTOS</span><Link to={`/app/inscricoes/${candidate.id}`}>Ver todos</Link></div><div className="review-docs">{candidate.documents.slice(0, 4).map((document) => <div key={document.id}><FileText /><span><strong>{document.label}</strong><small>{document.relationship}</small></span><StatusBadge status={document.status} /></div>)}</div></section>
        <footer className="decision-bar"><button className="decision decision--reject" onClick={() => setDecision('Não encaminhar')}><X />Não encaminhar</button><button className="decision decision--review" onClick={() => setDecision('Solicitar revisão')}><RotateCcw />Pedir revisão</button><button className="decision decision--approve" onClick={() => setDecision('Aprovar para entrevista')}><Check />Encaminhar</button></footer>
      </main>
      <aside className="review-aside"><section className="card"><span className="eyebrow">CONTATO RÁPIDO</span><p>Dúvidas precisam ser confirmadas com a pessoa candidata.</p><button className="button button--soft button--full"><MessageCircle />Enviar mensagem</button><button className="button button--ghost button--full"><Mail />Ver contatos</button></section><section className="ethics-card"><ShieldAlert /><strong>Atenção à decisão</strong><p>Os sinais automáticos priorizam a fila e apoiam a leitura. Eles não determinam elegibilidade nem substituem escuta qualificada.</p></section></aside>
    </div>
    {decision && <div className="modal-backdrop" role="presentation"><div className="modal" role="dialog" aria-modal="true" aria-labelledby="decision-title"><button className="modal__close" onClick={() => setDecision(null)} aria-label="Fechar"><X /></button><span className="modal__icon"><Check /></span><h2 id="decision-title">Registrar: {decision}</h2><p>Explique brevemente os elementos considerados. O registro ficará no histórico da candidatura.</p><label>Justificativa da análise<textarea autoFocus value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Descreva as evidências consultadas e os próximos passos…" /></label><small className={reason.trim() ? 'valid-note' : ''}>{reason.trim() ? 'Justificativa pronta para registro.' : 'A justificativa é obrigatória.'}</small><div className="modal__actions"><button className="button button--ghost" onClick={() => setDecision(null)}>Cancelar</button><button className="button button--primary" disabled={!reason.trim()} onClick={confirmDecision}>Confirmar e ir para a próxima</button></div></div></div>}
  </>
}
