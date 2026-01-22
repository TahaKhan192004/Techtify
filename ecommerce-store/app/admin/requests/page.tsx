import { getSourcingRequests } from '@/lib/actions/request';
import { Mail, Phone, Tag, Calendar, User } from 'lucide-react';

export default async function AdminRequestsPage() {
  const { data: requests, error } = await getSourcingRequests();

  if (error) return <div className="p-10 text-red-500">Error loading requests: {error}</div>;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black tracking-tighter italic uppercase">
            SOURCING_LOG<span className="text-[#6366f1]">_</span>
          </h1>
          <p className="text-gray-500 mt-2">Manage and review custom item requests from users.</p>
        </header>

        <div className="grid gap-6">
          {requests?.map((req) => (
            <div 
              key={req.id} 
              className="bg-[#181818] border border-white/5 rounded-3xl p-6 flex flex-col lg:flex-row gap-8 items-start hover:border-[#6366f1]/40 transition-all duration-300"
            >
              {/* Image Preview Area */}
              <div className="w-full lg:w-48 h-48 bg-[#0a0a0a] rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                {req.images && req.images.length > 0 ? (
                  <img 
                    src={req.images[0]} 
                    alt={req.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-700">
                    <Tag size={32} />
                    <span className="text-[10px] uppercase font-bold mt-2">No Image</span>
                  </div>
                )}
              </div>

              {/* Data Area */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-100">{req.name}</h2>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><User size={14} /> {req.email}</span>
                      {req.contact_number && (
                        <span className="flex items-center gap-1"><Phone size={14} /> {req.contact_number}</span>
                      )}
                    </div>
                  </div>
                  <div className="bg-[#6366f1]/10 border border-[#6366f1]/20 px-4 py-2 rounded-xl">
                    <p className="text-[10px] uppercase text-[#6366f1] font-black">Ref Price</p>
                    <p className="text-lg font-mono font-bold text-white">${req.reference_price || '0.00'}</p>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] p-4 rounded-2xl border border-white/5">
                  <p className="text-sm text-gray-400 leading-relaxed italic">
                    "{req.description || 'No description provided.'}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <a 
                    href={`mailto:${req.email}?subject=Regarding your request: ${req.name}`}
                    className="bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all flex items-center gap-2"
                  >
                    <Mail size={14} />
                    Contact User
                  </a>
                </div>
              </div>
            </div>
          ))}

          {requests?.length === 0 && (
            <div className="py-20 text-center bg-[#181818] rounded-3xl border border-dashed border-white/10">
              <p className="text-gray-500">No sourcing requests found in database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}