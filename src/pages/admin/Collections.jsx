import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import LoadingSpinner from '../../components/LoadingSpinner'
import EmptyState from '../../components/EmptyState'
import ConfirmDialog from '../../components/ConfirmDialog'
import { useAuth } from '../../context/AuthContext'
import { deleteCollection, listCollections, upsertCollection } from '../../services/collections'
import { formatDate, formatLKR, parseAmount, todayISO } from '../../utils/format'

const emptyForm = {
  id: null,
  collection_date: todayISO(),
  amount: '',
  description: '',
}

export default function AdminCollections() {
  const { user } = useAuth()
  const [rows, setRows] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deleteId, setDeleteId] = useState(null)

  async function load() {
    setLoading(true)
    setError('')
    try {
      setRows(await listCollections())
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
      await upsertCollection({
        id: form.id,
        collection_date: form.collection_date,
        amount: parseAmount(form.amount),
        description: form.description,
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
      await deleteCollection(deleteId)
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
      <PageHeader
        title="Daily cash collections"
        subtitle="Record one total cash collection per date"
      />

      <form onSubmit={handleSubmit} className="card-surface grid gap-3 rounded-2xl p-4 sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Date</label>
          <input
            type="date"
            className="input-field"
            value={form.collection_date}
            onChange={(e) => setForm((f) => ({ ...f, collection_date: e.target.value }))}
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
        <div className="sm:col-span-2 lg:col-span-1">
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
            {form.id ? 'Update' : 'Save'}
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
        <EmptyState title="No collections yet" description="Add today's cash total to get started." />
      ) : (
        <>
          <div className="mobile-card-list">
            {rows.map((row) => (
              <div key={row.id} className="card-surface rounded-2xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-pitch-900">{formatDate(row.collection_date)}</p>
                    <p className="mt-1 text-sm text-muted">{row.description || 'No description'}</p>
                  </div>
                  <p className="font-display text-lg font-semibold text-pitch-700">{formatLKR(row.amount)}</p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="btn-secondary flex-1"
                    onClick={() =>
                      setForm({
                        id: row.id,
                        collection_date: row.collection_date,
                        amount: String(row.amount),
                        description: row.description || '',
                      })
                    }
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                  <button type="button" className="btn-danger flex-1" onClick={() => setDeleteId(row.id)}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="desktop-table card-surface overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-pitch-50 text-pitch-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-t border-pitch-50">
                      <td className="px-4 py-3">{formatDate(row.collection_date)}</td>
                      <td className="px-4 py-3 font-semibold text-pitch-700">{formatLKR(row.amount)}</td>
                      <td className="px-4 py-3 text-muted">{row.description || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="btn-secondary px-2 py-1"
                            onClick={() =>
                              setForm({
                                id: row.id,
                                collection_date: row.collection_date,
                                amount: String(row.amount),
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
        </>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete collection?"
        message="This removes the daily cash summary for that date."
        confirmLabel="Delete"
        danger
        loading={saving}
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
