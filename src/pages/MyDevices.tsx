
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, Smartphone, QrCode, Edit, Trash, Plus } from 'lucide-react';
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

  // Mock API call to fetch devices - in a real application, this would be an API call
  useEffect(() => {
    // Simulate API fetch with setTimeout
    // In a real application, this would be replaced with an actual API call
    const fetchDevices = () => {
      setTimeout(() => {
        // Mock data - would come from an API in a real application
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
        setStats({
          total: mockDevices.length,
          active: mockDevices.filter(d => d.status === 'ACTIVE').length,
          inactive: mockDevices.filter(d => d.status === 'INACTIVE').length
        });
        
        setLoading(false);
      }, 500);
    };

    fetchDevices();

    // Listen for device creation events
    const handleDeviceCreated = (event: CustomEvent) => {
      if (event.detail && event.detail.device) {
        const newDevice = event.detail.device;
        setDevices(prev => [...prev, newDevice]);
        setStats(prev => ({
          total: prev.total + 1,
          active: newDevice.status === 'ACTIVE' ? prev.active + 1 : prev.active,
          inactive: newDevice.status === 'INACTIVE' ? prev.inactive + 1 : prev.inactive
        }));
      }
    };

    // Add event listener
    window.addEventListener('deviceCreated', handleDeviceCreated as EventListener);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('deviceCreated', handleDeviceCreated as EventListener);
    };
  }, []);

  // Summary statistics calculated from the devices data
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });

  const handleRemoveDevice = (deviceId: string, deviceName: string) => {
    // In a real application, this would be an API call to delete the device
    // API call would be like: await api.delete(`/devices/${deviceId}`);
    
    setDevices(prevDevices => prevDevices.filter(device => device.id !== deviceId));
    
    // Updating stats after removal
    setStats(prevStats => ({
      total: prevStats.total - 1,
      active: devices.filter(d => d.status === 'ACTIVE' && d.id !== deviceId).length,
      inactive: devices.filter(d => d.status === 'INACTIVE' && d.id !== deviceId).length
    }));

    toast({
      title: "Device Deleted",
      description: `Device "${deviceName}" has been removed.`,
    });
  };

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

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Devices</h1>
        <Link to="/devices/new">
          <Button className="bg-notifybot-blue hover:bg-notifybot-dark-blue">
            <Plus className="mr-2 h-4 w-4" />
            Create Device
          </Button>
        </Link>
      </div>

      {/* Stats cards with NotifyBot theme */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-medium">Total Devices</h2>
          </div>
          <p className="text-4xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-green-50 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-medium">Active Devices</h2>
          </div>
          <p className="text-4xl font-bold text-green-500">{stats.active}</p>
        </div>

        <div className="bg-red-50 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-medium">Inactive Devices</h2>
          </div>
          <p className="text-4xl font-bold text-orange-500">{stats.inactive}</p>
        </div>
      </div>

      {/* Devices grid with NotifyBot theme */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500">Loading devices...</p>
        </div>
      ) : devices.length === 0 ? (
        <div className="text-center py-12">
          <Smartphone className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No devices found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first device.</p>
          <Link to="/devices/new">
            <Button className="bg-notifybot-blue hover:bg-notifybot-dark-blue">
              <Plus className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <DropdownMenuItem 
                      onClick={() => handleRemoveDevice(device.id, device.name)} 
                      className="text-red-500 cursor-pointer hover:text-red-600 hover:bg-red-50"
                    >
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
