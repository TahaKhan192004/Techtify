import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function CheckoutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
      <div className="md:col-span-2 space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Shipping Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Phone Number" placeholder="+1 (555) 000-0000" />
          <div className="col-span-2">
            <Input label="Email Address" type="email" placeholder="john@example.com" />
          </div>
          <div className="col-span-2">
            <Input label="Street Address" placeholder="123 Modern Ave" />
          </div>
          <Input label="City" placeholder="San Francisco" />
          <Input label="Postal Code" placeholder="94103" />
        </div>
      </div>

      <div className="bg-[#181818] p-8 rounded-3xl border border-white/5 h-fit space-y-6">
        <h3 className="text-xl font-bold text-center">Order Summary</h3>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span>$189.00</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Shipping</span>
            <span className="text-green-500 font-medium">Free</span>
          </div>
          <div className="h-px bg-white/5 my-2"></div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-[#6366f1]">$189.00</span>
          </div>
        </div>
        <Button className="w-full py-4 uppercase tracking-widest text-xs font-black">
          Complete Purchase
        </Button>
      </div>
    </main>
  );
}