'use client';

import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight, Home } from 'lucide-react';
import { Navbar } from '@/components/layout/navabar';
import { useEffect, useState } from 'react';

export default function ThankYouPage() {
  const [orderId, setOrderId] = useState<string>('');
 
  useEffect(() => {
    // Generate a random temporary ID for display if you aren't passing one via URL
    setOrderId(Math.random().toString(36).toUpperCase().substring(2, 10));
  }, []);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        {/* Animated Success Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#6366f1] blur-3xl opacity-20 animate-pulse" />
          <CheckCircle2 size={80} className="text-[#6366f1] relative z-10" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4">
          ORDER_CONFIRMED<span className="text-[#6366f1]">_</span>
        </h1>
        
        <p className="text-gray-400 text-lg max-w-md mb-8">
          We've received your order and our team is getting it ready for dispatch.
        </p>

        {/* Order Details Card */}
        <div className="w-full bg-[#181818] rounded-3xl p-8 border border-white/5 mb-12 text-left">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Order Number</p>
              <p className="font-mono text-lg text-white">#{orderId}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Status</p>
              <div className="flex items-center gap-2 text-[#6366f1]">
                <div className="w-2 h-2 bg-[#6366f1] rounded-full animate-ping" />
                <span className="font-bold">Processing</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Estimate Delivery</p>
              <p className="text-white font-medium">3-5 Business Days</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link 
            href="/products" 
            className="flex-1 bg-[#181818] hover:bg-white/5 border border-white/10 p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Home size={18} />
            Continue Shopping
          </Link>
        </div>

        <p className="mt-12 text-gray-600 text-sm">
          Need help? <Link href="/support" className="text-gray-400 hover:text-white underline">Contact Support</Link>
        </p>
      </div>
    </main>
  );
}