import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import LoadingSpinner from '../../components/LoadingSpinner'
import EmptyState from '../../components/EmptyState'
import { listExpenses } from '../../services/expenses'
import { formatDate, formatLKR } from '../../utils/format'

export default function PlayerExpenses() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listExpenses()
      .then(setRows)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-5">
      <PageHeader title="Expenses" subtitle="All ground purchases and spending" />
      {error ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}
      {rows.length === 0 ? (
        <EmptyState title="No expenses recorded" description="Admin has not added any purchases yet." />
      ) : (
        <div className="card-surface overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-pitch-50 text-pitch-800">
                <tr>
                  <th className="px-4 py-3">Purchase</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-pitch-50">
                    <td className="px-4 py-3 font-medium">{row.purchase_name}</td>
                    <td className="px-4 py-3">{formatDate(row.expense_date)}</td>
                    <td className="px-4 py-3 font-semibold text-rose-700">{formatLKR(row.amount)}</td>
                    <td className="px-4 py-3 text-muted">{row.description || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
