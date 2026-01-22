import { Navbar } from '@/components/layout/navabar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Truck, RefreshCcw, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data;
}

// Note: params is now a Promise in Next.js 15
export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Await the params to unwrap the ID
  const { id } = await params;

  // 2. Pass the unwrapped ID to your fetch function
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link href="/products" className="flex items-center gap-2 text-gray-500 hover:text-[#6366f1] transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Collection</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl bg-[#181818] overflow-hidden border border-white/5 group">
              <img 
                src={product.images?.[0] || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <Badge color="indigo">Verified Quality</Badge>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
                {product.name}<span className="text-[#6366f1]">_</span>
              </h1>
              <div className="flex items-baseline gap-4">
                <p className="text-4xl font-mono font-bold text-[#6366f1]">${product.price}</p>
              </div>
            </div>

            <div className="bg-[#181818] p-6 rounded-2xl border border-white/5">
              <p className="text-gray-400 leading-relaxed italic">
                {product.description || "No description provided."}
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* If you want this to actually add to cart, 
                  you'll need to use a Client Component for this button */}
              
              <div className="grid grid-cols-3 gap-4 text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] text-center">
                <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <Truck size={22} className="text-[#6366f1]"/> 
                  <span>Lahore Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <ShieldCheck size={22} className="text-[#6366f1]"/> 
                  <span>Core Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <RefreshCcw size={22} className="text-[#6366f1]"/> 
                  <span>Easy Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}