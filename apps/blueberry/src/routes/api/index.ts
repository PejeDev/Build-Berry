import { authRoutes } from '@/routes/api/v1/auth'
import Elysia from 'elysia'

const apiV1Routes = new Elysia({ prefix: '/api/v1' })

apiV1Routes.use(authRoutes)

export { apiV1Routes }
