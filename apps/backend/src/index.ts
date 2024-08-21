import { OpenAPIHono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import type { Context } from 'hono'

import {
  type AuthConfig,
  authHandler,
  initAuthConfig,
  verifyAuth,
} from '@hono/auth-js'

import GitHub from '@auth/core/providers/github'
import Nodemailer from '@auth/core/providers/nodemailer'

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
    secret: c.env.AUTH_SECRET,
    providers: [
      GitHub({
        clientId: c.env.GITHUB_ID,
        clientSecret: c.env.GITHUB_SECRET,
      }),
      Nodemailer({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    ],
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
