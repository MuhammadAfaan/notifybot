
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const NewDevice = () => {
  const [deviceName, setDeviceName] = useState('');
  const { toast } = useToast();

  const handleCreateDevice = () => {
    if (!deviceName) {
      toast({
        title: "Device name required",
        description: "Please enter a device name",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Device created",
      description: "You'll now need to connect your device",
    });
    // Redirect would happen here
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create new device</h1>
          <Link to="/devices">
            <Button variant="outline">Discard</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium mb-6">Device Information</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700 mb-1">
              Device Name: <span className="text-red-500">*</span>
            </label>
            <Input 
              id="deviceName"
              placeholder="My iPhone 16 Pro" 
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">You're almost done!</h2>
          <div className="space-x-4">
            <Link to="/devices">
              <Button variant="outline">Discard</Button>
            </Link>
            <Button 
              className="bg-custom-orderly-green hover:bg-custom-orderly-green/90"
              onClick={handleCreateDevice}
            >
              Create Device
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewDevice;
