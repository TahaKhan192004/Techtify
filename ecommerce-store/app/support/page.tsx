'use client';

import { Navbar } from '@/components/layout/navabar';
import { Mail, MessageCircle, ArrowUpRight, LifeBuoy, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function SupportPage() {
  const GMAIL = "tahakhan182004@gmail.com";
  const WHATSAPP = "923278033118"; // Added country code for international compatibility

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#6366f1] text-xs font-bold tracking-widest uppercase mb-4">
            <LifeBuoy size={14} />
            Support Center
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-4">
            HELP_DESK<span className="text-[#6366f1]">_</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Need assistance with an order or have a technical question? Our team is available 24/7 via the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WhatsApp Card */}
          <a 
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#181818] p-8 rounded-3xl border border-white/5 hover:border-[#22c55e]/30 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 group-hover:text-[#22c55e] transition-opacity">
              <ArrowUpRight size={32} />
            </div>
            
            <div className="w-14 h-14 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center text-[#22c55e] mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle size={30} fill="currentColor" fillOpacity={0.1} />
            </div>
            
            <h3 className="text-2xl font-bold mb-2">WhatsApp Support</h3>
            <p className="text-gray-400 mb-6">Immediate response for order tracking and quick queries.</p>
            <div className="text-sm font-mono text-[#22c55e]">LAUNCH_WHATSAPP →</div>
          </a>

          {/* Gmail Card */}
          <a 
            href={`mailto:${GMAIL}`}
            className="group bg-[#181818] p-8 rounded-3xl border border-white/5 hover:border-[#6366f1]/30 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 group-hover:text-[#6366f1] transition-opacity">
              <ArrowUpRight size={32} />
            </div>

            <div className="w-14 h-14 bg-[#6366f1]/10 rounded-2xl flex items-center justify-center text-[#6366f1] mb-6 group-hover:scale-110 transition-transform">
              <Mail size={30} fill="currentColor" fillOpacity={0.1} />
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Email Inquiry</h3>
            <p className="text-gray-400 mb-6">For business inquiries, bulk orders, or detailed support cases.</p>
            <div className="text-sm font-mono text-[#6366f1]">SEND_EMAIL →</div>
          </a>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-16 flex flex-col items-center justify-center py-8 border-t border-white/5">
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#6366f1]" />
              Secure Communication
            </div>
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Active Now
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}