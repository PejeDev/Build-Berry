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

export const AuthStatusEnum = {
  Loading: 'loading',
  Authenticated: 'authenticated',
  Unauthenticated: 'unauthenticated',
} as const

export type AuthStatusEnumType =
  (typeof AuthStatusEnum)[keyof typeof AuthStatusEnum]

export function useUser() {
  return useOutletContext<AuthContextType>()
}
