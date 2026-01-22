'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock } from 'lucide-react';
import { useCart } from '@/lib/store/userCart'; // Double check this path matches your store
import { createOrder } from '@/lib/actions/checkout';

interface ShippingData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const CheckoutButton = ({ shippingData }: { shippingData: ShippingData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Accessing cart state
  const items = useCart((state) => state.items);
  const totalPrice = useCart((state) => state.totalPrice());
  const clearCart = useCart((state) => state.clearCart);

  const handleCheckout = async () => {
    // 1. Client-side Validation
    if (!shippingData.name || !shippingData.email || !shippingData.address) {
      alert("Please fill in all shipping details before proceeding.");
      return;
    }

    if (items.length === 0) {
      alert("Your bag is empty.");
      return;
    }

    setLoading(true);

    try {
      // 2. Format data for the Server Action
      // We pass a single object to avoid argument mismatch errors
      const orderPayload = {
        customerData: {
          name: shippingData.name,
          email: shippingData.email,
          phone: shippingData.phone,
          address: shippingData.address,
        },
        cartItems: items,
        total: totalPrice,
      };

      const result = await createOrder(orderPayload);

      // 3. Handle Result
      if (result.success) {
        clearCart();
        
        
        // Use router.push for a smoother SPA transition than window.location
        router.push('/thank-you');
      } else {
        // If Supabase returns an error, it will show up here
        alert(`Order Error: ${result.error || 'Check server logs'}`);
      }
    } catch (error) {
      console.error("Checkout process failed:", error);
      alert("A network error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout} 
      disabled={loading || items.length === 0}
      className="group relative w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white p-4 rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden"
    >
      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      
      {loading ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>Processing Order...</span>
        </>
      ) : (
        <>
          <Lock size={18} className="text-white/70" />
          <span>Pay ${totalPrice.toFixed(2)}</span>
        </>
      )}
    </button>
  );
};