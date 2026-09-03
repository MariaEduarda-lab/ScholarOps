import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, ChevronDown, Download, Search, SlidersHorizontal, Upload, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar, EmptyState, LoadingState, PageHeading, ProgressBar, StatusBadge } from '../components/ui'
import { useInstitution } from '../context/useInstitution'
import { scholarApi } from '../services/api'

export function ApplicationsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [uploadMessage, setUploadMessage] = useState('')
  const { institution } = useInstitution()
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['candidates', institution.id],
    queryFn: () => scholarApi.listCandidates(institution.id, 48),
  })
  const uploadMutation = useMutation({
    mutationFn: (file: File) => scholarApi.uploadTable(institution.id, file),
    onSuccess: async (result) => {
      setUploadMessage(`${result.candidatesUpserted} candidatura(s) importada(s).`)
      await queryClient.invalidateQueries({ queryKey: ['candidates', institution.id] })
    },
    onError: () => setUploadMessage('Não foi possível importar o arquivo. Confira o formato e tente novamente.'),
  })
  const filtered = useMemo(() => (data?.items ?? []).filter((candidate) => {
    const matchesSearch = `${candidate.name} ${candidate.id}`.toLowerCase().includes(search.toLowerCase())
    return matchesSearch && (status === 'all' || candidate.status === status)
  }), [data, search, status])

  return <>
    <PageHeading eyebrow={institution.shortName.toUpperCase()} title="Hub de inscrições" description={`Candidaturas de ${institution.processName}. Seu acesso é restrito à instituição vinculada ao seu perfil.`} action={<div className="heading-actions"><label className="button button--primary"><Upload size={16} />{uploadMutation.isPending ? 'Importando…' : 'Importar tabela'}<input className="sr-only" type="file" accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" disabled={uploadMutation.isPending} onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadMutation.mutate(file) }} /></label><button className="button button--secondary"><Download size={16} />Exportar lista</button></div>} />
    {uploadMessage && <div className={`inline-feedback ${uploadMutation.isError ? 'inline-feedback--error' : ''}`} role="status">{uploadMessage}</div>}
    <section className="quick-stats">
      <article><span className="metric-icon metric-icon--navy"><UsersRound /></span><div><small>NESTE PROCESSO</small><strong>{data?.total ?? '—'}</strong><span>candidaturas cadastradas</span></div></article>
      <article><span className="metric-dot metric-dot--coral" /><div><small>PRECISAM DE ATENÇÃO</small><strong>{data?.items.filter((item) => item.attentionCount > 0).length ?? '—'}</strong><span>entre os itens carregados</span></div></article>
      <article><span className="metric-dot metric-dot--gold" /><div><small>COM PENDÊNCIAS</small><strong>{data?.items.filter((item) => item.pendingCount > 0).length ?? '—'}</strong><span>aguardam complementação</span></div></article>
      <article><span className="metric-dot metric-dot--green" /><div><small>APTAS</small><strong>{data?.items.filter((item) => item.status === 'Apto para entrevista').length ?? '—'}</strong><span>para próxima etapa</span></div></article>
    </section>
    <section className="card list-card">
      <div className="filters filters--institution"><div className="search-input"><Search /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nome ou número…" aria-label="Buscar candidatura" /></div><label className="select-wrap"><SlidersHorizontal /><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filtrar por situação"><option value="all">Todas as situações</option><option>Aguardando análise</option><option>Em revisão</option><option>Documentação pendente</option><option>Apto para entrevista</option></select><ChevronDown /></label></div>
      <div className="list-summary"><span><strong>{filtered.length}</strong> candidaturas encontradas</span><span>Dados sintéticos para pesquisa e desenvolvimento</span></div>
      {isLoading ? <LoadingState /> : filtered.length === 0 ? <EmptyState title="Nenhuma candidatura encontrada" description="Altere os filtros ou tente outro termo de busca." /> : <div className="candidate-table-wrap"><table className="candidate-table"><thead><tr><th>Candidata(o)</th><th>Processo</th><th>Situação</th><th>Documentação</th><th>Atualização</th><th><span className="sr-only">Abrir</span></th></tr></thead><tbody>{filtered.map((candidate) => <tr key={candidate.id}><td><Link className="candidate-cell" to={`/app/inscricoes/${candidate.id}`}><Avatar initials={candidate.initials} /><span><strong>{candidate.name}</strong><small>{candidate.id}</small></span></Link></td><td><strong>{institution.processName}</strong><small>{candidate.edition}</small></td><td><StatusBadge status={candidate.status} /></td><td><ProgressBar value={candidate.progress} /><small>{candidate.documents.length} documentos</small></td><td><span>{candidate.updatedAt}</span></td><td><Link className="icon-button" aria-label={`Abrir candidatura de ${candidate.name}`} to={`/app/inscricoes/${candidate.id}`}><ArrowRight /></Link></td></tr>)}</tbody></table></div>}
    </section>
  </>
}
