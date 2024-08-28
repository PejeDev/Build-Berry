import { OpenAPIHono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import type { Context } from 'hono'

import {
  type AuthConfig,
  authHandler,
  initAuthConfig,
  verifyAuth,
} from '@hono/auth-js'

import { prisma } from '@/services/db/prisma'
import Nodemailer from '@auth/core/providers/nodemailer'
import { PrismaAdapter } from '@auth/prisma-adapter'

const app = new OpenAPIHono()

app.use('*', initAuthConfig(getAuthConfig))

app.use('/api/auth/*', authHandler())

app.use('/api/*', verifyAuth())

app.get('/api/protected', (c) => {
  const auth = c.get('authUser')
  return c.json(auth)
})

function getAuthConfig(c: Context): AuthConfig {
  return {
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    providers: [
      Nodemailer({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    ],
    callbacks: {
      signIn: async ({ profile }) => {
        const whitelist = process.env.AUTH_WHITELIST?.split(',')
        return whitelist?.includes(profile?.email ?? '') ?? false
      },
    },
  }
}

// The OpenAPI documentation will be available at /doc
app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    version: '0.1.0',
    title: 'labs deploy bot',
  },
})

app.get(
  '/docs',
  apiReference({
    theme: 'deepSpace',
    spec: {
      url: '/openapi.json',
    },
  }),
)

export default app
