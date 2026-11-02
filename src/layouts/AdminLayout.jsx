import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  CalendarDays,
  ShoppingBag,
  Handshake,
  Users,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/collections', label: 'Collections', icon: Wallet },
  { to: '/admin/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/admin/expenses', label: 'Expenses', icon: ShoppingBag },
  { to: '/admin/sponsors', label: 'Sponsors', icon: Handshake },
  { to: '/admin/players', label: 'Players', icon: Users },
]

export default function AdminLayout() {
  const { profile, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-pitch-100 bg-white/90 p-4 lg:flex lg:flex-col">
        <div className="mb-8 px-2">
          <p className="font-display text-xl font-bold text-pitch-800">Village Volleyball</p>
          <p className="text-xs text-muted">Admin console</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-pitch-700 text-white' : 'text-pitch-800 hover:bg-pitch-50'
                }`
              }
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" onClick={handleLogout} className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-rose-700 hover:bg-rose-50">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col pb-24 lg:pb-0">
        <header className="sticky top-0 z-20 border-b border-pitch-100 bg-white/80 px-4 py-3 backdrop-blur lg:px-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-lg text-pitch-900 lg:hidden">Admin</p>
              <p className="text-sm text-muted">Welcome, {profile?.full_name || 'Admin'}</p>
            </div>
            <button type="button" onClick={handleLogout} className="btn-secondary px-3 py-2 text-sm lg:hidden">
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 lg:px-6">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-pitch-100 bg-white/95 px-2 py-2 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-6 gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium ${
                  isActive ? 'bg-pitch-100 text-pitch-800' : 'text-muted'
                }`
              }
            >
              <link.icon className="h-4 w-4" />
              <span className="truncate">{link.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
