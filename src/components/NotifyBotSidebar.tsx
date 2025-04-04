
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
  DollarSign,
  Tag
} from 'lucide-react';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
};

const SidebarItem = ({ icon, label, to, active }: SidebarItemProps) => (
  <Link to={to} className={`notifybot-sidebar-item ${active ? 'active' : ''}`}>
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </Link>
);

const NotifyBotSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  // This credits value would normally be loaded from an API
  const availableCredits = 500;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
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
      <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
        <div className="text-sm font-medium mb-2">Available Credits</div>
        <div className="text-2xl font-bold text-gray-800 mb-1">{availableCredits}</div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tr from-transparent to-blue-100/50 rounded-b-lg -z-10"></div>
      </div>

      <div className="notifybot-sidebar-section">App</div>
      <div className="space-y-1">
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
          icon={<Tag size={18} />} 
          label="Available Tags" 
          to="/available-tags" 
          active={path.includes('available-tags')} 
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

      <div className="notifybot-sidebar-section">Settings</div>
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
    </div>
  );
};

export default NotifyBotSidebar;
