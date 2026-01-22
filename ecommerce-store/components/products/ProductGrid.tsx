// src/components/product/ProductGrid.tsx
export const ProductGrid = ({ children }: any) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {children}
  </div>
);