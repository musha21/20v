import { supabase } from '../lib/supabaseClient'

export async function listSponsors() {
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .order('sponsorship_date', { ascending: false })
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function listSponsorsByDate(sponsorshipDate) {
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('sponsorship_date', sponsorshipDate)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function saveSponsor(payload) {
  const row = {
    sponsor_name: payload.sponsor_name,
    mobile_number: payload.mobile_number || null,
    amount: payload.amount,
    sponsorship_date: payload.sponsorship_date,
    description: payload.description || null,
  }

  if (payload.id) {
    const { data, error } = await supabase
      .from('sponsors')
      .update(row)
      .eq('id', payload.id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const { data, error } = await supabase
    .from('sponsors')
    .insert({ ...row, created_by: payload.created_by })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteSponsor(id) {
  const { error } = await supabase.from('sponsors').delete().eq('id', id)
  if (error) throw error
}
