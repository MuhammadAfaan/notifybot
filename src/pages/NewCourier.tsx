
import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const NewCourier = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    company: '',
    apiKey: '',
    apiPassword: '',
    status: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call:
      // await fetch('/api/couriers', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Create a new courier object
      const newCourier = {
        id: Math.random().toString(36).substring(2, 15),
        name: formData.company,
        company: formData.company,
        apiKey: formData.apiKey,
        status: formData.status ? 'active' : 'inactive',
        lastActive: new Date().toISOString()
      };
      
      // Dispatch a custom event with the new courier
      const courierCreatedEvent = new CustomEvent('courierCreated', {
        detail: { courier: newCourier }
      });
      window.dispatchEvent(courierCreatedEvent);

      toast({
        title: "Success",
        description: "Courier service added successfully",
        variant: "success",
      });
      
      navigate('/couriers');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add courier service",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    navigate('/couriers');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Add New Courier</h1>
            <div className="space-x-2">
              <Button variant="outline" onClick={handleDiscard}>
                Discard
              </Button>
              <Button 
                disabled={isLoading}
                className="bg-notifybot-blue hover:bg-notifybot-dark-blue"
                onClick={handleSubmit}
              >
                Save Courier
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="company">
                Courier Company <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.company}
                onValueChange={(value) => setFormData({ ...formData, company: value })}
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
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
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
                value={formData.apiPassword}
                onChange={(e) => setFormData({ ...formData, apiPassword: e.target.value })}
                placeholder="Enter your API password"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="status">Status</Label>
              <Switch
                id="status"
                checked={formData.status}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewCourier;
