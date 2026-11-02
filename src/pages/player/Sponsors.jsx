import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import LoadingSpinner from '../../components/LoadingSpinner'
import EmptyState from '../../components/EmptyState'
import { listSponsors } from '../../services/sponsors'
import { formatDate, formatLKR } from '../../utils/format'

export default function PlayerSponsors() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listSponsors()
      .then(setRows)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-5">
      <PageHeader title="Sponsors" subtitle="Sponsorship cash received for the ground" />
      {error ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}
      {rows.length === 0 ? (
        <EmptyState title="No sponsors yet" description="Sponsorship records will appear here." />
      ) : (
        <>
          <div className="mobile-card-list">
            {rows.map((row) => (
              <div key={row.id} className="card-surface rounded-2xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-pitch-900">{row.sponsor_name}</p>
                    <p className="mt-1 text-sm text-muted">{row.mobile_number || 'No mobile'}</p>
                    <p className="mt-1 text-sm text-muted">{formatDate(row.sponsorship_date)}</p>
                    <p className="mt-1 text-sm text-muted">{row.description || 'No description'}</p>
                  </div>
                  <p className="font-display text-lg font-semibold text-amber-700">{formatLKR(row.amount)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="desktop-table card-surface overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-pitch-50 text-pitch-800">
                  <tr>
                    <th className="px-4 py-3">Sponsor</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-t border-pitch-50">
                      <td className="px-4 py-3 font-medium">{row.sponsor_name}</td>
                      <td className="px-4 py-3">{row.mobile_number || '—'}</td>
                      <td className="px-4 py-3">{formatDate(row.sponsorship_date)}</td>
                      <td className="px-4 py-3 font-semibold text-amber-700">{formatLKR(row.amount)}</td>
                      <td className="px-4 py-3 text-muted">{row.description || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
