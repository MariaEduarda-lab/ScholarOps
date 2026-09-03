import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Brand } from '../components/Brand'

function AuthShell({ children, quote }: { children: React.ReactNode; quote: string }) {
  return <div className="auth-page"><section className="auth-panel"><div className="auth-panel__content"><Brand /><div className="auth-message"><span>ScholarOps</span><h2>Informação organizada.<br />Acolhimento fortalecido.</h2><p>Uma ferramenta de apoio para que cada análise seja mais clara, consistente e humana.</p></div><blockquote>“{quote}”<small>Princípio do produto</small></blockquote></div></section><main className="auth-main">{children}<p className="auth-note">Esta é uma demonstração com dados inteiramente artificiais.</p></main></div>
}

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const navigate = useNavigate()
  const submit = (event: FormEvent) => { event.preventDefault(); navigate('/app/processo') }
  return <AuthShell quote="A tecnologia cuida do processo para que as pessoas possam cuidar de pessoas."><div className="auth-form-wrap"><Link className="back-link" to="/"><ArrowLeft size={16} />Voltar ao início</Link><div className="auth-title"><span className="eyebrow">BEM-VINDA DE VOLTA</span><h1>Acesse seu espaço</h1><p>Entre para continuar a análise das candidaturas.</p></div><form className="auth-form" onSubmit={submit}>
    <label>E-mail institucional<div className="input-wrap"><Mail /><input type="email" defaultValue="marina.souza@inteli.edu.br" required /></div></label>
    <label>Senha<div className="input-wrap"><LockKeyhole /><input type={showPassword ? 'text' : 'password'} defaultValue="demonstracao" required /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}>{showPassword ? <EyeOff /> : <Eye />}</button></div></label>
    <div className="form-options"><label className="check-label"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span><Check /></span>Lembrar de mim</label><button type="button" className="link-button">Esqueci minha senha</button></div>
    <button className="button button--primary button--full" type="submit">Entrar no ScholarOps <ArrowRight size={18} /></button>
  </form><p className="auth-switch">Ainda não possui acesso? <Link to="/cadastro">Solicitar cadastro</Link></p></div></AuthShell>
}

export function RegisterPage() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const submit = (event: FormEvent) => { event.preventDefault(); if (step === 1) setStep(2); else navigate('/app/processo') }
  return <AuthShell quote="Boas decisões começam com informações compreensíveis e espaço para escuta."><div className="auth-form-wrap"><Link className="back-link" to="/"><ArrowLeft size={16} />Voltar ao início</Link><div className="stepper"><span className="active">1</span><i /><span className={step === 2 ? 'active' : ''}>2</span><small>Perfil</small><small>Instituição</small></div><div className="auth-title"><span className="eyebrow">CRIAR ACESSO · ETAPA {step} DE 2</span><h1>{step === 1 ? 'Conte um pouco sobre você' : 'Agora, sobre a instituição'}</h1><p>{step === 1 ? 'Usaremos estes dados para personalizar seu espaço.' : 'Isso define o contexto inicial do processo seletivo.'}</p></div><form className="auth-form" onSubmit={submit}>
    {step === 1 ? <><label>Nome completo<div className="input-wrap"><UserRound /><input placeholder="Como devemos chamar você?" required /></div></label><label>E-mail profissional<div className="input-wrap"><Mail /><input type="email" placeholder="voce@instituicao.org.br" required /></div></label><label>Área de atuação<select required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Assistência social</option><option>Gestão educacional</option><option>Operações</option><option>Tecnologia</option></select></label></> : <><label>Nome da instituição<input placeholder="Ex.: Instituto Horizonte" required /></label><label>Tipo de processo<select defaultValue="bolsa-social"><option value="bolsa-social">Bolsa social</option><option value="permanencia">Bolsa de permanência</option><option value="educacao-basica">Bolsa para educação básica</option></select></label><label>Nome do processo<input defaultValue="Processo de bolsas 2026" required /></label></>}
    <button className="button button--primary button--full" type="submit">{step === 1 ? 'Continuar' : 'Criar espaço de demonstração'} <ArrowRight size={18} /></button>{step === 2 && <button className="button button--ghost button--full" type="button" onClick={() => setStep(1)}>Voltar para dados pessoais</button>}
  </form><p className="auth-switch">Já possui acesso? <Link to="/login">Entrar</Link></p></div></AuthShell>
}
