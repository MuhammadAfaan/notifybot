
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const PricingPage = () => {
  const { toast } = useToast();
  
  const handleSubscribe = (plan: string) => {
    toast({
      title: "Subscription initiated",
      description: `You selected the ${plan} plan. Redirecting to payment...`,
    });
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Flexible Pricing Plans</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Small Business Plan */}
          <div className="bg-white p-8 border-t border-b border-l border-gray-200 rounded-l-lg md:rounded-l-lg md:rounded-tr-none">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Small Business</h2>
            <div className="mb-6">
              <span className="text-gray-500 text-lg">Rs</span>
              <span className="text-4xl font-bold ml-1">3,000</span>
            </div>
            <Button 
              className="mb-8 w-full bg-white text-notifybot-blue border border-notifybot-blue hover:bg-notifybot-blue/10"
              onClick={() => handleSubscribe('Small Business')}
            >
              Subscribe
            </Button>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-4">What's included:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-700 font-medium">500 Order Credits</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Real Time Dashboard Access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Order Update Alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Real Time Courier Update Alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Setup Charges</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Exclusive Support</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Growing Business Plan - Highlighted */}
          <div className="bg-[#BBFFF6] p-8 border border-gray-200 -mt-4 relative shadow-lg rounded-t-lg md:rounded-none md:-mt-0">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Growing Business</h2>
            <div className="mb-6">
              <span className="text-gray-500 text-lg">Rs</span>
              <span className="text-4xl font-bold ml-1">5,500</span>
            </div>
            <Button 
              className="mb-8 w-full bg-notifybot-blue hover:bg-notifybot-blue/90 text-white"
              onClick={() => handleSubscribe('Growing Business')}
            >
              Subscribe
            </Button>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-4">What's included:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-700 font-medium">1000 Order Credits</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Real Time Dashboard Access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Order Update Alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Real Time Courier Update Alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Setup Charges</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Exclusive Support</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Established Business Plan */}
          <div className="bg-white p-8 border-t border-b border-r border-gray-200 rounded-r-lg md:rounded-r-lg md:rounded-tl-none">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Established Business</h2>
            <div className="mb-6">
              <span className="text-gray-500 text-lg">Rs</span>
              <span className="text-4xl font-bold ml-1">20,000</span>
            </div>
            <Button 
              className="mb-8 w-full bg-white text-notifybot-blue border border-notifybot-blue hover:bg-notifybot-blue/10"
              onClick={() => handleSubscribe('Established Business')}
            >
              Subscribe
            </Button>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-4">What's included:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-700 font-medium">5000 Order Credits</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Real Time Dashboard Access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Order Update Alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Real Time Courier Update Alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Setup Charges</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600">Exclusive Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Enterprise Section */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-medium text-gray-800 mb-2">Looking for Unlimited Plan (Enterprise Level)?</h2>
          <p className="text-gray-600">
            Contact us on <a href="#" className="text-notifybot-blue underline font-medium">WhatsApp</a>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PricingPage;
