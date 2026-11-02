import { formatDate, formatLKR } from '../utils/format'
import EmptyState from './EmptyState'
import { CalendarDays } from 'lucide-react'

export default function DaySummaryPanel({ date, summary, loading }) {
  if (!date) {
    return (
      <EmptyState
        icon={CalendarDays}
        title="Select a date"
        description="Tap a calendar day to see collection, expenses and sponsorship for that day."
      />
    )
  }

  if (loading || !summary) {
    return <div className="card-surface rounded-2xl p-5 text-sm text-muted">Loading day summary...</div>
  }

  return (
    <div className="card-surface animate-fade-up space-y-4 rounded-2xl p-5">
      <div>
        <h3 className="font-display text-xl text-pitch-900">{formatDate(date)}</h3>
        <p className="text-sm text-muted">Daily financial summary</p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl bg-pitch-50 p-3">
          <p className="text-xs uppercase tracking-wide text-muted">Collection</p>
          <p className="mt-1 font-display text-lg text-pitch-800">{formatLKR(summary.collectionAmount)}</p>
          {summary.collection?.description ? (
            <p className="mt-1 text-xs text-muted">{summary.collection.description}</p>
          ) : null}
        </div>
        <div className="rounded-xl bg-amber-50 p-3">
          <p className="text-xs uppercase tracking-wide text-muted">Sponsorship</p>
          <p className="mt-1 font-display text-lg text-amber-800">{formatLKR(summary.sponsorAmount)}</p>
        </div>
        <div className="rounded-xl bg-rose-50 p-3">
          <p className="text-xs uppercase tracking-wide text-muted">Expenses</p>
          <p className="mt-1 font-display text-lg text-rose-800">{formatLKR(summary.expenseAmount)}</p>
        </div>
        <div className="rounded-xl bg-white p-3 ring-1 ring-pitch-100">
          <p className="text-xs uppercase tracking-wide text-muted">Day net</p>
          <p className="mt-1 font-display text-lg text-pitch-900">{formatLKR(summary.dayNet)}</p>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-pitch-800">Expenses</h4>
        {summary.expenses.length === 0 ? (
          <p className="text-sm text-muted">No expenses on this date.</p>
        ) : (
          <ul className="space-y-2">
            {summary.expenses.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-2 text-sm">
                <span>{item.purchase_name}</span>
                <span className="font-medium text-rose-700">{formatLKR(item.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-pitch-800">Sponsors</h4>
        {summary.sponsors.length === 0 ? (
          <p className="text-sm text-muted">No sponsorship on this date.</p>
        ) : (
          <ul className="space-y-2">
            {summary.sponsors.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-2 text-sm">
                <span>{item.sponsor_name}</span>
                <span className="font-medium text-amber-700">{formatLKR(item.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
