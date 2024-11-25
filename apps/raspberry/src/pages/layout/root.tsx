import type { AuthContextType } from '@/hooks/use-user'
import { useSession } from '@/lib/auth-client'
import { Outlet } from 'react-router-dom'

export function RootLayout(): React.ReactElement {
  const { data: session, isPending, error } = useSession()
  const user = session?.user || undefined

  return isPending ? <div>loading...</div> : <Outlet context={{ user, error } satisfies AuthContextType} />
}
