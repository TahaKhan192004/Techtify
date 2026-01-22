'use client'
import { useCart } from '@/lib/store/userCart';
import { ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';

export const ProductCard = ({ product }: any) => {
  const addItem = useCart((state) => state.addItem);

  return (
    <div className="bg-[#181818] rounded-3xl overflow-hidden border border-white/5 group transition-all hover:border-[#6366f1]/30">
      {/* Clickable Image */}
      <Link href={`/products/${product.id}`} className="aspect-square relative block overflow-hidden">
        <img 
          src={product.images?.[0] || product.image} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
             <Eye size={14} /> View Details
           </span>
        </div>
      </Link>

      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-1 truncate">{product.name}</h3>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Price</span>
            <span className="text-xl font-black text-[#6366f1]">${product.price}</span>
          </div>
          
          <div className="flex gap-2">
            <Link 
              href={`/products/${product.id}`}
              className="p-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl transition-colors border border-white/5"
            >
              <Eye size={20} />
            </Link>
            <button 
              onClick={() => addItem(product)}
              className="p-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl transition-colors shadow-lg shadow-[#6366f1]/20"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};