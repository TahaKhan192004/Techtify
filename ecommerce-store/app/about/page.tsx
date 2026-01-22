'use client';

import { Navbar } from '@/components/layout/navabar';
import { Footer } from '@/components/layout/footer';
import { Target, Truck, ShieldCheck, Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#6366f1] text-[10px] font-black tracking-[0.2em] uppercase mb-6">
          Established 2024
        </div>
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8">
          THE_MISSION<span className="text-[#6366f1]">_</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          At TechTifyX, we bridge the gap between global hardware markets and the local consumer. 
          Our goal is simple: <span className="text-white font-bold">Premium gear at the lowest possible pricing</span>, 
          sourced with precision and delivered with care.
        </p>
      </section>

      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <ValueCard 
          icon={<Globe className="text-[#6366f1]" />}
          title="Global Sourcing"
          description="We hunt for quality products across international markets to find rates you won't see in local retail."
        />
        <ValueCard 
          icon={<Truck className="text-[#6366f1]" />}
          title="Lahore Hand-Delivery"
          description="Forget courier delays. Our dedicated team provides hand-to-hand delivery across Lahore for maximum safety."
        />
        <ValueCard 
          icon={<ShieldCheck className="text-[#6366f1]" />}
          title="Price Protection"
          description="We negotiate bulk rates and skip the middleman, passing every cent of those savings directly to you."
        />
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center italic uppercase tracking-tighter">
          Common_Queries<span className="text-[#6366f1]">.</span>
        </h2>
        <div className="space-y-4">
          <FAQItem 
            question="How do you keep prices lower than other retailers?"
            answer="We operate on a 'Source-on-Demand' model and direct global imports. By eliminating high-rent showrooms and traditional distributors, we cut costs by 20-30%."
          />
          <FAQItem 
            question="How does the Lahore hand-delivery work?"
            answer="Once your order is ready, a member of our TechTifyX logistics team will contact you to coordinate a time. We deliver directly to your doorstep in Johar Town, DHA, Gulberg, and more."
          />
          <FAQItem 
            question="Can I request a product not listed on the shop?"
            answer="Yes! Use our 'Request Item' form. Provide us with a name or image, and our sourcing team will find the best market rate for you within 48 hours."
          />
          <FAQItem 
            question="What is the average sourcing time?"
            answer="For items not in local stock, sourcing usually takes 7-14 business days depending on the complexity of the hardware."
          />
        </div>
      </section>
    </main>
  );
}

// Sub-components for cleaner code
const ValueCard = ({ icon, title, description }: any) => (
  <div className="bg-[#181818] p-8 rounded-3xl border border-white/5 hover:border-[#6366f1]/30 transition-all">
    <div className="w-12 h-12 bg-[#6366f1]/10 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-[#6366f1] transition-colors"
      >
        <span className="font-bold text-lg">{question}</span>
        <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <p className="pb-6 text-gray-400 leading-relaxed">{answer}</p>}
    </div>
  );
};