import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, ShoppingBag, Handshake, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/player', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/player/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/player/expenses', label: 'Expenses', icon: ShoppingBag },
  { to: '/player/sponsors', label: 'Sponsors', icon: Handshake },
]

export default function PlayerLayout() {
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
          <p className="text-xs text-muted">Player view</p>
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
              <p className="font-display text-lg text-pitch-900 lg:hidden">Player</p>
              <p className="text-sm text-muted">Hi, {profile?.full_name || 'Player'}</p>
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
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium ${
                  isActive ? 'bg-pitch-100 text-pitch-800' : 'text-muted'
                }`
              }
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
