import { SessionProvider, authConfigManager } from '@hono/auth-js/react'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Setup auth config
authConfigManager.setConfig({
  baseUrl: '', //needed  for cross domain setup.
  basePath: '/api/auth',
  credentials: 'same-origin', //needed  for cross domain setup
})

export function App(): JSX.Element {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  )
}
