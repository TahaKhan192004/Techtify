'use server'

import { supabase } from '@/lib/supabase';

export async function getSourcingRequests() {
  const { data, error } = await supabase
    .from('requested_products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch Error:', error.message);
    return { success: false, data: [], error: error.message };
  }

  return { success: true, data };
}