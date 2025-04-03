
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Smartphone } from 'lucide-react';

const MyDevices = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Devices</h1>
        <Link to="/devices/new">
          <Button className="bg-custom-orderly-green hover:bg-custom-orderly-green/90">
            Create Device
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-medium">Total Devices</h2>
          </div>
          <p className="text-4xl font-bold">1</p>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tr from-transparent to-blue-100/50 rounded-b-lg"></div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-medium">Active Devices</h2>
          </div>
          <p className="text-4xl font-bold text-green-500">0</p>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tr from-transparent to-green-100/50 rounded-b-lg"></div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-medium">Inactive Devices</h2>
          </div>
          <p className="text-4xl font-bold text-orange-500">1</p>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tr from-transparent to-orange-100/50 rounded-b-lg"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-medium">Iphone</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Phone:</span>
            <span></span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Total Messages:</span>
            <span>0</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Status:</span>
            <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-sm">INACTIVE</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyDevices;
