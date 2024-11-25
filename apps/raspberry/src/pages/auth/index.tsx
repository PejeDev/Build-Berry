import { UserAuthForm } from '@/components/auth/auth-form'
import { ModeToggle } from '@/components/core/mode-toggle'
import { useUser } from '@/hooks/use-user'
import { Navigate } from 'react-router-dom'

export function AuthPage(): React.ReactElement {
  const { user } = useUser()
  return !user ? (
    <>
      <>
        <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <ModeToggle className="absolute top-4 right-4" />
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 auth-bg blur-sm" />
            <h1 className="relative z-20 flex items-center font-medium text-2xl">🍓BuildBerry</h1>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;Made BuildBerry to simplify CI/CD—mostly through trial, error, and lots of coffee. Somehow, it
                  works, and now every successful build feels like hitting the jackpot!&rdquo;
                </p>
                <footer className="text-sm">Juan Castaneda</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
              </div>
              <UserAuthForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{' '}
                <a href="/terms" className="underline underline-offset-4 hover:text-primary">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </>
    </>
  ) : (
    <Navigate to="/dashboard" />
  )
}
