declare global {
  // biome-ignore lint/style/useNamingConvention: This is a global type
  namespace NodeJS {
    interface ProcessEnv {
      EMAIL_SERVER_HOST: string
      EMAIL_SERVER_PORT: string
      EMAIL_SERVER_USER: string
      EMAIL_SERVER_PASSWORD: string
      EMAIL_FROM: string
      AUTH_SECRET: string
      AUTH_WHITELIST: string
      NODE_ENV: 'development' | 'production'
    }
  }
}

export type {}
