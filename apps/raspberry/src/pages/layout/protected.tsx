import { type AuthContextType, useUser } from '@/hooks/use-user'
import { Navigate, Outlet } from 'react-router-dom'

export function Protected(): React.ReactElement {
  const { user, error } = useUser()

  console.log('user', user)
  console.log('error', error)

  return <>{user ? <Outlet context={{ user, error } satisfies AuthContextType} /> : <Navigate to="/auth" />}</>
}
