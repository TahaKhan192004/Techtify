import { Badge } from '../ui/Badge';

interface Order {
  id: string;
  username: string;
  email: string;
  total_price: number;
  status?: string; // Optional if you haven't added a status column yet
  created_at: string;
}

interface OrdersTableProps {
  orders: Order[];
}

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-dashed border-white/10 bg-[#121212]">
        <p className="text-gray-500">No orders found yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/5 shadow-2xl">
      <table className="w-full text-left text-sm border-collapse">
        <thead className="bg-[#181818] text-gray-400 uppercase text-[10px] tracking-widest font-bold">
          <tr>
            <th className="px-6 py-5">Order ID</th>
            <th className="px-6 py-5">Customer</th>
            <th className="px-6 py-5">Date</th>
            <th className="px-6 py-5">Total</th>
            <th className="px-6 py-5">Status</th>
            <th className="px-6 py-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-[#0f0f0f]">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
              <td className="px-6 py-4 font-mono text-[11px] text-gray-500">
                #{order.id.slice(0, 8).toUpperCase()}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-200">{order.username}</span>
                  <span className="text-[10px] text-gray-500">{order.email}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-400">
                {new Date(order.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 font-bold text-[#6366f1]">
                ${order.total_price.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <Badge color={order.status === 'Completed' ? 'green' : 'indigo'}>
                  {order.status || 'New Order'}
                </Badge>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-xs font-bold text-gray-400 hover:text-white transition-colors py-1 px-3 rounded-lg bg-white/5 hover:bg-[#6366f1] group-hover:border-transparent">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};