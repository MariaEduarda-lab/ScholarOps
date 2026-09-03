import { AlertCircle, ArrowDownRight, ArrowUpRight, CheckCircle2, Clock3, FileWarning, UsersRound } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { EmptyState, LoadingState, PageHeading } from '../components/ui'
import { useInstitution } from '../context/useInstitution'
import { scholarApi } from '../services/api'
const pieColors = ['#17365f', '#ef716d', '#e8ad55']

export function MetricsPage() {
  const { institution } = useInstitution()
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['metrics', institution.id],
    queryFn: () => scholarApi.getMetrics(institution.id),
  })
  if (isLoading) return <LoadingState label="Calculando os indicadores…" />
  if (!metrics) return <EmptyState title="Métricas indisponíveis" description="Tente novamente em alguns instantes." />
  const stages = [
    { stage: 'Inscritas', amount: metrics.total, fill: '#17365f' },
    { stage: 'Triadas', amount: Math.max(metrics.total - metrics.awaiting, 0), fill: '#315b8a' },
    { stage: 'Revisadas', amount: metrics.ready + metrics.review, fill: '#ef716d' },
    { stage: 'Entrevistas', amount: metrics.ready, fill: '#53a58b' },
  ]
  const statusData = [
    { name: 'Aptas para entrevista', value: metrics.ready },
    { name: 'Em revisão', value: metrics.review },
    { name: 'Com pendências', value: metrics.pending },
  ]
  const cards = [
    { label: 'Candidaturas', value: metrics.total, note: 'base sintética completa', trend: '+12%', positive: true, icon: UsersRound, tone: 'navy' },
    { label: 'Aguardando análise', value: metrics.awaiting, note: 'na fila de trabalho', trend: '-8%', positive: true, icon: Clock3, tone: 'blue' },
    { label: 'Com pendências', value: metrics.pending, note: 'exigem complementação', trend: '+3%', positive: false, icon: FileWarning, tone: 'gold' },
    { label: 'Aptas à entrevista', value: metrics.ready, note: 'após triagem inicial', trend: '+18%', positive: true, icon: CheckCircle2, tone: 'green' },
  ]
  return <>
    <PageHeading eyebrow={`${institution.shortName.toUpperCase()} · ACOMPANHAMENTO`} title="Métricas do processo" description={`Indicadores exclusivos de ${institution.processName} — sem misturar dados de outras instituições.`} action={<label className="period-select">Período<select defaultValue="current"><option value="current">Edição atual</option><option value="last">Últimos 30 dias</option></select></label>} />
    <section className="metric-cards">{cards.map(({ label, value, note, trend, positive, icon: Icon, tone }) => <article className="card" key={label}><div><span className={`metric-icon metric-icon--${tone}`}><Icon /></span><span className={`trend ${positive ? 'trend--positive' : 'trend--warning'}`}>{positive ? <ArrowUpRight /> : <ArrowDownRight />}{trend}</span></div><small>{label}</small><strong>{value}</strong><p>{note}</p></article>)}</section>
    <div className="analytics-grid"><section className="card chart-card chart-card--wide"><div className="card-heading"><div><span className="eyebrow">FUNIL DO PROCESSO</span><h2>Avanço por etapa</h2></div><span className="chart-note">candidaturas únicas</span></div><div className="chart-container"><ResponsiveContainer width="100%" height="100%"><BarChart data={stages} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5eaf1" /><XAxis dataKey="stage" tickLine={false} axisLine={false} tick={{ fill: '#66758a', fontSize: 12 }} /><YAxis tickLine={false} axisLine={false} tick={{ fill: '#66758a', fontSize: 12 }} /><Tooltip cursor={{ fill: '#f3f6fa' }} contentStyle={{ borderRadius: 12, border: '1px solid #dde4ed' }} /><Bar dataKey="amount" name="Candidaturas" radius={[8, 8, 2, 2]}>{stages.map((entry) => <Cell key={entry.stage} fill={entry.fill} />)}</Bar></BarChart></ResponsiveContainer></div></section>
      <section className="card chart-card"><div className="card-heading"><div><span className="eyebrow">DISTRIBUIÇÃO</span><h2>Por situação da análise</h2></div></div><div className="pie-container"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={82} paddingAngle={3}>{statusData.map((entry, index) => <Cell key={entry.name} fill={pieColors[index]} />)}</Pie><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #dde4ed' }} /><Legend iconType="circle" iconSize={9} /></PieChart></ResponsiveContainer></div></section>
      <section className="card chart-card"><div className="card-heading"><div><span className="eyebrow">QUALIDADE DOCUMENTAL</span><h2>Sinais encontrados</h2></div></div><div className="quality-list"><div><span className="quality-dot quality-dot--danger" /><span><strong>{metrics.review}</strong><small>com inconsistências</small></span></div><div><span className="quality-dot quality-dot--warning" /><span><strong>{metrics.pending}</strong><small>com pendências</small></span></div><div><span className="quality-dot quality-dot--green" /><span><strong>{metrics.ready}</strong><small>aptas para entrevista</small></span></div></div><div className="responsibility-note"><AlertCircle /><p>Indicadores apoiam a gestão da fila, não avaliam merecimento.</p></div></section>
    </div>
  </>
}
