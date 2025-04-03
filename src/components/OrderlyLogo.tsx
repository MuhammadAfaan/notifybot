
import React from 'react';

const OrderlyLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <div className="bg-custom-orderly-green w-12 h-12 rounded-md flex items-center justify-center relative z-10">
          <div className="w-6 h-6 border-2 border-white rounded-sm"></div>
        </div>
        <div className="bg-custom-orderly-light-green w-8 h-8 rounded-md absolute -top-2 -right-2 z-0"></div>
      </div>
      <div className="ml-2 text-xl font-bold text-custom-orderly-green">
        ORDERLY
        <div className="text-xs font-normal text-gray-500 -mt-1">WHATSAPP ORDER ALERTS</div>
      </div>
    </div>
  );
};

export default OrderlyLogo;
