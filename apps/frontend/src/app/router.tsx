import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../components/AppLayout'

export const router = createBrowserRouter([
  { path: '/', lazy: async () => ({ Component: (await import('../pages/HomePage')).HomePage }) },
  { path: '/login', lazy: async () => ({ Component: (await import('../pages/AuthPages')).LoginPage }) },
  { path: '/cadastro', lazy: async () => ({ Component: (await import('../pages/AuthPages')).RegisterPage }) },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="processo" replace /> },
      { path: 'processo', lazy: async () => ({ Component: (await import('../pages/ProcessPage')).ProcessPage }) },
      { path: 'inscricoes', lazy: async () => ({ Component: (await import('../pages/ApplicationsPage')).ApplicationsPage }) },
      { path: 'inscricoes/:id', lazy: async () => ({ Component: (await import('../pages/CandidatePage')).CandidatePage }) },
      { path: 'operacoes', lazy: async () => ({ Component: (await import('../pages/OperationsPage')).OperationsPage }) },
      { path: 'metricas', lazy: async () => ({ Component: (await import('../pages/MetricsPage')).MetricsPage }) },
    ],
  },
  { path: '*', lazy: async () => ({ Component: (await import('../pages/NotFoundPage')).NotFoundPage }) },
])
