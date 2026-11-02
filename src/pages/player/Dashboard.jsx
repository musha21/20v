import { useEffect, useMemo, useState } from 'react'
import { Wallet, HandCoins, ShoppingBag, Scale, TrendingUp, PiggyBank } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import SummaryCard from '../../components/SummaryCard'
import MonthCalendar from '../../components/MonthCalendar'
import LoadingSpinner from '../../components/LoadingSpinner'
import { getFinanceSummary } from '../../services/finance'
import { formatDate, formatLKR, todayISO } from '../../utils/format'

export default function PlayerDashboard() {
  const now = new Date()
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selectedDate, setSelectedDate] = useState(todayISO())

  useEffect(() => {
    let mounted = true
    getFinanceSummary()
      .then((data) => {
        if (mounted) setSummary(data)
      })
      .catch((err) => {
        if (mounted) setError(err.message)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const amountsByDate = useMemo(() => {
    const map = {}
    ;(summary?.collections || []).forEach((row) => {
      map[row.collection_date] = Number(row.amount)
    })
    return map
  }, [summary])

  if (loading) return <LoadingSpinner />
  if (error) return <p className="rounded-xl bg-rose-50 p-4 text-rose-700">{error}</p>
  if (!summary) return null

  return (
    <div className="space-y-6">
      <PageHeader title="Ground overview" subtitle="View-only cash summary for village players" />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <SummaryCard title="Opening balance" value={formatLKR(summary.openingBalance)} icon={PiggyBank} tone="light" />
        <SummaryCard title="Today's collection" value={formatLKR(summary.todayCollection)} icon={Wallet} />
        <SummaryCard title="Total ground collection" value={formatLKR(summary.totalCollection)} icon={TrendingUp} tone="light" />
        <SummaryCard title="Total sponsorship" value={formatLKR(summary.totalSponsorship)} icon={HandCoins} tone="amber" />
        <SummaryCard title="Total expenses" value={formatLKR(summary.totalExpenses)} icon={ShoppingBag} tone="rose" />
        <SummaryCard title="Current ground balance" value={formatLKR(summary.currentBalance)} icon={Scale} />
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <MonthCalendar
            year={year}
            month={month}
            amountsByDate={amountsByDate}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onChangeMonth={(delta) => {
              const next = new Date(year, month + delta, 1)
              setYear(next.getFullYear())
              setMonth(next.getMonth())
            }}
          />
        </div>
        <div className="space-y-4 xl:col-span-2">
          <div className="card-surface rounded-2xl p-4">
            <h3 className="mb-3 font-display text-lg text-pitch-900">Recent expenses</h3>
            {summary.recentExpenses.length === 0 ? (
              <p className="text-sm text-muted">No expenses yet.</p>
            ) : (
              <ul className="space-y-2">
                {summary.recentExpenses.map((row) => (
                  <li key={row.id} className="flex justify-between rounded-xl bg-pitch-50/70 px-3 py-2 text-sm">
                    <span>
                      {row.purchase_name}
                      <span className="mt-0.5 block text-xs text-muted">{formatDate(row.expense_date)}</span>
                    </span>
                    <span className="font-semibold text-rose-700">{formatLKR(row.amount)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="card-surface rounded-2xl p-4">
            <h3 className="mb-3 font-display text-lg text-pitch-900">Sponsors</h3>
            {summary.recentSponsors.length === 0 ? (
              <p className="text-sm text-muted">No sponsors yet.</p>
            ) : (
              <ul className="space-y-2">
                {summary.recentSponsors.map((row) => (
                  <li key={row.id} className="flex justify-between rounded-xl bg-amber-50/70 px-3 py-2 text-sm">
                    <span>{row.sponsor_name}</span>
                    <span className="font-semibold text-amber-700">{formatLKR(row.amount)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
