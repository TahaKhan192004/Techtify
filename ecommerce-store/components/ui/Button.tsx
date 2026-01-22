// src/components/ui/Button.tsx
export const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const variants = {
    primary: 'bg-[#6366f1] hover:bg-[#4f46e5] text-white',
    outline: 'border border-white/10 hover:bg-white/5 text-white',
    danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
  };
  return (
    <button className={`px-6 py-3 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 ${variants[variant as keyof typeof variants]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// src/components/ui/Input.tsx


// src/components/ui/Badge.tsx
