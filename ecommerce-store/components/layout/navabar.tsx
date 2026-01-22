'use client';

import { ShoppingBag, Zap, Search, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/lib/store/userCart'; 
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useCart((state) => state.totalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when clicking a link
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter">
          <Zap className="text-[#6366f1] fill-[#6366f1]" size={24} />
          <span className="text-white">TechTify<span className="text-[#6366f1]">X</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/allproducts" className="hover:text-white transition-colors">Shop</Link>
          <Link href="/request-product" className="hover:text-[#818cf8] text-[#6366f1] transition-colors">Request Item</Link>
          <Link href="/support" className="hover:text-white transition-colors">Support</Link>
        </div>

        {/* Icons & Mobile Toggle */}
        <div className="flex items-center gap-4 md:gap-5">
          <Search size={20} className="hidden sm:block text-gray-400 cursor-pointer hover:text-white transition-colors" />
          
          <Link href="/cart" className="relative group p-1">
            <ShoppingBag 
              size={22} 
              className="text-gray-300 group-hover:text-[#6366f1] transition-colors" 
            />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#6366f1] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0f0f0f] border-b border-white/5 md:hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-6 text-lg font-medium">
            <Link 
              href="/allproducts" 
              onClick={closeMenu}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Shop
            </Link>
            <Link 
              href="/request-product" 
              onClick={closeMenu}
              className="text-[#6366f1] hover:text-[#818cf8] transition-colors"
            >
              Request Item
            </Link>
            <Link 
              href="/support" 
              onClick={closeMenu}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Support
            </Link>
            <div className="pt-4 border-t border-white/5 flex items-center gap-4">
               <Search size={20} className="text-gray-400" />
               <span className="text-sm text-gray-400">Search Products</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};