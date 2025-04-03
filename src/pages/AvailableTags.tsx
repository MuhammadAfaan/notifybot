
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

// Define the tag types that would normally come from an API
type Tag = {
  name: string;
  value: string;
};

const AvailableTags = () => {
  // In a real app, these would be fetched from an API
  const tags: Tag[] = [
    { name: 'User Name', value: '[User Name]' },
    { name: 'Order Amount', value: '[Amount]' },
    { name: 'Order Number', value: '[Order No.]' },
    { name: 'Address', value: '[Address]' },
    { name: 'City', value: '[City]' },
    { name: 'Country', value: '[Country]' },
    { name: 'Phone Number', value: '[Phone]' },
    { name: 'Products', value: '[Products]' },
    { name: 'Tracking Number', value: '[Tracking Number]' },
    { name: 'Tracking Url', value: '[Tracking Url]' },
    { name: 'Shipping Company', value: '[Shipping Company]' },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Available Tags</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Use these tags in your message templates. They will be automatically replaced with actual data when messages are sent.
          </p>
          
          <div className="space-y-4">
            {tags.map((tag) => (
              <div key={tag.name} className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div className="font-medium text-gray-700">{tag.name}</div>
                <div className="text-gray-500">{tag.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AvailableTags;
