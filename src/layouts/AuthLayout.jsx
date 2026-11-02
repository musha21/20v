import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-pitch-200/50 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pitch-300/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-pitch-700 text-white shadow-lg shadow-pitch-700/30">
            <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
              <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.5" fill="none" />
              <path d="M18 22c8 4 12 14 10 24M46 22c-8 4-12 14-10 24M20 40c8-6 16-6 24 0" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-pitch-900">Village Volleyball</h1>
          <p className="mt-1 text-sm text-muted">Ground cash management</p>
        </div>
        <div className="card-surface rounded-3xl p-5 sm:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
