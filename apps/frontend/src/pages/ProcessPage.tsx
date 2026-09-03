import { Building2, CalendarDays, CheckCircle2, Clock3, FileText, Pencil, UsersRound } from 'lucide-react'
import { getCandidatesForInstitution, milestones } from '../data/mock-data'
import { PageHeading } from '../components/ui'
import { useInstitution } from '../context/useInstitution'

const requiredDocuments = [
  { group: 'Identificação', count: 4, docs: 'RG ou CNH, CPF, certidão de nascimento e comprovante de residência' },
  { group: 'Renda', count: 6, docs: 'Holerites, extratos, IRPF, carteira de trabalho e declarações de renda' },
  { group: 'Patrimônio', count: 3, docs: 'Imóveis, veículos e outros bens declarados' },
  { group: 'Vida acadêmica', count: 2, docs: 'Comprovante de matrícula e histórico ou boletim escolar' },
]

export function ProcessPage() {
  const { institution } = useInstitution()
  const processCandidates = getCandidatesForInstitution(institution.id)
  const documentRecords = processCandidates.reduce((total, candidate) => total + candidate.documents.length, 0)
  return <>
    <PageHeading eyebrow="CONFIGURAÇÃO DO PROCESSO" title={`${institution.processName} · ${institution.edition}`} description={`Ambiente exclusivo de ${institution.shortName}. Consulte as regras, os prazos e a documentação usada nesta análise.`} action={<button className="button button--secondary"><Pencil size={16} />Editar processo</button>} />
    <section className="process-overview card">
      <div className="institution-mark">{institution.initials}</div><div className="process-overview__main"><span className="status status--success"><span className="pulse" />Inscrições encerradas</span><h2>{institution.processName}</h2><p>{institution.description}</p><div className="meta-row"><span><Building2 />{institution.name}</span><span><UsersRound />{institution.educationLevel}</span><span><CalendarDays />{institution.edition}</span></div></div>
      <div className="process-overview__stats"><div><strong>{documentRecords.toLocaleString('pt-BR')}</strong><span>registros documentais</span></div><div><strong>{processCandidates.length}</strong><span>candidaturas mapeadas</span></div></div>
    </section>
    <div className="two-column-layout">
      <section className="card"><div className="card-heading"><div><span className="eyebrow">CALENDÁRIO</span><h2>Etapas e datas principais</h2></div><CalendarDays /></div><div className="timeline">{milestones.map((milestone) => <div className={`timeline-item timeline-item--${milestone.state}`} key={milestone.date}><div className="date-block"><strong>{milestone.day}</strong><span>{milestone.month}</span></div><div className="timeline-line"><i /></div><div><span className="timeline-state">{milestone.state === 'done' ? <><CheckCircle2 />Concluída</> : milestone.state === 'current' ? <><Clock3 />Em andamento</> : 'Próxima etapa'}</span><h3>{milestone.title}</h3><p>{milestone.description}</p></div></div>)}</div></section>
      <aside className="stack-column"><section className="card"><div className="card-heading"><div><span className="eyebrow">DOCUMENTAÇÃO</span><h2>Matriz de exigências</h2></div><FileText /></div><p className="supporting-text">Os grupos abaixo definem o checklist inicial. Regras de aplicabilidade variam conforme cada composição familiar.</p><div className="requirement-list">{requiredDocuments.map((item) => <details key={item.group}><summary><span><strong>{item.group}</strong><small>{item.count} tipos documentais</small></span><span>+</span></summary><p>{item.docs}.</p></details>)}</div><button className="button button--soft button--full">Ver matriz completa</button></section><section className="card notice-card"><span className="notice-card__icon"><FileText /></span><div><strong>Por que configurar bem esta etapa?</strong><p>Regras explícitas permitem explicar cada pendência e evitam aplicar a mesma exigência a famílias com realidades diferentes.</p></div></section></aside>
    </div>
  </>
}
