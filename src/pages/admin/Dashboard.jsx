import { useEffect, useState } from 'react'
import {
  Wallet,
  HandCoins,
  ShoppingBag,
  Scale,
  TrendingUp,
  PiggyBank,
} from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import PageHeader from '../../components/PageHeader'
import SummaryCard from '../../components/SummaryCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useAuth } from '../../context/AuthContext'
import { getFinanceSummary } from '../../services/finance'
import { saveOpeningBalance } from '../../services/settings'
import { formatDate, formatLKR, parseAmount } from '../../utils/format'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openingAmount, setOpeningAmount] = useState('')
  const [openingNote, setOpeningNote] = useState('')
  const [savingOpening, setSavingOpening] = useState(false)
  const [openingMsg, setOpeningMsg] = useState('')

  async function loadSummary() {
    const data = await getFinanceSummary()
    setSummary(data)
    setOpeningAmount(String(data.openingBalance ?? 0))
    setOpeningNote(data.openingBalanceNote || '')
    return data
  }

  useEffect(() => {
    let mounted = true
    loadSummary()
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

  async function handleSaveOpening(e) {
    e.preventDefault()
    setSavingOpening(true)
    setOpeningMsg('')
    setError('')
    try {
      await saveOpeningBalance({
        id: summary?.openingBalanceId,
        amount: parseAmount(openingAmount),
        note: openingNote,
        updated_by: user.id,
      })
      await loadSummary()
      setOpeningMsg('Opening balance saved.')
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingOpening(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading dashboard..." />
  if (error && !summary) return <p className="rounded-xl bg-rose-50 p-4 text-rose-700">{error}</p>
  if (!summary) return null

  return (
    <div className="space-y-6">
      <PageHeader title="Admin dashboard" subtitle="Ground cash overview from live records" />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <SummaryCard title="Opening balance" value={formatLKR(summary.openingBalance)} icon={PiggyBank} tone="light" />
        <SummaryCard title="Today's collection" value={formatLKR(summary.todayCollection)} icon={Wallet} />
        <SummaryCard title="Total collection" value={formatLKR(summary.totalCollection)} icon={TrendingUp} tone="light" />
        <SummaryCard title="Total sponsorship" value={formatLKR(summary.totalSponsorship)} icon={HandCoins} tone="amber" />
        <SummaryCard title="Total expenses" value={formatLKR(summary.totalExpenses)} icon={ShoppingBag} tone="rose" />
        <SummaryCard title="Current balance" value={formatLKR(summary.currentBalance)} icon={Scale} />
      </div>

      <form onSubmit={handleSaveOpening} className="card-surface grid gap-3 rounded-2xl p-4 md:grid-cols-3">
        <div className="md:col-span-3">
          <h3 className="font-display text-lg text-pitch-900">Opening balance (before system)</h3>
          <p className="text-sm text-muted">
            One-time cash already held before this app. Not counted as a daily collection.
          </p>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Amount (LKR)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="input-field"
            value={openingAmount}
            onChange={(e) => setOpeningAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Note</label>
          <input
            className="input-field"
            value={openingNote}
            onChange={(e) => setOpeningNote(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div className="flex items-end">
          <button type="submit" className="btn-primary w-full" disabled={savingOpening}>
            {savingOpening ? 'Saving...' : 'Save opening balance'}
          </button>
        </div>
        {openingMsg ? (
          <p className="md:col-span-3 rounded-xl bg-pitch-50 px-3 py-2 text-sm text-pitch-800">{openingMsg}</p>
        ) : null}
        {error ? (
          <p className="md:col-span-3 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
        ) : null}
      </form>

      <div className="card-surface rounded-2xl p-4">
        <h3 className="mb-3 font-display text-lg text-pitch-900">Monthly collection vs expenses</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summary.monthlyChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatLKR(value)} />
              <Legend />
              <Bar dataKey="collection" name="Collection" fill="#16a34a" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" name="Expenses" fill="#f43f5e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <RecentList
          title="Recent collections"
          rows={summary.recentCollections}
          empty="No collections yet"
          mapRow={(row) => ({
            id: row.id,
            left: formatDate(row.collection_date),
            right: formatLKR(row.amount),
          })}
        />
        <RecentList
          title="Recent expenses"
          rows={summary.recentExpenses}
          empty="No expenses yet"
          mapRow={(row) => ({
            id: row.id,
            left: row.purchase_name,
            right: formatLKR(row.amount),
          })}
        />
        <RecentList
          title="Recent sponsors"
          rows={summary.recentSponsors}
          empty="No sponsors yet"
          mapRow={(row) => ({
            id: row.id,
            left: row.sponsor_name,
            right: formatLKR(row.amount),
          })}
        />
      </div>
    </div>
  )
}

function RecentList({ title, rows, empty, mapRow }) {
  return (
    <div className="card-surface rounded-2xl p-4">
      <h3 className="mb-3 font-display text-lg text-pitch-900">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted">{empty}</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((row) => {
            const item = mapRow(row)
            return (
              <li key={item.id} className="flex items-center justify-between rounded-xl bg-pitch-50/70 px-3 py-2 text-sm">
                <span className="text-pitch-900">{item.left}</span>
                <span className="font-semibold text-pitch-700">{item.right}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
