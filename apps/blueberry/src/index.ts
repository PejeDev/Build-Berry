import { apiV1Routes } from '@/routes/api'
import { apiV1Docs } from '@/routes/api/v1/docs'
import { logger } from '@bogeychan/elysia-logger'
import cors from '@elysiajs/cors'
import { Elysia } from 'elysia'

const app = new Elysia()

app.use(cors())
app.use(
  logger({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  }),
)

app.use(apiV1Docs)

app.use(apiV1Routes)

app.listen(3000)

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
