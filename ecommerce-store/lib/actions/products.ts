'use server'
import { supabase } from '@/lib/supabase';

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4); // Fetch only 4 items for the home page

  if (error) {
    console.error('Error fetching featured products:', error.message);
    return [];
  }
  return data;
}