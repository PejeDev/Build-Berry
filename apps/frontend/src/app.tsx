import { ThemeProvider } from '@/components/core/theme-provider'
import { SessionProvider, authConfigManager } from '@hono/auth-js/react'

authConfigManager.setConfig({
  baseUrl: '', //needed  for cross domain setup.
  basePath: '/api/auth',
  credentials: 'same-origin', //needed  for cross domain setup
})

export function app(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SessionProvider>
        <div>
          <h1>Hello, world!</h1>
          <p>Welcome to your new single-spa application.</p>
        </div>
      </SessionProvider>
    </ThemeProvider>
  )
}
