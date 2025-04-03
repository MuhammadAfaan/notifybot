
import React from 'react';
import OrderlySidebar from './OrderlySidebar';
import { Button } from './ui/button';
import { Settings, DollarSign, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-custom-orderly-bg">
      <OrderlySidebar />
      <div className="flex-1">
        <header className="bg-white py-2 px-6 flex justify-end items-center border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Link to="/purchase-credits">
              <Button className="bg-custom-orderly-green hover:bg-custom-orderly-green/90 text-white gap-2">
                <DollarSign size={16} />
                Purchase Credits
              </Button>
            </Link>
            <div className="relative group">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
            <Link to="/profile">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer">
                F
              </div>
            </Link>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
