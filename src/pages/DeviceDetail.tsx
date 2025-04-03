
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Smartphone, Settings, Link2 } from 'lucide-react';

const DeviceDetail = () => {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Device: <span className="text-gray-500 text-base">eed31112-7dc9-4c06-857e-2289c442a0d3</span></h1>
          <Link to="/devices">
            <Button variant="outline">Back</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Scan the QR Code On Your Whatsapp Mobile App</h2>
          </div>
          <div className="p-10 flex justify-center">
            <div className="w-64 h-64">
              {/* Placeholder for QR Code */}
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=eed31112-7dc9-4c06-857e-2289c442a0d3" alt="QR Code" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">How to Connect?</h2>
          </div>
          <div className="p-6">
            <div className="flex">
              <div className="mr-6 relative">
                <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-custom-orderly-green text-white relative z-10">
                  <span className="text-xs">1</span>
                </div>
                <div className="mt-16 flex items-center justify-center w-5 h-5 rounded-full bg-custom-orderly-green text-white relative z-10">
                  <span className="text-xs">2</span>
                </div>
                <div className="mt-16 flex items-center justify-center w-5 h-5 rounded-full bg-custom-orderly-green text-white relative z-10">
                  <span className="text-xs">3</span>
                </div>
                <div className="mt-16 flex items-center justify-center w-5 h-5 rounded-full bg-custom-orderly-green text-white relative z-10">
                  <span className="text-xs">4</span>
                </div>
              </div>
              <div className="space-y-12">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone size={16} className="text-custom-orderly-green" />
                    <h3 className="font-medium">Step 1</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Open WhatsApp on your phone</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Settings size={16} className="text-custom-orderly-green" />
                    <h3 className="font-medium">Step 2</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Tap Menu or Settings and select Linked Devices</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Link2 size={16} className="text-custom-orderly-green" />
                    <h3 className="font-medium">Step 3</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Tap on Link a Device</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone size={16} className="text-custom-orderly-green" />
                    <h3 className="font-medium">Step 4</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Point your phone to this screen to scan the QR code</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeviceDetail;
