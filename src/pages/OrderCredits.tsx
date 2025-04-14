
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const OrderCredits = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-semibold mb-4">Order Credits</h1>
          <p className="text-gray-600 mb-6">Purchase credits to send WhatsApp messages to your customers.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-notifybot-bg rounded-lg p-6 border border-notifybot-blue/20">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <p className="text-3xl font-bold text-notifybot-blue mb-4">$10</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  100 Credits
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  Valid for 30 days
                </li>
              </ul>
              <Link to="/purchase-credits">
                <Button className="w-full bg-notifybot-blue hover:bg-notifybot-dark-blue">
                  Purchase Now
                </Button>
              </Link>
            </div>

            <div className="bg-notifybot-bg rounded-lg p-6 border-2 border-notifybot-blue relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-notifybot-blue text-white text-xs px-3 py-1 rounded-full">
                  Popular
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional</h3>
              <p className="text-3xl font-bold text-notifybot-blue mb-4">$25</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  300 Credits
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  Valid for 60 days
                </li>
              </ul>
              <Link to="/purchase-credits">
                <Button className="w-full bg-notifybot-blue hover:bg-notifybot-dark-blue">
                  Purchase Now
                </Button>
              </Link>
            </div>

            <div className="bg-notifybot-bg rounded-lg p-6 border border-notifybot-blue/20">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold text-notifybot-blue mb-4">$50</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  700 Credits
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  Valid for 90 days
                </li>
              </ul>
              <Link to="/purchase-credits">
                <Button className="w-full bg-notifybot-blue hover:bg-notifybot-dark-blue">
                  Purchase Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderCredits;
