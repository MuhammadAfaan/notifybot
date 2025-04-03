
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Smartphone } from 'lucide-react';

// This would typically be defined in a types.ts file
type Device = {
  id: string;
  name: string;
  phone: string;
  totalMessages: number;
  status: 'ACTIVE' | 'INACTIVE';
};

const MyDevices = () => {
  // State to store devices data that would be fetched from an API
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  // Summary statistics that would be calculated from the devices data
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });

  // Mock API call to fetch devices - in a real application, this would be an API call
  useEffect(() => {
    // Simulating API fetch with setTimeout
    const fetchDevices = () => {
      setTimeout(() => {
        // This is mock data - would typically come from an API endpoint
        const mockDevices: Device[] = [
          {
            id: '1',
            name: 'Iphone',
            phone: '',
            totalMessages: 0,
            status: 'INACTIVE'
          }
        ];
        
        setDevices(mockDevices);
        
        // Calculate statistics
        setStats({
          total: mockDevices.length,
          active: mockDevices.filter(d => d.status === 'ACTIVE').length,
          inactive: mockDevices.filter(d => d.status === 'INACTIVE').length
        });
        
        setLoading(false);
      }, 500);
    };

    fetchDevices();
  }, []);

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

      {/* Stats cards - data loaded dynamically from the server */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-medium">Total Devices</h2>
          </div>
          <p className="text-4xl font-bold">{stats.total}</p>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tr from-transparent to-blue-100/50 rounded-b-lg"></div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-medium">Active Devices</h2>
          </div>
          <p className="text-4xl font-bold text-green-500">{stats.active}</p>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tr from-transparent to-green-100/50 rounded-b-lg"></div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-medium">Inactive Devices</h2>
          </div>
          <p className="text-4xl font-bold text-orange-500">{stats.inactive}</p>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tr from-transparent to-orange-100/50 rounded-b-lg"></div>
        </div>
      </div>

      {/* Devices list - dynamically loaded from API */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500">Loading devices...</p>
        </div>
      ) : devices.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500">No devices found. Create your first device!</p>
        </div>
      ) : (
        // Map through devices from the API response
        devices.map(device => (
          <div key={device.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-medium">{device.name}</h2>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Phone:</span>
                <span>{device.phone}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Total Messages:</span>
                <span>{device.totalMessages}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Status:</span>
                <span className={`px-2 py-0.5 rounded-md text-sm ${
                  device.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {device.status}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </DashboardLayout>
  );
};

export default MyDevices;
