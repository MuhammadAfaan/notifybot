
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Copy, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Define the tag types that would normally come from an API
type TagData = {
  name: string;
  value: string;
  description: string;
  category: 'order' | 'customer' | 'product' | 'shipping';
};

const AvailableTags = () => {
  const { toast } = useToast();
  
  // In a real app, these would be fetched from an API
  const tags: TagData[] = [
    { name: 'User Name', value: '[User Name]', description: 'Customer\'s full name', category: 'customer' },
    { name: 'Order Amount', value: '[Amount]', description: 'Total order amount with currency', category: 'order' },
    { name: 'Order Number', value: '[Order No.]', description: 'Unique order identifier', category: 'order' },
    { name: 'Address', value: '[Address]', description: 'Customer\'s shipping address', category: 'customer' },
    { name: 'City', value: '[City]', description: 'Customer\'s city', category: 'customer' },
    { name: 'Country', value: '[Country]', description: 'Customer\'s country', category: 'customer' },
    { name: 'Phone Number', value: '[Phone]', description: 'Customer\'s phone number', category: 'customer' },
    { name: 'Products', value: '[Products]', description: 'List of ordered products', category: 'product' },
    { name: 'Tracking Number', value: '[Tracking Number]', description: 'Shipment tracking number', category: 'shipping' },
    { name: 'Tracking Url', value: '[Tracking Url]', description: 'Link to track the shipment', category: 'shipping' },
    { name: 'Shipping Company', value: '[Shipping Company]', description: 'Name of the shipping carrier', category: 'shipping' },
  ];

  // Function to copy tag to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied!",
          description: `${text} has been copied to clipboard`,
        });
      },
      (err) => {
        toast({
          title: "Failed to copy",
          description: "Please try again",
          variant: "destructive"
        });
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link to="/shopify-templates" className="text-gray-500 hover:text-notifybot-blue">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back to Templates
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-semibold">Available Tags</h1>
          <p className="text-gray-500 mt-1">
            Use these tags in your Shopify message templates. They will be automatically replaced with actual data when messages are sent.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-6 text-gray-700 font-medium">Field Name</th>
                <th className="text-left py-3 px-6 text-gray-700 font-medium">Tag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tags.map((tag) => (
                <tr key={tag.name} className="hover:bg-gray-50">
                  <td className="py-3 px-6 text-gray-700">{tag.name}</td>
                  <td className="py-3 px-6 flex items-center">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded mr-3 text-gray-600">{tag.value}</code>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-400 hover:text-notifybot-blue"
                      onClick={() => copyToClipboard(tag.value)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AvailableTags;
