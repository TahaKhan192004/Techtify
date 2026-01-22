'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';

export const FilterSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Update the URL without a full page reload
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    router.push(`/allproducts?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-4 w-full md:w-auto">
      <button className="flex flex-1 md:flex-none items-center justify-center gap-2 bg-[#181818] border border-white/10 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors">
        <SlidersHorizontal size={16} />
        Filter
      </button>
      
      <select 
        onChange={(e) => handleSortChange(e.target.value)}
        defaultValue={searchParams.get('sort') || ''}
        className="flex-1 md:flex-none bg-[#181818] border border-white/10 px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#6366f1] text-gray-300"
      >
        <option value="">Newest First</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
      </select>
    </div>
  );
};