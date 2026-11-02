import { listCollections } from './collections'
import { listExpenses } from './expenses'
import { listSponsors } from './sponsors'
import { getOpeningBalance } from './settings'
import { todayISO } from '../utils/format'

function sumAmount(rows) {
  return rows.reduce((total, row) => total + Number(row.amount || 0), 0)
}

function monthLabel(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`)
  return d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })
}

export async function getFinanceSummary() {
  const [collections, expenses, sponsors, opening] = await Promise.all([
    listCollections(),
    listExpenses(),
    listSponsors(),
    getOpeningBalance(),
  ])

  const today = todayISO()
  const todayCollection = collections.find((c) => c.collection_date === today)
  const totalCollection = sumAmount(collections)
  const totalSponsorship = sumAmount(sponsors)
  const totalExpenses = sumAmount(expenses)
  const openingBalance = Number(opening.amount || 0)
  const totalIncome = openingBalance + totalCollection + totalSponsorship
  const currentBalance = totalIncome - totalExpenses

  const monthMap = new Map()

  collections.forEach((row) => {
    const key = row.collection_date.slice(0, 7)
    const entry = monthMap.get(key) || { month: monthLabel(row.collection_date), collection: 0, expense: 0 }
    entry.collection += Number(row.amount || 0)
    monthMap.set(key, entry)
  })

  expenses.forEach((row) => {
    const key = row.expense_date.slice(0, 7)
    const entry = monthMap.get(key) || { month: monthLabel(row.expense_date), collection: 0, expense: 0 }
    entry.expense += Number(row.amount || 0)
    monthMap.set(key, entry)
  })

  const monthlyChart = Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([, value]) => value)

  return {
    todayCollection: Number(todayCollection?.amount || 0),
    openingBalance,
    openingBalanceNote: opening.note || '',
    openingBalanceId: opening.id,
    totalCollection,
    totalSponsorship,
    totalExpenses,
    totalIncome,
    currentBalance,
    recentCollections: collections.slice(0, 5),
    recentExpenses: expenses.slice(0, 5),
    recentSponsors: sponsors.slice(0, 5),
    monthlyChart,
    collections,
    expenses,
    sponsors,
  }
}

export async function getDaySummary(dateStr) {
  const [collections, expenses, sponsors] = await Promise.all([
    listCollections(),
    listExpenses(),
    listSponsors(),
  ])

  const collection = collections.find((c) => c.collection_date === dateStr) || null
  const dayExpenses = expenses.filter((e) => e.expense_date === dateStr)
  const daySponsors = sponsors.filter((s) => s.sponsorship_date === dateStr)

  const collectionAmount = Number(collection?.amount || 0)
  const expenseAmount = sumAmount(dayExpenses)
  const sponsorAmount = sumAmount(daySponsors)

  return {
    collection,
    expenses: dayExpenses,
    sponsors: daySponsors,
    collectionAmount,
    expenseAmount,
    sponsorAmount,
    dayNet: collectionAmount + sponsorAmount - expenseAmount,
  }
}
