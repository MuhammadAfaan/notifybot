
import React, { useState } from 'react';
import NotifyBotSidebar from './NotifyBotSidebar';
import { Button } from './ui/button';
import { Settings, DollarSign, UserCircle, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex min-h-screen bg-notifybot-bg">
      <div className={`md:block ${sidebarVisible ? 'block' : 'hidden'} fixed md:static z-20 h-full`}>
        <NotifyBotSidebar />
      </div>
      <div className="flex-1">
        <header className="bg-white py-2 px-6 flex justify-between items-center border-b border-gray-200">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Link to="/purchase-credits">
              <Button className="bg-notifybot-blue hover:bg-notifybot-dark-blue text-white gap-2">
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
              <div className="h-8 w-8 rounded-full bg-notifybot-blue flex items-center justify-center text-white font-bold cursor-pointer">
                N
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
