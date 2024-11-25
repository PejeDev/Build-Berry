import { useOutletContext } from 'react-router-dom'

export type User = {
  id?: string | null
  email?: string | null
  name?: string | null
  image?: string | null
}

export type AuthError = {
  status: number
  statusText: string
}

export type AuthContextType = {
  user?: User
  error: AuthError | null
}

export function useUser() {
  return useOutletContext<AuthContextType>()
}
