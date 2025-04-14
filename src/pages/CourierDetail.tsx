
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Trash, Save, Clock, BarChart } from 'lucide-react';

// Type definition for courier data
type CourierData = {
  id: string;
  name: string;
  company: string;
  apiKey: string;
  apiPassword: string;
  status: boolean;
  lastActive: string;
  trackingCount: number;
};

const CourierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [courierData, setCourierData] = useState<CourierData | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    // In a real application, this would be an API call
    // Example API call:
    // const fetchCourierData = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await fetch(`/api/couriers/${id}`);
    //     const data = await response.json();
    //     setCourierData(data);
    //   } catch (error) {
    //     toast({
    //       title: "Error",
    //       description: "Failed to load courier details",
    //       variant: "destructive",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchCourierData();

    // Mock data for demonstration
    setCourierData({
      id: id || '1',
      name: 'Courier Service',
      company: 'leopards',
      apiKey: 'api_12345678',
      apiPassword: 'password123',
      status: true,
      lastActive: new Date().toISOString(),
      trackingCount: 157
    });
  }, [id, toast]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // In a real application, this would be an API call
      // Example API call:
      // await fetch(`/api/couriers/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(courierData)
      // });

      toast({
        title: "Success",
        description: "Courier updated successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update courier",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this courier?")) {
      setIsLoading(true);
      try {
        // In a real application, this would be an API call
        // Example API call:
        // await fetch(`/api/couriers/${id}`, { method: 'DELETE' });

        toast({
          title: "Success",
          description: "Courier deleted successfully",
          variant: "success",
        });
        navigate('/couriers');
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete courier",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!courierData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading courier details...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Package className="h-6 w-6 text-notifybot-blue mr-2" />
            <h1 className="text-xl font-semibold">{courierData.name}</h1>
          </div>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/couriers')}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isLoading}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button 
              className="bg-notifybot-blue hover:bg-notifybot-dark-blue"
              onClick={handleSave}
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList className="mb-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Courier Information</CardTitle>
                <CardDescription>
                  Manage your courier service integration details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="company">
                    Courier Company <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={courierData.company}
                    onValueChange={(value) => setCourierData({...courierData, company: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a courier service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leopards">Leopards Courier</SelectItem>
                      <SelectItem value="tcs">TCS</SelectItem>
                      <SelectItem value="dhl">DHL</SelectItem>
                      <SelectItem value="fedex">FedEx</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="apiKey">
                    API Key <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="apiKey"
                    value={courierData.apiKey}
                    onChange={(e) => setCourierData({...courierData, apiKey: e.target.value})}
                    placeholder="Enter your API key"
                  />
                </div>

                <div>
                  <Label htmlFor="apiPassword">
                    API Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="apiPassword"
                    type="password"
                    value={courierData.apiPassword}
                    onChange={(e) => setCourierData({...courierData, apiPassword: e.target.value})}
                    placeholder="Enter your API password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <p className="text-sm text-gray-500">Enable or disable this courier integration</p>
                  </div>
                  <Switch
                    id="status"
                    checked={courierData.status}
                    onCheckedChange={(checked) => setCourierData({...courierData, status: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="statistics">
            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>
                  View tracking statistics for this courier service.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <BarChart className="h-5 w-5 text-blue-600" />
                      <h3 className="text-sm font-medium text-blue-600">Total Trackings</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{courierData.trackingCount}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      <h3 className="text-sm font-medium text-green-600">Last Active</h3>
                    </div>
                    <p className="mt-2 text-sm font-medium">
                      {new Date(courierData.lastActive).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Activity Logs</CardTitle>
                <CardDescription>
                  Recent activities with this courier service.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>No recent activities found.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CourierDetail;
