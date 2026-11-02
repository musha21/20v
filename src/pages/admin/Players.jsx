import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import LoadingSpinner from '../../components/LoadingSpinner'
import EmptyState from '../../components/EmptyState'
import { listPlayers, updatePlayerStatus } from '../../services/players'
import { displayMobile } from '../../utils/authEmail'
import { formatDate } from '../../utils/format'

export default function AdminPlayers() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState(null)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    try {
      setRows(await listPlayers())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function setStatus(id, status) {
    setBusyId(id)
    setError('')
    try {
      await updatePlayerStatus(id, status)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  if (loading) return <LoadingSpinner />

  const pending = rows.filter((r) => r.status === 'PENDING')
  const others = rows.filter((r) => r.status !== 'PENDING')

  return (
    <div className="space-y-5">
      <PageHeader title="Manage players" subtitle="Approve registrations before players can view ground finances" />
      {error ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

      <section className="space-y-3">
        <h3 className="font-display text-lg text-pitch-900">Pending approval ({pending.length})</h3>
        {pending.length === 0 ? (
          <EmptyState title="No pending players" description="New registrations will appear here." />
        ) : (
          <div className="grid gap-3">
            {pending.map((player) => (
              <div key={player.id} className="card-surface flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
                <div>
                  <p className="font-semibold text-pitch-900">{player.full_name}</p>
                  <p className="text-sm text-muted">
                    {displayMobile(player.mobile_number)} · Joined {formatDate(player.created_at?.slice(0, 10))}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={busyId === player.id}
                    onClick={() => setStatus(player.id, 'APPROVED')}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    disabled={busyId === player.id}
                    onClick={() => setStatus(player.id, 'REJECTED')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-lg text-pitch-900">All users</h3>
        <div className="mobile-card-list">
          {others.map((player) => (
            <div key={player.id} className="card-surface rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-pitch-900">{player.full_name}</p>
                  <p className="mt-1 text-sm text-muted">{displayMobile(player.mobile_number)}</p>
                  <p className="mt-1 text-xs text-muted">{player.role}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    player.status === 'APPROVED'
                      ? 'bg-pitch-100 text-pitch-800'
                      : player.status === 'REJECTED'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {player.status}
                </span>
              </div>
              {player.role === 'PLAYER' ? (
                <div className="mt-3">
                  {player.status !== 'APPROVED' ? (
                    <button
                      type="button"
                      className="btn-secondary w-full"
                      disabled={busyId === player.id}
                      onClick={() => setStatus(player.id, 'APPROVED')}
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-danger w-full"
                      disabled={busyId === player.id}
                      onClick={() => setStatus(player.id, 'REJECTED')}
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="desktop-table card-surface overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-pitch-50 text-pitch-800">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {others.map((player) => (
                  <tr key={player.id} className="border-t border-pitch-50">
                    <td className="px-4 py-3 font-medium">{player.full_name}</td>
                    <td className="px-4 py-3">{displayMobile(player.mobile_number)}</td>
                    <td className="px-4 py-3">{player.role}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          player.status === 'APPROVED'
                            ? 'bg-pitch-100 text-pitch-800'
                            : player.status === 'REJECTED'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {player.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {player.role === 'PLAYER' ? (
                        <div className="flex gap-2">
                          {player.status !== 'APPROVED' ? (
                            <button
                              type="button"
                              className="btn-secondary px-2 py-1 text-xs"
                              disabled={busyId === player.id}
                              onClick={() => setStatus(player.id, 'APPROVED')}
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn-danger px-2 py-1 text-xs"
                              disabled={busyId === player.id}
                              onClick={() => setStatus(player.id, 'REJECTED')}
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
