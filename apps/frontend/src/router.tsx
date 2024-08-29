import { AuthPage } from '@/pages/auth'
import { DashboardPage } from '@/pages/dashboard'
import { Protected } from '@/pages/layout/protected'
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { RootLayout } from './pages/layout/root'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Navigate to="/dashboard" />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="*" element={<h1>Page not found</h1>} />
      <Route element={<Protected />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Route>,
  ),
)
