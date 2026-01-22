'use server'
import { supabase } from '@/lib/supabase';

export async function createOrder(customerData: any, cartItems: any[], total: number) {
  const { error } = await supabase
    .from('orders')
    .insert([{
      username: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      address: customerData.address,
      product_details: cartItems, // JSONB column
      total_price: total
    }]);

  if (error) {
    console.error('Order Error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}