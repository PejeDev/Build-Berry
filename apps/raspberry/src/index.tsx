import { ThemeProvider } from '@/components/core/theme-provider'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SessionProvider, authConfigManager } from '@hono/auth-js/react'
import { App } from './app'

// Setup auth config
authConfigManager.setConfig({
  baseUrl: 'http://localhost:5173',
  basePath: '/api/auth',
  credentials: 'same-origin',
})

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <SessionProvider>
      <App />
    </SessionProvider>
  </ThemeProvider>,
)
