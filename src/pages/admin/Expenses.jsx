import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import LoadingSpinner from '../../components/LoadingSpinner'
import EmptyState from '../../components/EmptyState'
import ConfirmDialog from '../../components/ConfirmDialog'
import { useAuth } from '../../context/AuthContext'
import { deleteExpense, listExpenses, saveExpense } from '../../services/expenses'
import { formatDate, formatLKR, parseAmount, todayISO } from '../../utils/format'

const emptyForm = {
  id: null,
  purchase_name: '',
  amount: '',
  expense_date: todayISO(),
  description: '',
}

export default function AdminExpenses() {
  const { user } = useAuth()
  const [rows, setRows] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deleteId, setDeleteId] = useState(null)

  async function load() {
    setLoading(true)
    try {
      setRows(await listExpenses())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await saveExpense({
        ...form,
        amount: parseAmount(form.amount),
        created_by: user.id,
      })
      setForm(emptyForm)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function confirmDelete() {
    setSaving(true)
    try {
      await deleteExpense(deleteId)
      setDeleteId(null)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-5">
      <PageHeader title="Expenses & purchases" subtitle="Track ground spending in LKR" />

      <form onSubmit={handleSubmit} className="card-surface grid gap-3 rounded-2xl p-4 md:grid-cols-2 xl:grid-cols-5">
        <div>
          <label className="mb-1 block text-sm font-medium">Purchase name</label>
          <input
            className="input-field"
            value={form.purchase_name}
            onChange={(e) => setForm((f) => ({ ...f, purchase_name: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Amount (LKR)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="input-field"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Date</label>
          <input
            type="date"
            className="input-field"
            value={form.expense_date}
            onChange={(e) => setForm((f) => ({ ...f, expense_date: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <input
            className="input-field"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Optional"
          />
        </div>
        <div className="flex items-end gap-2">
          <button type="submit" className="btn-primary w-full" disabled={saving}>
            <Plus className="h-4 w-4" />
            {form.id ? 'Update' : 'Add'}
          </button>
          {form.id ? (
            <button type="button" className="btn-secondary" onClick={() => setForm(emptyForm)}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      {error ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

      {rows.length === 0 ? (
        <EmptyState title="No expenses yet" description="Add balls, nets, lights or other purchases here." />
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
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-pitch-50">
                    <td className="px-4 py-3 font-medium">{row.purchase_name}</td>
                    <td className="px-4 py-3">{formatDate(row.expense_date)}</td>
                    <td className="px-4 py-3 font-semibold text-rose-700">{formatLKR(row.amount)}</td>
                    <td className="px-4 py-3 text-muted">{row.description || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="btn-secondary px-2 py-1"
                          onClick={() =>
                            setForm({
                              id: row.id,
                              purchase_name: row.purchase_name,
                              amount: String(row.amount),
                              expense_date: row.expense_date,
                              description: row.description || '',
                            })
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button type="button" className="btn-danger px-2 py-1" onClick={() => setDeleteId(row.id)}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete expense?"
        message="This expense will be removed from the ground balance."
        confirmLabel="Delete"
        danger
        loading={saving}
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
