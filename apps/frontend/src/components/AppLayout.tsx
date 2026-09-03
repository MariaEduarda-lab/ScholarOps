import { useState } from 'react'
import { BarChart3, Bell, CalendarDays, ClipboardList, LockKeyhole, LogOut, Menu, Search, Sparkles, UsersRound, X } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Brand } from './Brand'
import { useInstitution } from '../context/useInstitution'

const navItems = [
  { to: '/app/processo', label: 'Instituição e processo', icon: CalendarDays },
  { to: '/app/inscricoes', label: 'Hub de inscrições', icon: UsersRound },
  { to: '/app/operacoes', label: 'Central de análise', icon: ClipboardList },
  { to: '/app/metricas', label: 'Métricas', icon: BarChart3 },
]

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { institution, user } = useInstitution()
  return (
    <div className="app-shell">
      <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu /></button>
      {menuOpen && <button className="sidebar-overlay" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__top">
          <Brand compact />
          <button className="sidebar__close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><X /></button>
        </div>
        <div className="context-switcher">
          <span>Instituição vinculada</span>
          <div className="institution-context"><span className="context-icon">{institution.initials}</span><span><strong>{institution.shortName}</strong><small>{institution.processName} · {institution.edition}</small></span><LockKeyhole size={14} aria-label="Vínculo institucional" /></div>
        </div>
        <nav aria-label="Navegação principal">
          <span className="nav-label">ESPAÇO DE TRABALHO</span>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>
              <Icon size={19} />{label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__tip"><Sparkles size={18} /><div><strong>Análise assistida</strong><p>A tecnologia organiza evidências. A decisão continua humana.</p></div></div>
        <button className="sidebar__logout" type="button" onClick={() => navigate('/login')}><LogOut size={18} />Sair</button>
        <div className="sidebar__user"><span className="avatar avatar--small">{user.initials}</span><span><strong>{user.name}</strong><small>{user.role}</small></span></div>
      </aside>
      <main className="app-main">
        <header className="topbar">
          <div className="topbar__search"><Search size={18} /><input aria-label="Busca geral" placeholder="Buscar candidatura ou documento…" /></div>
          <div className="topbar__actions"><span className="institution-chip"><LockKeyhole />{institution.shortName}</span><button aria-label="Notificações"><Bell size={20} /><span className="notification-dot" /></button><span>Última sincronização: agora</span></div>
        </header>
        <div className="page-container"><Outlet /></div>
      </main>
    </div>
  )
}
