import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/use-user'
import { signIn } from '@hono/auth-js/react'
import { Navigate } from 'react-router-dom'

export function AuthPage(): React.ReactElement {
  const { status } = useUser()

  return (
    <>
      {status === 'unauthenticated' ? (
        <Button onClick={() => signIn()}>Sign In</Button>
      ) : (
        <Navigate to="/dashboard" />
      )}
    </>
  )
}
