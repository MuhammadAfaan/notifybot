
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { ChevronRight } from 'lucide-react';

const UserGuide = () => {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-semibold mb-4">How to use NotifyBot?</h1>
        <p className="text-gray-600">Below you'll find video tutorials to use features of NotifyBot</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          <div className="p-6 hover:bg-gray-50 cursor-pointer group">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium group-hover:text-notifybot-blue transition-colors">
                How to connect Device (WhatsApp)?
              </h2>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-notifybot-blue transition-colors" />
            </div>
          </div>

          <div className="p-6 hover:bg-gray-50 cursor-pointer group">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium group-hover:text-notifybot-blue transition-colors">
                How to connect Shopify/WordPress Store?
              </h2>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-notifybot-blue transition-colors" />
            </div>
          </div>

          <div className="p-6 hover:bg-gray-50 cursor-pointer group">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium group-hover:text-notifybot-blue transition-colors">
                How to connect Courier Companies with Store?
              </h2>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-notifybot-blue transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserGuide;
