import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await register({ fullName, mobile, password })
      setSuccess('Registration successful. Wait for admin approval before using the app.')
      setTimeout(() => navigate('/pending'), 800)
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-pitch-900">Player registration</h2>
      <p className="mt-1 text-sm text-muted">Admin will approve your account before access</p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-pitch-800">Full name</label>
          <input
            className="input-field"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
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
        {success ? <p className="rounded-xl bg-pitch-50 px-3 py-2 text-sm text-pitch-800">{success}</p> : null}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-muted">
        Already registered?{' '}
        <Link to="/login" className="font-semibold text-pitch-700 hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
