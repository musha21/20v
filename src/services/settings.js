import { supabase } from '../lib/supabaseClient'

export async function getGroundSettings() {
  const { data, error } = await supabase
    .from('ground_settings')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error

  return (
    data || {
      id: null,
      opening_balance: 0,
      opening_balance_note: '',
    }
  )
}

export async function getOpeningBalance() {
  const settings = await getGroundSettings()
  return {
    id: settings.id,
    amount: Number(settings.opening_balance || 0),
    note: settings.opening_balance_note || '',
  }
}

export async function saveOpeningBalance({ id, amount, note, updated_by }) {
  const payload = {
    opening_balance: amount,
    opening_balance_note: note || null,
    updated_by,
  }

  if (id) {
    const { data, error } = await supabase
      .from('ground_settings')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const { data, error } = await supabase
    .from('ground_settings')
    .insert(payload)
    .select()
    .single()
  if (error) throw error
  return data
}
