import { ArrowRight, CheckCircle2, FileCheck2, HeartHandshake, SearchCheck, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Brand } from '../components/Brand'

export function HomePage() {
  return (
    <div className="public-page">
      <header className="public-header container">
        <Brand />
        <nav aria-label="Navegação institucional"><a href="#como-funciona">Como funciona</a><a href="#impacto">Impacto</a><a href="#seguranca">Segurança</a></nav>
        <div className="public-header__actions"><Link className="button button--ghost" to="/login">Entrar</Link><Link className="button button--primary" to="/cadastro">Criar acesso</Link></div>
      </header>

      <main>
        <section className="hero-section container">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15} />TECNOLOGIA A SERVIÇO DO CUIDADO</span>
            <h1>Mais tempo para ouvir.<br /><em>Menos tempo conferindo papéis.</em></h1>
            <p>O ScholarOps organiza documentos, sinaliza pendências e prepara um resumo claro de cada candidatura — para que a equipe social concentre energia nas histórias por trás dos dados.</p>
            <div className="hero-actions"><Link className="button button--primary button--large" to="/login">Explorar demonstração <ArrowRight size={18} /></Link><a className="text-link" href="#como-funciona">Conhecer a proposta</a></div>
            <div className="trust-row"><span><CheckCircle2 />Decisão sempre humana</span><span><CheckCircle2 />Dados artificiais nesta versão</span></div>
          </div>
          <div className="hero-visual" aria-label="Prévia do painel de análise">
            <div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" />
            <div className="floating-card floating-card--top"><span className="mini-icon mini-icon--success"><FileCheck2 /></span><span><small>DOCUMENTAÇÃO</small><strong>12 de 14 conferidos</strong></span><span className="mini-check">✓</span></div>
            <div className="analysis-card">
              <div className="analysis-card__head"><span className="avatar avatar--large">AC</span><span><small>CANDIDATURA #1042</small><strong>Ana Clara Santos</strong><p>Inteli · Graduação 2026</p></span><span className="status status--warning">2 pontos de atenção</span></div>
              <div className="analysis-card__body"><span>Resumo para entrevista</span><p>Núcleo familiar com quatro integrantes. Comprovantes de renda foram recebidos; uma divergência entre os valores declarados pede validação.</p><div className="insight-line"><SearchCheck size={18} /><span><strong>Revisar renda familiar</strong><small>Valor extraído difere do formulário</small></span></div><div className="insight-line"><ShieldCheck size={18} /><span><strong>Identificação validada</strong><small>Boa legibilidade e dados correspondentes</small></span></div></div>
            </div>
            <div className="floating-card floating-card--bottom"><HeartHandshake /><span><small>TEMPO REDIRECIONADO</small><strong>para acolher e escutar</strong></span></div>
          </div>
        </section>

        <section className="soft-section" id="como-funciona"><div className="container"><div className="section-intro"><span className="eyebrow">UM FLUXO MAIS CLARO</span><h2>Da documentação à entrevista, sem perder o contexto humano</h2><p>Cada etapa foi pensada para reduzir a carga operacional, mantendo rastreabilidade e espaço para análise profissional.</p></div><div className="feature-grid">
          <article><span className="feature-number">01</span><FileCheck2 /><h3>Organize documentos</h3><p>Centralize os arquivos exigidos e acompanhe o que chegou, o que falta e o que precisa ser reenviado.</p></article>
          <article><span className="feature-number">02</span><SearchCheck /><h3>Encontre sinais</h3><p>Destaque inconsistências e baixa confiança de leitura sem transformar sinais automáticos em decisões.</p></article>
          <article><span className="feature-number">03</span><UsersRound /><h3>Prepare o atendimento</h3><p>Consulte um resumo objetivo e chegue à entrevista com perguntas mais relevantes para cada família.</p></article>
        </div></div></section>

        <section className="impact-section container" id="impacto"><div><span className="eyebrow">NOSSO PONTO DE PARTIDA</span><h2>Construído a partir de uma dor vivida de perto</h2></div><blockquote>“Este projeto nasce da experiência de quem já passou por um processo de bolsa e conhece o tempo, a ansiedade e o cuidado envolvidos na análise de cada documento.”<span>— motivação da criadora do ScholarOps</span></blockquote></section>
        <section className="security-section" id="seguranca"><ShieldCheck /><div><strong>Protótipo responsável desde o início</strong><p>Dados sintéticos, revisão humana obrigatória e explicações visíveis para cada sinalização.</p></div><Link to="/login">Ver o protótipo <ArrowRight size={16} /></Link></section>
      </main>
      <footer className="public-footer container"><Brand compact /><p>Projeto de aprendizado e impacto social · 2026</p></footer>
    </div>
  )
}
