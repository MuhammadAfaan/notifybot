
import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse-subtle"
      >
        <rect width="40" height="40" rx="8" fill="#4A4A25" fillOpacity="0.9" />
        <path 
          d="M13 20C13 16.134 16.134 13 20 13C23.866 13 27 16.134 27 20C27 23.866 23.866 27 20 27C16.134 27 13 23.866 13 20Z" 
          stroke="white" 
          strokeWidth="2" 
          fill="transparent"
        />
        <path 
          d="M20 13V27" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        <path 
          d="M27 20H13" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
      <span className="ml-2 text-xl font-semibold text-custom-olive-green">Mitra</span>
    </div>
  );
};

export default Logo;
