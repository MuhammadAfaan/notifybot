
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { ChevronRight } from 'lucide-react';

const UserGuide = () => {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-semibold mb-4">How to use Orderly.pk?</h1>
        <p className="text-gray-600">Below you'll find video tutorials to the use features of Orderly.pk</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          <div className="p-6 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">How to connect Device (WhatsApp)?</h2>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>

          <div className="p-6 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">How to connect Shopify/WordPress Store?</h2>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>

          <div className="p-6 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">How to connect Courier Companies with Store?</h2>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserGuide;
