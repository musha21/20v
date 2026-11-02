import { Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-pitch-200/50 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pitch-300/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center">
        <div className="mb-6 text-center">
          <img
            src={logo}
            alt="Malwanahinna Volleyball Ground"
            className="mx-auto mb-4 h-24 w-24 rounded-2xl object-cover shadow-lg shadow-pitch-700/25 ring-2 ring-pitch-100"
          />
          <h1 className="font-display text-2xl font-bold leading-tight text-pitch-900 sm:text-3xl">
            Malwanahinna Volleyball Ground Maintenance System
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            A community initiative dedicated to maintaining and developing Malwanahinna Volleyball Ground.
            Our goal is to keep the ground clean, safe, and enjoyable for everyone through teamwork and community support.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            With daily contributions and transparent financial management, we aim to improve our facilities,
            support local players, and build a better future for volleyball in our village.
          </p>
          <p className="mt-2 text-sm font-medium text-pitch-800">
            Together, let&apos;s maintain our ground and grow our community!
          </p>
        </div>
        <div className="card-surface rounded-3xl p-5 sm:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
