import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import MonthCalendar from '../../components/MonthCalendar'
import DaySummaryPanel from '../../components/DaySummaryPanel'
import LoadingSpinner from '../../components/LoadingSpinner'
import { getDaySummary, getFinanceSummary } from '../../services/finance'
import { todayISO } from '../../utils/format'

export default function AdminCalendar() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selectedDate, setSelectedDate] = useState(todayISO())
  const [collections, setCollections] = useState([])
  const [daySummary, setDaySummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dayLoading, setDayLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    getFinanceSummary()
      .then((data) => {
        if (mounted) setCollections(data.collections)
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

  useEffect(() => {
    if (!selectedDate) return
    let mounted = true
    setDayLoading(true)
    getDaySummary(selectedDate)
      .then((data) => {
        if (mounted) setDaySummary(data)
      })
      .catch((err) => {
        if (mounted) setError(err.message)
      })
      .finally(() => {
        if (mounted) setDayLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [selectedDate])

  const amountsByDate = useMemo(() => {
    const map = {}
    collections.forEach((row) => {
      map[row.collection_date] = Number(row.amount)
    })
    return map
  }, [collections])

  function changeMonth(delta) {
    const next = new Date(year, month + delta, 1)
    setYear(next.getFullYear())
    setMonth(next.getMonth())
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-5">
      <PageHeader title="Collection calendar" subtitle="Select a date for the full daily summary" />
      {error ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}
      <div className="grid gap-4 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <MonthCalendar
            year={year}
            month={month}
            amountsByDate={amountsByDate}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onChangeMonth={changeMonth}
          />
        </div>
        <div className="xl:col-span-2">
          <DaySummaryPanel date={selectedDate} summary={daySummary} loading={dayLoading} />
        </div>
      </div>
    </div>
  )
}
