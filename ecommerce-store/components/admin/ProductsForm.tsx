'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { uploadProduct } from '@/lib/actions/admin';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Upload, X } from 'lucide-react';
import { useFormStatus } from 'react-dom';

/* ---------------- Submit Button (Server Action aware) ---------------- */

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full py-4 text-lg">
      {pending ? 'Uploading Product...' : 'Publish Product'}
    </Button>
  );
}

/* ---------------- Main Form ---------------- */

export const ProductForm = () => {
  const [isOnSale, setIsOnSale] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---------- Preview Images ---------- */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));

    setPreviews(prev => [...prev, ...urls]);
  };

  const removeImage = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form
    action={async (formData: FormData) => {
      await uploadProduct(formData);
    }}
      className="bg-[#181818] p-8 rounded-3xl border border-white/5 space-y-6 max-w-3xl"
    >
      {/* Hidden field for toggle state */}
      <input type="hidden" name="is_on_sale" value={String(isOnSale)} />

      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Product Name"
          name="name"
          placeholder="Cyberpunk Desk Mat"
          required
        />
        <Input
          label="Price ($)"
          name="price"
          type="number"
          step="0.01"
          placeholder="49.99"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          Description
        </label>
        <textarea
          name="description"
          className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl p-3.5 focus:ring-2 focus:ring-[#6366f1] outline-none h-32 text-gray-200"
          placeholder="Detailed product specs..."
        />
      </div>

      {/* Sale Toggle */}
      <div className="flex items-center gap-4 p-4 bg-[#0f0f0f] rounded-xl border border-white/10">
        <div
          onClick={() => setIsOnSale(prev => !prev)}
          className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
            isOnSale ? 'bg-[#22c55e]' : 'bg-gray-700'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full transition-transform ${
              isOnSale ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </div>
        <span className="text-sm font-medium text-gray-300">
          Mark as "On Sale"
        </span>
      </div>

      {/* Image Upload */}
      <div className="space-y-4">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          Product Images
        </label>

        {/* Preview Grid */}
        {previews.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {previews.map((src, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-xl overflow-hidden border border-white/10 bg-[#0f0f0f]"
              >
                <img
                  src={src}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Box */}
        <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center hover:bg-white/5 transition-colors group">
          <Upload className="mb-2 text-gray-500 group-hover:text-gray-300" />
          <p className="text-sm text-gray-500">
            {previews.length > 0
              ? `${previews.length} images selected`
              : 'Click to select multiple images'}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            name="images[]"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Submit */}
      <SubmitButton />
    </form>
  );
};
