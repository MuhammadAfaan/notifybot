
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const MessageLog = () => {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-semibold mb-4">Message Log</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input className="pl-10" placeholder="Search..." />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="p-4 font-medium">Created</th>
                <th className="p-4 font-medium">Device</th>
                <th className="p-4 font-medium">Recipient</th>
                <th className="p-4 font-medium">Message</th>
                <th className="p-4 font-medium">Source</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
          <div>Showing 0 to 0 of 0 entries</div>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">«</Button>
            <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">‹</Button>
            <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">›</Button>
            <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">»</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessageLog;
