import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

export function RequireAuth({ children }) {
  const { loading, session } = useAuth()
  if (loading) return <LoadingSpinner />
  if (!session) return <Navigate to="/login" replace />
  return children
}

export function RequireAdmin({ children }) {
  const { loading, session, profile, isAdmin, isPending, isRejected } = useAuth()
  if (loading) return <LoadingSpinner />
  if (!session) return <Navigate to="/login" replace />
  if (!profile || isPending || isRejected) return <Navigate to="/pending" replace />
  if (!isAdmin) return <Navigate to="/player" replace />
  return children
}

export function RequirePlayer({ children }) {
  const { loading, session, profile, isAdmin, isApprovedPlayer, isPending, isRejected } = useAuth()
  if (loading) return <LoadingSpinner />
  if (!session) return <Navigate to="/login" replace />
  if (!profile || isPending || isRejected) return <Navigate to="/pending" replace />
  if (isAdmin) return <Navigate to="/admin" replace />
  if (!isApprovedPlayer) return <Navigate to="/pending" replace />
  return children
}

export function RedirectIfAuth({ children }) {
  const { loading, session, profile, isAdmin, isApprovedPlayer, isPending, isRejected } = useAuth()
  if (loading) return <LoadingSpinner />
  if (session && profile) {
    if (isPending || isRejected) return <Navigate to="/pending" replace />
    if (isAdmin) return <Navigate to="/admin" replace />
    if (isApprovedPlayer) return <Navigate to="/player" replace />
  }
  return children
}
