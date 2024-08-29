import { OpenAPIHono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import type { Context } from 'hono'
import { cors } from 'hono/cors'

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

app.use(
  '*',
  cors({
    origin: (origin) => origin,
    allowHeaders: ['Content-Type'],
    credentials: true,
  }),
)

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
    secret: Bun.env.AUTH_SECRET,
    providers: [
      Nodemailer({
        server: {
          host: Bun.env.EMAIL_SERVER_HOST,
          port: Number.parseInt(Bun.env.EMAIL_SERVER_PORT ?? '587'),
          auth: {
            user: Bun.env.EMAIL_SERVER_USER,
            pass: Bun.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: Bun.env.EMAIL_FROM,
      }),
    ],
    callbacks: {
      signIn: async ({ profile, user }) => {
        const whitelist = Bun.env.AUTH_WHITELIST?.split(',') ?? []
        const email = profile?.email ?? user?.email ?? ''

        return whitelist.includes(email) ?? false
      },
    },
    trustHost: true,
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

if (Bun.env.NODE_ENV !== 'production') {
  app.all('*', async (c) => {
    const res = await fetch(`http://localhost:5173${c.req.path}`)
    const newResponse = new Response(res.body, res)
    return newResponse
  })
}

export default app
