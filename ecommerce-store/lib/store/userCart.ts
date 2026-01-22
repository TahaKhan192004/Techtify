import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  images?: string[];
  image?: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: any) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Standard add (always increments by 1)
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Normalize image handling for safety
          set({
            items: [...currentItems, { ...product, quantity: 1 }],
          });
        }
      },

      // Dedicated method for + and - buttons
      updateQuantity: (id, delta) => {
        const currentItems = get().items;
        const updatedItems = currentItems
          .map((item) => {
            if (item.id === id) {
              const newQuantity = item.quantity + delta;
              // Return updated item if quantity is at least 1
              return newQuantity >= 1 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
          })
          // If you want to automatically remove item when quantity hits 0, 
          // change the logic above and use .filter(item => item.quantity > 0)
        
        set({ items: updatedItems });
      },

      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      
      clearCart: () => set({ items: [] }),

      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
);