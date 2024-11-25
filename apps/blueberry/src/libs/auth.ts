import { prisma } from '@/services/db/prisma'
import { sendMagicLinkMail } from '@/services/email/providers/nodemailer'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { magicLink, openAPI, passkey } from 'better-auth/plugins'

export const auth = betterAuth({
  basePath: '/api/v1/auth',
  // biome-ignore lint/style/useNamingConvention: library convention
  baseURL: 'http://localhost:5173',
  trustedOrigins: ['http://localhost:3000', 'http://localhost:5173'],
  plugins: [
    openAPI(),
    passkey(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        sendMagicLinkMail(email, url)
      },
    }),
  ],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
})
