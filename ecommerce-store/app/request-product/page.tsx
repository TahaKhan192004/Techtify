// app/request-product/page.tsx
import { Navbar } from '../../components/layout/navabar';
import { ProductRequestForm } from '@/components/forms/ProductRequestForm';

export default function RequestProductPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Can't find it? <span className="text-[#6366f1]">We'll source it.</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Fill out the details below. Our team specializes in finding rare accessories and tech gear at competitive prices.
          </p>
        </header>

        {/* This is the component you just created */}
        <ProductRequestForm />
      </div>
    </main>
  );
}