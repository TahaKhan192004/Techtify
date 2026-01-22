'use client';

import Link from 'next/link';
import { Zap, Instagram, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter">
              <Zap className="text-[#6366f1] fill-[#6366f1]" size={28} />
              <span>CORE<span className="text-[#6366f1]">_</span></span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Premium hardware and tech accessories sourced globally. Elevating your setup with precision-engineered gear.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" className="p-2 bg-[#181818] rounded-lg text-gray-400 hover:text-white hover:bg-[#6366f1] transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://tiktok.com" target="_blank" className="p-2 bg-[#181818] rounded-lg text-gray-400 hover:text-white hover:bg-[#6366f1] transition-all">
                {/* Custom TikTok Icon Placeholder */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link href="/" className="hover:text-[#6366f1] transition-colors">Home</Link></li>
              <li><Link href="/allproducts" className="hover:text-[#6366f1] transition-colors">Shop All</Link></li>
              <li><Link href="/request-product" className="hover:text-[#6366f1] transition-colors">Request Form</Link></li>
              <li><Link href="/about" className="hover:text-[#6366f1] transition-colors">About Us</Link></li>
              <li><Link href="/support" className="hover:text-[#6366f1] transition-colors">Support Center</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Direct_Contact</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#6366f1] shrink-0" />
                <a href="mailto:tahakhan182004@gmail.com" className="hover:text-white transition-colors break-all">
                  tahakhan182004@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#6366f1] shrink-0" />
                <a href="tel:+923278033118" className="hover:text-white transition-colors">
                  0327-8033118
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#6366f1] shrink-0" />
                <span>Johar Town, Lahore, Pakistan</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="bg-[#181818] p-6 rounded-3xl border border-white/5">
            <h4 className="text-white font-bold mb-2">Join the Core</h4>
            <p className="text-xs text-gray-500 mb-4">Get notified about new drops and custom sourcing slots.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2 text-xs w-full focus:outline-none focus:ring-1 focus:ring-[#6366f1]"
              />
              <button className="bg-[#6366f1] p-2 rounded-xl hover:bg-[#4f46e5] transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
            © {currentYear} TechTifyX. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-gray-600">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};