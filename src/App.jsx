import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RedirectIfAuth, RequireAdmin, RequireAuth, RequirePlayer } from './components/ProtectedRoute'
import InstallBanner from './components/InstallBanner'
import LoadingSpinner from './components/LoadingSpinner'

const AuthLayout = lazy(() => import('./layouts/AuthLayout'))
const AdminLayout = lazy(() => import('./layouts/AdminLayout'))
const PlayerLayout = lazy(() => import('./layouts/PlayerLayout'))

const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const PendingApproval = lazy(() => import('./pages/auth/PendingApproval'))

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminCollections = lazy(() => import('./pages/admin/Collections'))
const AdminCalendar = lazy(() => import('./pages/admin/Calendar'))
const AdminExpenses = lazy(() => import('./pages/admin/Expenses'))
const AdminSponsors = lazy(() => import('./pages/admin/Sponsors'))
const AdminPlayers = lazy(() => import('./pages/admin/Players'))

const PlayerDashboard = lazy(() => import('./pages/player/Dashboard'))
const PlayerCalendar = lazy(() => import('./pages/player/Calendar'))
const PlayerExpenses = lazy(() => import('./pages/player/Expenses'))
const PlayerSponsors = lazy(() => import('./pages/player/Sponsors'))

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <InstallBanner />
        <Suspense fallback={<LoadingSpinner label="Loading..." />}>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route
                path="/login"
                element={
                  <RedirectIfAuth>
                    <Login />
                  </RedirectIfAuth>
                }
              />
              <Route
                path="/register"
                element={
                  <RedirectIfAuth>
                    <Register />
                  </RedirectIfAuth>
                }
              />
              <Route
                path="/pending"
                element={
                  <RequireAuth>
                    <PendingApproval />
                  </RequireAuth>
                }
              />
            </Route>

            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="collections" element={<AdminCollections />} />
              <Route path="calendar" element={<AdminCalendar />} />
              <Route path="expenses" element={<AdminExpenses />} />
              <Route path="sponsors" element={<AdminSponsors />} />
              <Route path="players" element={<AdminPlayers />} />
            </Route>

            <Route
              path="/player"
              element={
                <RequirePlayer>
                  <PlayerLayout />
                </RequirePlayer>
              }
            >
              <Route index element={<PlayerDashboard />} />
              <Route path="calendar" element={<PlayerCalendar />} />
              <Route path="expenses" element={<PlayerExpenses />} />
              <Route path="sponsors" element={<PlayerSponsors />} />
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}
