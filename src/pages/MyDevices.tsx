
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Smartphone, QrCode, Edit, Trash } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { toast } = useToast();

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
            name: 'nbdfsn',
            phone: '',
            totalMessages: 0,
            status: 'INACTIVE'
          },
          {
            id: '2',
            name: 'hjjd',
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

  const handleScanQR = (deviceName: string) => {
    toast({
      title: "QR Code Scanner",
      description: `Opening QR scanner for device: ${deviceName}`,
    });
  };

  const handleEditDevice = (deviceName: string) => {
    toast({
      title: "Edit Device",
      description: `Editing device: ${deviceName}`,
    });
  };

  const handleRemoveDevice = (deviceName: string) => {
    toast({
      title: "Remove Device",
      description: `Removing device: ${deviceName}. Please confirm this action.`,
      variant: "destructive",
    });
  };

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

      {/* Devices grid - dynamically loaded from API */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500">Loading devices...</p>
        </div>
      ) : devices.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500">No devices found. Create your first device!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map through devices from the API response */}
          {devices.map(device => (
            <div key={device.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-medium">{device.name}</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1">
                      <MoreHorizontal size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleScanQR(device.name)} className="cursor-pointer">
                      <QrCode className="mr-2 h-4 w-4" /> Scan QR
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditDevice(device.name)} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" /> Edit Device Name
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRemoveDevice(device.name)} className="text-red-500 cursor-pointer hover:text-red-600 hover:bg-red-50">
                      <Trash className="mr-2 h-4 w-4" /> Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Phone:</span>
                  <span>{device.phone || 'Not set'}</span>
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
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyDevices;
