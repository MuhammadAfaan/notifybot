
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Tag, Copy, ChevronLeft } from 'lucide-react';
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

  // Group tags by category
  const orderTags = tags.filter(tag => tag.category === 'order');
  const customerTags = tags.filter(tag => tag.category === 'customer');
  const productTags = tags.filter(tag => tag.category === 'product');
  const shippingTags = tags.filter(tag => tag.category === 'shipping');

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

  // Reusable component for rendering tag groups
  const TagGroup = ({ title, tagList }: { title: string, tagList: TagData[] }) => (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4 text-gray-700">{title}</h3>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {tagList.map((tag) => (
            <div key={tag.name} className="flex justify-between items-center p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-3 text-notifybot-blue" />
                <div>
                  <div className="font-medium text-gray-700">{tag.name}</div>
                  <div className="text-sm text-gray-500">{tag.description}</div>
                </div>
              </div>
              <div className="flex items-center">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded mr-3 text-gray-600">{tag.value}</code>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-400 hover:text-notifybot-blue"
                  onClick={() => copyToClipboard(tag.value)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/shopify-templates" className="text-gray-500 hover:text-notifybot-blue">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back to Templates
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-semibold">Available Message Tags</h1>
          <p className="text-gray-500 mt-1">
            Use these tags in your Shopify message templates. They will be automatically replaced with actual data when messages are sent.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {orderTags.length > 0 && <TagGroup title="Order Information" tagList={orderTags} />}
        {customerTags.length > 0 && <TagGroup title="Customer Information" tagList={customerTags} />}
        {productTags.length > 0 && <TagGroup title="Product Information" tagList={productTags} />}
        {shippingTags.length > 0 && <TagGroup title="Shipping Information" tagList={shippingTags} />}
      </div>
    </DashboardLayout>
  );
};

export default AvailableTags;
