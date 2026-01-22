import { Navbar } from '@/components/layout/navabar';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/actions/products';

export default async function HomePage() {
  // Fetch real data from Supabase
  const products = await getFeaturedProducts();

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="px-6 py-24 flex flex-col items-center text-center space-y-8">
        <div className="inline-block px-3 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#6366f1] text-[10px] font-black tracking-[0.2em] uppercase">
          Lahore's Premium Tech Sourcing
        </div>
        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter max-w-5xl leading-none">
          UPGRADE YOUR <span className="text-[#6366f1]">SETUP</span> WITH PRECISION<span className="text-[#6366f1]">_</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Curated hardware for creators and developers. Direct global sourcing. Hand-to-hand delivery in Lahore.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/allproducts">
            <Button className="py-4 px-10 w-full sm:w-auto">Shop Collection</Button>
          </Link>
          <Link href="/request-product">
            <Button variant="outline" className="py-4 px-10 w-full sm:w-auto">Request Product</Button>
          </Link>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-l-4 border-[#6366f1] pl-6">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">Featured_Drops</h2>
            <p className="text-gray-500 text-sm font-mono mt-1">LATEST_ARRIVALS // 001 - 004</p>
          </div>
          <Link href="/allproducts" className="text-[#6366f1] text-sm font-bold hover:underline tracking-widest uppercase">
            View All →
          </Link>
        </div>
        
        {products.length > 0 ? (
          <ProductGrid>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        ) : (
          <div className="h-60 flex items-center justify-center border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-600 font-mono text-sm uppercase tracking-widest">
              Connecting to database... No products found
            </p>
          </div>
        )}
      </section>

      {/* Local Trust Banner */}
      <section className="bg-[#181818] border-y border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-center gap-8 text-center md:text-left">
          <div>
            <h4 className="font-bold text-white">Lahore Local Delivery</h4>
            <p className="text-sm text-gray-500">Hand-to-hand delivery in Johar Town, DHA & more.</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10" />
          <div>
            <h4 className="font-bold text-white">Lowest Price Guarantee</h4>
            <p className="text-sm text-gray-500">We source globally to beat local retail pricing.</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10" />
          <div>
            <h4 className="font-bold text-white">Custom Sourcing</h4>
            <p className="text-sm text-gray-500">Can't find it? We'll find it for you in 48 hours.</p>
          </div>
        </div>
      </section>
    </main>
  );
}