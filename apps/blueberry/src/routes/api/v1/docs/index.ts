import swagger from '@elysiajs/swagger'

export const apiV1Docs = swagger({
  path: '/api/v1/docs',
  documentation: {
    info: {
      title: '🍓BuildBerry',
      description: 'BuildBerry API Documentation',
      version: '0.1.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
})
