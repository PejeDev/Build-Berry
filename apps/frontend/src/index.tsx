import { ThemeProvider } from '@/components/core/theme-provider'
import { createRoot } from 'react-dom/client'
import './index.css'

// biome-ignore lint/style/noNonNullAssertion: default react root
createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div>
      <h1>Hello, world!</h1>
      <p>Welcome to your new single-spa application.</p>
    </div>
  </ThemeProvider>,
)
