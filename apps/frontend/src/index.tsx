import { ThemeProvider } from '@/components/core/theme-provider'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app'

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>,
)
