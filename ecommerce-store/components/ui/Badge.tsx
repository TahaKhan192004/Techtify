export const Badge = ({ children, color = 'indigo' }: any) => (
  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${color}-500/20 text-${color}-400 border border-${color}-500/20`}>
    {children}
  </span>
);