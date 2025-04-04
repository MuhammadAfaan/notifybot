
import React, { useState, useEffect } from 'react';
import NotifyBotSidebar from './NotifyBotSidebar';
import { Button } from './ui/button';
import { DollarSign, UserCircle, Menu, Settings, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

// Theme options
type Theme = 'light' | 'dark' | 'system';

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Apply theme
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme, isMounted]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar - toggled for mobile */}
      <div 
        className={`${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full'
        } fixed md:static md:translate-x-0 z-20 h-full transition-transform duration-200 ease-in-out`}
      >
        <NotifyBotSidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white py-2 px-6 flex justify-between items-center border-b border-gray-200 sticky top-0 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* On mobile, only show company logo when sidebar is hidden */}
          <div className="md:hidden flex-1 flex justify-center">
            {!sidebarVisible && (
              <span className="font-bold text-notifybot-blue">NotifyBot</span>
            )}
          </div>
          
          {/* Right-side action buttons */}
          <div className="flex items-center gap-3">
            <Link to="/purchase-credits">
              <Button className="bg-notifybot-blue hover:bg-notifybot-blue/90 text-white gap-2">
                <DollarSign size={16} />
                <span className="hidden sm:inline">Purchase Credits</span>
              </Button>
            </Link>
            
            {/* Theme toggle dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {theme === 'dark' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Profile button */}
            <Link to="/profile">
              <div className="h-8 w-8 rounded-full bg-notifybot-blue flex items-center justify-center text-white font-bold cursor-pointer">
                N
              </div>
            </Link>
          </div>
        </header>
        
        {/* Overlay to close sidebar on mobile when clicked outside */}
        {sidebarVisible && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={toggleSidebar}
          />
        )}
        
        <main className="p-4 md:p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
