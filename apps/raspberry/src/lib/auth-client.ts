import { magicLinkClient, passkeyClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const { signIn, signUp, useSession, signOut } = createAuthClient({
  // biome-ignore lint/style/useNamingConvention: lib object name
  baseURL: 'http://localhost:5173/api/v1/auth',
  plugins: [magicLinkClient(), passkeyClient()],
})
