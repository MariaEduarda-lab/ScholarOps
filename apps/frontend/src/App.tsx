import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { InstitutionProvider } from './context/InstitutionProvider'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InstitutionProvider>
        <RouterProvider router={router} />
      </InstitutionProvider>
    </QueryClientProvider>
  )
}
