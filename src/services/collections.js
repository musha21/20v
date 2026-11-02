import { supabase } from '../lib/supabaseClient'

export async function listCollections() {
  const { data, error } = await supabase
    .from('daily_collections')
    .select('*')
    .order('collection_date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getCollectionByDate(collectionDate) {
  const { data, error } = await supabase
    .from('daily_collections')
    .select('*')
    .eq('collection_date', collectionDate)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function upsertCollection({ id, collection_date, amount, description, created_by }) {
  if (id) {
    const { data, error } = await supabase
      .from('daily_collections')
      .update({
        collection_date,
        amount,
        description: description || null,
      })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const { data, error } = await supabase
    .from('daily_collections')
    .insert({
      collection_date,
      amount,
      description: description || null,
      created_by,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteCollection(id) {
  const { error } = await supabase.from('daily_collections').delete().eq('id', id)
  if (error) throw error
}
