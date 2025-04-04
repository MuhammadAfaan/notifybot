
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotifyBotLogo from './NotifyBotLogo';
import { 
  LayoutDashboard, 
  Smartphone, 
  ShoppingBag, 
  Book, 
  MessageSquare,
  HelpCircle,
  Settings,
  DollarSign
} from 'lucide-react';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
};

const SidebarItem = ({ icon, label, to, active }: SidebarItemProps) => (
  <Link to={to} className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-notifybot-blue/10 hover:text-notifybot-blue transition-colors ${active ? 'bg-notifybot-blue/10 text-notifybot-blue font-medium' : ''}`}>
    <span className="text-current">{icon}</span>
    <span>{label}</span>
  </Link>
);

const NotifyBotSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  // This credits value would normally be loaded from an API
  const availableCredits = 500;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col">
      <div className="mb-6">
        <NotifyBotLogo />
      </div>

      <div className="mb-4">
        <SidebarItem 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard" 
          to="/dashboard" 
          active={path === '/dashboard'} 
        />
      </div>

      {/* Credits card - This would normally fetch data from the server */}
      <div className="bg-gradient-to-br from-notifybot-blue to-notifybot-blue/80 text-white rounded-lg p-4 mb-6">
        <div className="text-sm font-medium mb-2">Available Credits</div>
        <div className="text-2xl font-bold text-white mb-1">{availableCredits}</div>
      </div>

      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">App</div>
      <div className="space-y-1 mb-6">
        {/* These links would typically be configured based on user permissions */}
        <SidebarItem 
          icon={<Smartphone size={18} />} 
          label="My Devices" 
          to="/devices" 
          active={path.includes('devices')} 
        />
        <SidebarItem 
          icon={<ShoppingBag size={18} />} 
          label="Shopify Templates" 
          to="/shopify-templates" 
          active={path.includes('shopify')} 
        />
        <SidebarItem 
          icon={<Book size={18} />} 
          label="Contact Book" 
          to="/contact-book" 
          active={path.includes('contact-book')} 
        />
        <SidebarItem 
          icon={<MessageSquare size={18} />} 
          label="Message Log" 
          to="/message-log" 
          active={path.includes('message-log')} 
        />
      </div>

      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">Settings</div>
      <div className="space-y-1">
        <SidebarItem 
          icon={<HelpCircle size={18} />} 
          label="User Guide" 
          to="/guide" 
          active={path.includes('guide')} 
        />
        <SidebarItem 
          icon={<DollarSign size={18} />} 
          label="Order Credits" 
          to="/credits" 
          active={path.includes('credits')} 
        />
        <SidebarItem 
          icon={<Settings size={18} />} 
          label="Help & Support" 
          to="/support" 
          active={path.includes('support')} 
        />
      </div>
      
      {/* Spacer to push content to the top */}
      <div className="flex-1"></div>
      
      {/* Version info at bottom */}
      <div className="text-xs text-gray-400 mt-4 text-center">
        NotifyBot v1.0.0
      </div>
    </div>
  );
};

export default NotifyBotSidebar;
