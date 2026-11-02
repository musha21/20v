import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RedirectIfAuth, RequireAdmin, RequireAuth, RequirePlayer } from './components/ProtectedRoute'
import InstallBanner from './components/InstallBanner'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import PlayerLayout from './layouts/PlayerLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PendingApproval from './pages/auth/PendingApproval'
import AdminDashboard from './pages/admin/Dashboard'
import AdminCollections from './pages/admin/Collections'
import AdminCalendar from './pages/admin/Calendar'
import AdminExpenses from './pages/admin/Expenses'
import AdminSponsors from './pages/admin/Sponsors'
import AdminPlayers from './pages/admin/Players'
import PlayerDashboard from './pages/player/Dashboard'
import PlayerCalendar from './pages/player/Calendar'
import PlayerExpenses from './pages/player/Expenses'
import PlayerSponsors from './pages/player/Sponsors'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <InstallBanner />
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
      </BrowserRouter>
    </AuthProvider>
  )
}
