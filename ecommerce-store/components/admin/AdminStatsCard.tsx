// src/components/admin/AdminStatsCard.tsx
export const AdminStatsCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-[#181818] p-6 rounded-2xl border border-white/5">
    <div className="flex justify-between items-start">
      <div className="p-2 bg-[#6366f1]/10 rounded-lg text-[#6366f1]">
        <Icon size={20} />
      </div>
      <span className={`text-xs font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <div className="mt-4">
      <p className="text-gray-400 text-sm font-medium">{title}</p>
      <h4 className="text-2xl font-bold mt-1">{value}</h4>
    </div>
  </div>
);

