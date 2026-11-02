import { supabase } from '../lib/supabaseClient'

export async function listExpenses() {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('expense_date', { ascending: false })
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function listExpensesByDate(expenseDate) {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('expense_date', expenseDate)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function saveExpense(payload) {
  const row = {
    purchase_name: payload.purchase_name,
    amount: payload.amount,
    expense_date: payload.expense_date,
    description: payload.description || null,
  }

  if (payload.id) {
    const { data, error } = await supabase
      .from('expenses')
      .update(row)
      .eq('id', payload.id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const { data, error } = await supabase
    .from('expenses')
    .insert({ ...row, created_by: payload.created_by })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteExpense(id) {
  const { error } = await supabase.from('expenses').delete().eq('id', id)
  if (error) throw error
}
