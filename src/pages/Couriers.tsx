
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Courier {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  totalMessages: number;
}

const Couriers = () => {
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const { toast } = useToast();

  // API call to fetch couriers
  const fetchCouriers = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/couriers');
      const data = await response.json();
      setCouriers(data);
    } catch (error) {
      toast({
        title: "Error fetching couriers",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const stats = {
    total: couriers.length,
    active: couriers.filter(c => c.status === 'ACTIVE').length,
    inactive: couriers.filter(c => c.status === 'INACTIVE').length
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Couriers</h1>
        <Button className="bg-notifybot-blue hover:bg-notifybot-dark-blue">
          <Plus className="mr-2 h-4 w-4" />
          Create Courier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="flex flex-col p-6">
            <span className="text-gray-600 text-sm">Total Courier</span>
            <span className="text-3xl font-bold mt-2">{stats.total}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col p-6">
            <span className="text-gray-600 text-sm">Active Couriers</span>
            <span className="text-3xl font-bold mt-2 text-green-500">{stats.active}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col p-6">
            <span className="text-gray-600 text-sm">InActive Couriers</span>
            <span className="text-3xl font-bold mt-2 text-red-500">{stats.inactive}</span>
          </CardContent>
        </Card>
      </div>

      {couriers.length === 0 ? (
        <div className="text-center py-12">
          <img 
            src="/images/empty-state.svg" 
            alt="No couriers found" 
            className="mx-auto mb-4 w-32 h-32"
          />
          <h3 className="text-lg font-medium text-gray-900">No courier found...</h3>
          <p className="text-gray-500">Get started by creating a new courier</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {couriers.map((courier) => (
            <CourierCard key={courier.id} courier={courier} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

const CourierCard = ({ courier }: { courier: Courier }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-lg">{courier.name}</h3>
        <Button variant="ghost" size="icon">
          ⋮
        </Button>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Total Messages: {courier.totalMessages}
      </p>
      <div className="mt-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          courier.status === 'ACTIVE' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {courier.status}
        </span>
      </div>
    </CardContent>
  </Card>
);

export default Couriers;
