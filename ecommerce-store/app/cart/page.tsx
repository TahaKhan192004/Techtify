'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/store/userCart';
import { CartItem } from '@/components/cart/CartItem';
import { CheckoutButton } from '@/components/cart/CheckOutForm';
import { ShippingForm } from '@/components/cart/ShippingForm';
import { Navbar } from '@/components/layout/navabar';

export default function CartPage() {
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);
  
  // Local state for shipping form
  const [shippingData, setShippingData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleFormChange = (field: string, value: string) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-10 italic">CHECKOUT<span className="text-[#6366f1]">_</span></h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-[#181818] rounded-3xl border border-white/5">
             <p className="text-gray-400">Your bag is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left side: Items & Shipping Form */}
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-[#181818] p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold mb-6">Review Items</h3>
                <div className="divide-y divide-white/5">
                  {items.map((item) => <CartItem key={item.id} item={item} />)}
                </div>
              </section>

              <section className="bg-[#181818] p-8 rounded-3xl border border-white/5">
                <ShippingForm data={shippingData} onChange={handleFormChange} />
              </section>
            </div>

            {/* Right side: Summary */}
            <div className="lg:col-span-4">
              <div className="bg-[#181818] p-8 rounded-3xl border border-white/5 sticky top-28">
                <h3 className="text-xl font-bold mb-6">Summary</h3>
                <CheckoutButton shippingData={shippingData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}