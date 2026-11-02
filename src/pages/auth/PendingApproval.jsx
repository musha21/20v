import { useNavigate } from 'react-router-dom'
import { Clock3, ShieldX } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function PendingApproval() {
  const { profile, logout, isRejected, refreshProfile, user } = useAuth()
  const navigate = useNavigate()

  async function handleRefresh() {
    const next = await refreshProfile(user?.id)
    if (next?.status === 'APPROVED') {
      navigate(next.role === 'ADMIN' ? '/admin' : '/player')
    }
  }

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pitch-100 text-pitch-700">
        {isRejected ? <ShieldX className="h-7 w-7" /> : <Clock3 className="h-7 w-7" />}
      </div>
      <h2 className="font-display text-2xl text-pitch-900">
        {isRejected ? 'Registration rejected' : 'Waiting for approval'}
      </h2>
      <p className="mt-2 text-sm text-muted">
        {isRejected
          ? 'Please contact the ground admin for help.'
          : `${profile?.full_name || 'Player'}, your account is pending admin approval.`}
      </p>
      <div className="mt-5 flex flex-col gap-2">
        {!isRejected ? (
          <button type="button" className="btn-primary" onClick={handleRefresh}>
            Check approval status
          </button>
        ) : null}
        <button type="button" className="btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
