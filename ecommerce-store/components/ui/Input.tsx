export const Input = ({ label, ...props }: any) => (
  <div className="space-y-1.5 w-full">
    {label && <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>}
    <input {...props} className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl p-3.5 focus:ring-2 focus:ring-[#6366f1] outline-none transition-all placeholder:text-gray-600" />
  </div>
);