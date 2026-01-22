'use client';

import { Input } from '../ui/Input';

interface ShippingData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const ShippingForm = ({ 
  data, 
  onChange 
}: { 
  data: ShippingData; 
  onChange: (field: keyof ShippingData, value: string) => void 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Shipping Details</h3>
      <Input 
        label="Full Name" 
        placeholder="John Doe" 
        value={data.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('name', e.target.value)}
      />
      <Input 
        label="Email Address" 
        type="email" 
        placeholder="john@example.com" 
        value={data.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('email', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="Phone Number" 
          placeholder="123-456-7890" 
          value={data.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('phone', e.target.value)}
        />
        <Input 
          label="Shipping Address" 
          placeholder="123 Cyber St." 
          value={data.address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('address', e.target.value)}
        />
      </div>
    </div>
  );
};