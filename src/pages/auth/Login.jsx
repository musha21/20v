import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const { login, bootstrapAdmin, refreshProfile, user } = useAuth()
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showBootstrap, setShowBootstrap] = useState(false)
  const [bootstrapMsg, setBootstrapMsg] = useState('')

  async function routeAfterAuth(profile) {
    if (!profile) {
      navigate('/pending')
      return
    }
    if (profile.status === 'PENDING' || profile.status === 'REJECTED') {
      navigate('/pending')
      return
    }
    if (profile.role === 'ADMIN') {
      navigate('/admin')
      return
    }
    navigate('/player')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await login({ mobile, password })
      await routeAfterAuth(result.profile)
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleBootstrap(e) {
    e.preventDefault()
    setLoading(true)
    setBootstrapMsg('')
    setError('')
    try {
      let activeUser = user
      if (!activeUser) {
        const result = await login({ mobile, password })
        activeUser = result.session?.user
      }
      if (!activeUser?.id) {
        throw new Error('Login required before admin setup')
      }
      await bootstrapAdmin(mobile)
      const profile = await refreshProfile(activeUser.id)
      setBootstrapMsg('Admin account created successfully.')
      await routeAfterAuth(profile)
    } catch (err) {
      setError(err.message || 'Could not bootstrap admin')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-pitch-900">Login</h2>
      <p className="mt-1 text-sm text-muted">Use your mobile number and password</p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-pitch-800">Mobile number</label>
          <input
            className="input-field"
            type="tel"
            placeholder="07XXXXXXXX"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-pitch-800">Password</label>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        {error ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}
        {bootstrapMsg ? <p className="rounded-xl bg-pitch-50 px-3 py-2 text-sm text-pitch-800">{bootstrapMsg}</p> : null}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-muted">
        New player?{' '}
        <Link to="/register" className="font-semibold text-pitch-700 hover:underline">
          Register
        </Link>
      </p>

      <div className="mt-5 border-t border-pitch-100 pt-4">
        <button
          type="button"
          className="text-xs font-medium text-muted hover:text-pitch-700"
          onClick={() => setShowBootstrap((v) => !v)}
        >
          First-time admin setup
        </button>
        {showBootstrap ? (
          <form onSubmit={handleBootstrap} className="mt-3 space-y-2">
            <p className="text-xs text-muted">
              Register or login first, then promote this account to admin. Works only when no admin exists yet.
            </p>
            <button type="submit" className="btn-secondary w-full text-sm" disabled={loading}>
              Become first admin
            </button>
          </form>
        ) : null}
      </div>
    </div>
  )
}
