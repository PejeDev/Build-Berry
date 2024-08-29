import { type AuthContextType, useUser } from '@/hooks/use-user'
import { Navigate, Outlet } from 'react-router-dom'

export function Protected(): React.ReactElement {
  const { user, status } = useUser()

  return (
    <>
      {status === 'authenticated' ? (
        <Outlet context={{ user, status } satisfies AuthContextType} />
      ) : (
        <Navigate to="/auth" />
      )}
    </>
  )
}
