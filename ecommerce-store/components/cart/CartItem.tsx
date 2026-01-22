'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/store/userCart';

export const CartItem = ({ item }: any) => {
  // Pulling specific actions from the store
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);

  const handleIncrease = () => {
    // We only need to pass the ID and the delta (+1)
    updateQuantity(item.id, 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      // Pass the delta (-1) to subtract
      updateQuantity(item.id, -1);
    } else {
      // If quantity is 1 and minus is pressed, remove the item entirely
      removeItem(item.id);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0 group">
      {/* Product Image */}
      <div className="w-20 h-20 bg-[#1a1a1a] rounded-xl overflow-hidden shrink-0 border border-white/5 relative">
        <img 
          src={item.images?.[0] || item.image || '/placeholder.png'} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-100 truncate text-sm md:text-base">
          {item.name}
        </h4>
        <p className="text-[#6366f1] font-mono font-bold text-xs md:text-sm">
          Rs {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      
      {/* Dynamic Controls */}
      <div className="flex items-center gap-2 bg-[#0a0a0a] rounded-xl p-1 border border-white/5 shadow-inner">
        <button 
          onClick={handleDecrease}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all active:scale-90"
        >
          <Minus size={14} />
        </button>
        
        <span className="text-xs w-6 text-center font-bold font-mono text-white">
          {item.quantity}
        </span>
        
        <button 
          onClick={handleIncrease} 
          className="p-2 text-gray-400 hover:text-[#6366f1] hover:bg-[#6366f1]/10 rounded-lg transition-all active:scale-90"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Trash Action */}
      <button 
        onClick={() => removeItem(item.id)}
        className="p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors ml-1"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};