import { useOutletContext } from 'react-router-dom'

export type User = {
  id?: string | null
  email?: string | null
  name?: string | null
}

export type AuthContextType = {
  user?: User
  status: 'loading' | 'authenticated' | 'unauthenticated'
}

export function useUser() {
  return useOutletContext<AuthContextType>()
}
