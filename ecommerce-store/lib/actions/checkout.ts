'use server'
import { supabase } from '@/lib/supabase';

export async function createOrder({ 
  customerData, 
  cartItems, 
  total 
}: { 
  customerData: any; 
  cartItems: any[]; 
  total: number 
}) {
  try {
    const { error } = await supabase
      .from('orders')
      .insert([{
        username: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        product_details: cartItems, // Ensure this column is JSONB in Supabase
        total_price: total,
        status: 'Processing'
      }]);

    if (error) {
      console.error('Supabase Error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Server Crash:', err);
    return { success: false, error: 'Internal Server Error' };
  }
}