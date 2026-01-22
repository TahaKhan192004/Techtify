import { supabase } from '@/lib/supabase';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductGrid } from '@/components/products/ProductGrid';
import { FilterSection } from '@/components/products/FilterSection';
import { Navbar } from '@/components/layout/navabar';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const params = await searchParams;
  let query = supabase.from('products').select('*');

  // Server-side filtering logic
  if (params.sort === 'price_low') {
    query = query.order('price', { ascending: true });
  } else if (params.sort === 'price_high') {
    query = query.order('price', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data: products } = await query;

  return (
    <><Navbar /><div className="max-w-7xl mx-auto px-6 py-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            All <span className="text-[#6366f1]">Accessories</span>
          </h1>
          <p className="text-gray-500 mt-1">Showing {products?.length || 0} premium items</p>
        </div>

        {/* The component we just created */}
        <FilterSection />
      </header>

      <ProductGrid>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </div></>
  );
}