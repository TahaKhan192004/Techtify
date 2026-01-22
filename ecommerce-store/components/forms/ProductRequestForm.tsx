'use client'; // Required for client-side interactions and state

import { useState, useRef } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Upload, CheckCircle2 } from 'lucide-react';
import { submitProductRequest } from '@/lib/actions/requests';

export const ProductRequestForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  async function handleAction(formData: FormData) {
    setLoading(true);
    try {
      const result = await submitProductRequest(formData);
      if (result.success) {
        setSuccess(true);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-[#181818] p-12 rounded-3xl border border-white/5 text-center space-y-4">
        <div className="flex justify-center text-[#22c55e]">
          <CheckCircle2 size={64} />
        </div>
        <h2 className="text-2xl font-bold">Request Sent!</h2>
        <p className="text-gray-400">We'll find your product and contact you via email shortly.</p>
        <Button variant="outline" onClick={() => setSuccess(false)}>Send Another Request</Button>
      </div>
    );
  }

  return (
    <form action={handleAction} className="bg-[#181818] p-8 rounded-3xl border border-white/5 space-y-6">
      <div className="space-y-4">
        {/* Name attribute added to all inputs for FormData collection */}
        <Input 
          label="Product Name" 
          name="name" 
          placeholder="e.g. Mechanical Keyboard GMMK Pro" 
          required 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Target Price ($)" 
            name="price" 
            type="number" 
            placeholder="200" 
            required 
          />
          <Input 
            label="Phone Number" 
            name="contact" 
            type="tel" 
            placeholder="123-456-7890" 
          />
        </div>

        <Input 
          label="Email Address" 
          name="email" 
          type="email" 
          placeholder="you@example.com" 
          required 
        />

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Description</label>
          <textarea 
            name="description"
            className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl p-3.5 focus:ring-2 focus:ring-[#6366f1] outline-none h-32 text-gray-200" 
            placeholder="Tell us about the specific model, color, or variant..." 
            required
          />
        </div>

        {/* Hidden Real File Input */}
        <input 
          type="file" 
          name="image" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />

        {/* Visual File Input UI */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 transition-colors cursor-pointer ${
            fileName ? 'border-[#6366f1] bg-[#6366f1]/5' : 'border-white/10 hover:bg-white/5'
          }`}
        >
          <Upload className={fileName ? 'text-[#6366f1]' : 'text-gray-500'} />
          <p className="text-sm text-gray-500 text-center">
            {fileName ? `Selected: ${fileName}` : 'Upload reference images'}
          </p>
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full py-4 text-lg"
      >
        {loading ? 'Processing...' : 'Send Request'}
      </Button>
    </form>
  );
};