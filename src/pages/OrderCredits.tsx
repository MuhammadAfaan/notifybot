
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const OrderCredits = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Credits</h1>
        <Button className="bg-custom-orderly-green hover:bg-custom-orderly-green/90">
          Purchase
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 relative overflow-hidden">
        <h2 className="text-lg font-medium mb-2">Available Credits</h2>
        <p className="text-5xl font-bold">500</p>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tr from-transparent to-blue-100/50 rounded-b-lg"></div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Credit Histories</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="p-4 font-medium">Invoice No</th>
                <th className="p-4 font-medium">Credits</th>
                <th className="p-4 font-medium">Total Paid</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="p-4">gDelTi</td>
                <td className="p-4">1000</td>
                <td className="p-4">PKR 5,500</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Pending</span>
                </td>
                <td className="p-4">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <Eye size={16} />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
          <div>Showing 1 to 1 of 1 entry</div>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">«</Button>
            <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">‹</Button>
            <Button size="sm" className="h-8 w-8 p-0 bg-custom-orderly-green text-white">1</Button>
            <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">›</Button>
            <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">»</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderCredits;
