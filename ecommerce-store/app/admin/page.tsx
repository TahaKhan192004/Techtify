import { supabase } from '@/lib/supabase';
import { OrdersTable } from '@/components/admin/OrdersTable';
import Link from 'next/link';
import { Box, MessageSquare, PlusCircle, LayoutDashboard } from 'lucide-react';

export default async function AdminDashboard() {
  // Fetch real orders from Supabase
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Error loading dashboard: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-3">
              <LayoutDashboard className="text-[#6366f1]" />
              ADMIN_CENTRAL<span className="text-[#6366f1]">_</span>
            </h1>
            <p className="text-gray-500 text-sm font-mono mt-1">SYSTEM_STATUS: ACTIVE // ORDERS_LOG</p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/admin/products" 
              className="flex items-center gap-2 bg-[#181818] hover:bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            >
              <Box size={18} className="text-[#6366f1]" />
              Manage Inventory
            </Link>
            
            <Link 
              href="/admin/requests" 
              className="flex items-center gap-2 bg-[#181818] hover:bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            >
              <MessageSquare size={18} className="text-[#6366f1]" />
              User Requests
            </Link>

            <Link 
              href="/admin/products" 
              className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#6366f1]/20"
            >
              <PlusCircle size={18} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="bg-[#181818] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-white/[0.02]">
            <h2 className="text-lg font-bold">Recent Transaction History</h2>
          </div>
          <div className="p-6">
            <OrdersTable orders={orders || []} />
          </div>
        </div>

      </div>
    </div>
  );
}