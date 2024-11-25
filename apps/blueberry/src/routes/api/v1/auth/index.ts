import { auth } from '@/libs/auth'
import Elysia, { type Context } from 'elysia'

const authHandler = (context: Context) => {
  const authAcceptMethods = ['POST', 'GET']
  if (authAcceptMethods.includes(context.request.method)) {
    return auth.handler(context.request)
  }
  context.error(405)
}

const authRoutes = new Elysia({ prefix: '/auth' })
authRoutes.onParse(({ request, route }) => {
  if (route.startsWith('/api/v1/auth')) {
    return request.body
  }
})

authRoutes.all('/*', authHandler)
export { authRoutes }
