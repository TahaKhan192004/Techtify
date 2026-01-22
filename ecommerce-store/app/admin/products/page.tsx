import { Navbar } from '@/components/layout/navabar';
import { ProductForm } from '@/components/admin/ProductsForm';
import { supabase } from '@/lib/supabase';
import { Trash2 } from 'lucide-react';

export default async function AdminProductsPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">
        
        {/* Left Side: Add Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
          <ProductForm />
        </div>

        {/* Right Side: Inventory List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Current Inventory</h2>
          <div className="space-y-4">
            {products?.map((product) => (
              <div key={product.id} className="bg-[#181818] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={product.images[0]} className="w-12 h-12 rounded-lg object-cover" alt="" />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-[#6366f1] font-bold">${product.price}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}