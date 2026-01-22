'use client';

import { ShoppingBag, Zap, Search } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/lib/store/userCart'; 
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCart((state) => state.totalItems());

  // Wait until the component is mounted on the client to show the cart count
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter">
        <Zap className="text-[#6366f1] fill-[#6366f1]" size={24} />
        <span className="text-white">TechTify<span className="text-[#6366f1]">X</span></span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <Link href="/allproducts" className="hover:text-white transition-colors">Shop</Link>
        <Link href="/request-product" className="hover:text-[#818cf8] text-[#6366f1] transition-colors">Request Item</Link>
        <Link href="/support" className="hover:text-white transition-colors">Support</Link>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-5">
        <Search size={20} className="text-gray-400 cursor-pointer hover:text-white transition-colors" />
        
        <Link href="/cart" className="relative group p-1">
          <ShoppingBag 
            size={22} 
            className="text-gray-300 group-hover:text-[#6366f1] transition-colors" 
          />
          
          {/* Badge: Only shows if mounted and items > 0 */}
          {mounted && totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#6366f1] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};