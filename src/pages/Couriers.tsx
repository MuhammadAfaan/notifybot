
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { Plus, Truck, Package, AlertCircle } from 'lucide-react';

const Couriers = () => {
  // Mock courier data - in a real app this would come from an API
  const [couriers, setCouriers] = React.useState<any[]>([]);
  const { toast } = useToast();

  // Mock API call to fetch couriers
  React.useEffect(() => {
    // In a real app, this would be an API call:
    // const fetchCouriers = async () => {
    //   const response = await fetch('/api/couriers');
    //   const data = await response.json();
    //   setCouriers(data);
    // };
    // fetchCouriers();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Couriers</h1>
        <Link to="/couriers/new">
          <Button className="bg-notifybot-blue hover:bg-notifybot-dark-blue">
            <Plus className="mr-2 h-4 w-4" />
            Add Courier
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 md:p-6">
          <h3 className="text-gray-600 font-medium mb-2">Total Couriers</h3>
          <p className="text-3xl md:text-4xl font-bold text-gray-800">{couriers.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 md:p-6">
          <h3 className="text-gray-600 font-medium mb-2">Active Couriers</h3>
          <p className="text-3xl md:text-4xl font-bold text-green-600">
            {couriers.filter(c => c.status === 'active').length}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 md:p-6">
          <h3 className="text-gray-600 font-medium mb-2">Inactive Couriers</h3>
          <p className="text-3xl md:text-4xl font-bold text-orange-500">
            {couriers.filter(c => c.status === 'inactive').length}
          </p>
        </div>
      </div>

      {couriers.length === 0 ? (
        <div className="text-center py-12">
          <Truck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No couriers found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first courier service.</p>
          <Link to="/couriers/new">
            <Button className="bg-notifybot-blue hover:bg-notifybot-dark-blue">
              <Plus className="mr-2 h-4 w-4" />
              Add Courier
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {couriers.map((courier) => (
            <Link
              key={courier.id}
              to={`/couriers/${courier.id}`}
              className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-notifybot-blue mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">{courier.name}</h3>
                    <p className="text-sm text-gray-500">{courier.company}</p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    courier.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {courier.status.toUpperCase()}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  API Key: •••••••••{courier.apiKey.slice(-4)}
                </p>
                <p className="text-sm text-gray-600">
                  Last Active: {new Date(courier.lastActive).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Couriers;
