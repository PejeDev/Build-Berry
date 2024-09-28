import type { AuthContextType } from '@/hooks/use-user'
import { useSession } from '@hono/auth-js/react'
import { Outlet } from 'react-router-dom'

export function RootLayout(): React.ReactElement {
  const { data: session, status } = useSession()
  const user = session?.user || undefined

  return status === 'loading' ? (
    <div>loading...</div>
  ) : (
    <Outlet context={{ user, status } satisfies AuthContextType} />
  )
}
