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
  { to: '/admin', label: 'Home', short: 'Home', icon: LayoutDashboard, end: true },
  { to: '/admin/collections', label: 'Collections', short: 'Cash', icon: Wallet },
  { to: '/admin/calendar', label: 'Calendar', short: 'Cal', icon: CalendarDays },
  { to: '/admin/expenses', label: 'Expenses', short: 'Spend', icon: ShoppingBag },
  { to: '/admin/sponsors', label: 'Sponsors', short: 'Sponsor', icon: Handshake },
  { to: '/admin/players', label: 'Players', short: 'Players', icon: Users },
]

export default function AdminLayout() {
  const { profile, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen overflow-x-hidden lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-pitch-100 bg-white/90 p-4 lg:flex lg:flex-col">
        <div className="mb-8 flex items-center gap-3 px-2">
          <img src="/logo.png" alt="" className="h-11 w-11 rounded-xl object-cover ring-1 ring-pitch-100" width={44} height={44} decoding="async" />
          <div>
            <p className="font-display text-base font-bold leading-tight text-pitch-800">Malwanahinna VG</p>
            <p className="text-xs text-muted">Admin console</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-pitch-700 text-white' : 'text-pitch-800 hover:bg-pitch-50'
                }`
              }
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" onClick={handleLogout} className="mt-4 flex min-h-11 items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-rose-700 hover:bg-rose-50">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <header className="sticky top-0 z-20 border-b border-pitch-100 bg-white/80 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur lg:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <img src="/logo.png" alt="" className="h-9 w-9 rounded-lg object-cover lg:hidden" width={36} height={36} decoding="async" />
              <div className="min-w-0">
                <p className="truncate font-display text-base text-pitch-900 lg:hidden">Malwanahinna Admin</p>
                <p className="truncate text-sm text-muted">Welcome, {profile?.full_name || 'Admin'}</p>
              </div>
            </div>
            <button type="button" onClick={handleLogout} className="btn-secondary min-h-11 px-3 py-2 text-sm lg:hidden">
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 lg:px-6">
          <Outlet />
        </main>
      </div>

      <nav className="bottom-nav fixed inset-x-0 bottom-0 z-30 border-t border-pitch-100 bg-white/95 px-1 pt-1 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-6 gap-0.5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-0.5 py-1.5 text-[10px] font-medium ${
                  isActive ? 'bg-pitch-100 text-pitch-800' : 'text-muted'
                }`
              }
            >
              <link.icon className="h-5 w-5" />
              <span className="truncate">{link.short}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
