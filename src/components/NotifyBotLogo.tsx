
import React from 'react';

const NotifyBotLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative mr-2">
        {/* SVG Robot Logo */}
        <svg width="40" height="40" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M192 112V64a16 16 0 0 0-16-16h-16M96 48H80a16 16 0 0 0-16 16v48M64 112v80a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-80M144 176h16M96 176h16M96 80v48M160 80v48" 
            stroke="#00B5E2" 
            strokeWidth="16" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path d="M232 128a8 8 0 0 1-8 8h-16v16a16 16 0 0 1-16 16h-16M48 168H32a16 16 0 0 1-16-16v-16H0a8 8 0 0 1-8-8 8 8 0 0 1 8-8h16v-16a16 16 0 0 1 16-16h16M128 48V16" 
            stroke="#00B5E2" 
            strokeWidth="16" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <circle cx="104" cy="144" r="8" fill="#00B5E2" />
          <circle cx="152" cy="144" r="8" fill="#00B5E2" />
          <path d="M155.4 210.1c-8.3 9.2-21.5 12.9-30.9 12.9s-21.3-3.4-29.5-12.2" 
            stroke="#00B5E2" 
            strokeWidth="16" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="text-xl font-bold text-notifybot-blue">
        NotifyBot
        <div className="text-xs font-normal text-gray-500 -mt-1">WHATSAPP ORDER ALERTS</div>
      </div>
    </div>
  );
};

export default NotifyBotLogo;
