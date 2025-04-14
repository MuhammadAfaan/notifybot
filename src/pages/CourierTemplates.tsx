import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Edit,
  Trash,
  Copy,
  MoreHorizontal,
  Tag,
  MessageSquare,
  Truck,
  EyeIcon,
  Plus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// Types that would normally be defined in a separate types file
type Template = {
  id: string;
  name: string;
  event: string;
  courier?: string;
  message: string;
  createdAt: string;
  status: 'active' | 'inactive';
};

type Courier = {
  id: string;
  name: string;
  type: string;
};

// Available tags table for templates
const AvailableTagsTable = () => {
  return (
    <div className="border rounded-lg overflow-hidden mt-6">
      <div className="bg-gray-50 p-3 border-b">
        <h3 className="text-sm font-medium">Available Tags</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Tag Name</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-2 px-4 text-sm text-gray-700">User Name</td>
              <td className="py-2 px-4 text-sm text-gray-500">[User Name]</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-sm text-gray-700">Tracking Number</td>
              <td className="py-2 px-4 text-sm text-gray-500">[Tracking Number]</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-sm text-gray-700">Delivery Date</td>
              <td className="py-2 px-4 text-sm text-gray-500">[Delivery Date]</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-sm text-gray-700">Courier Name</td>
              <td className="py-2 px-4 text-sm text-gray-500">[Courier Name]</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-sm text-gray-700">Order Number</td>
              <td className="py-2 px-4 text-sm text-gray-500">[Order No.]</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CourierTemplates = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = React.useState<Template[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [stats, setStats] = React.useState({
    total: 0,
    active: 0,
    inactive: 0
  });

  const [newTemplate, setNewTemplate] = React.useState({
    name: '',
    event: '',
    message: '',
    courier: ''
  });

  // Mock data for couriers
  const [couriers, setCouriers] = React.useState<Courier[]>([
    { id: 'courier-1', name: 'Leopards Courier', type: 'courier' },
    { id: 'courier-2', name: 'TCS', type: 'courier' },
    { id: 'courier-3', name: 'DHL', type: 'courier' }
  ]);

  // Mock API call to fetch templates
  React.useEffect(() => {
    // In a real app, this would be an API call:
    // const fetchTemplates = async () => {
    //   const response = await fetch('/api/courier-templates');
    //   const data = await response.json();
    //   setTemplates(data);
    //   setStats({
    //     total: data.length,
    //     active: data.filter(t => t.status === 'active').length,
    //     inactive: data.filter(t => t.status === 'inactive').length
    //   });
    // };
    // fetchTemplates();
  }, []);

  const handleCreateTemplate = async () => {
    try {
      // In a real app, this would be an API call:
      // await fetch('/api/courier-templates', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newTemplate)
      // });

      toast({
        title: "Template Created",
        description: "Your new template has been created successfully.",
        variant: "success",
      });

      setIsDialogOpen(false);
      setNewTemplate({ name: '', event: '', message: '', courier: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create template",
        variant: "destructive",
      });
    }
  };

  // Format event name for display
  const formatEventName = (eventKey: string) => {
    switch (eventKey) {
      case 'pickup': return 'Pickup Scheduled';
      case 'transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      case 'failed': return 'Delivery Failed';
      case 'returned': return 'Returned to Sender';
      default: return eventKey;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Courier Templates</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-notifybot-blue hover:bg-notifybot-dark-blue">
              Create New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create new courier template</DialogTitle>
              <DialogDescription>
                Create a message template for courier status updates.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Template Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-name" className="block mb-1">Template Name</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      placeholder="e.g., Delivery Update"
                    />
                  </div>

                  <div>
                    <Label htmlFor="courier" className="block mb-1">
                      Courier <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={newTemplate.courier}
                      onValueChange={(value) => setNewTemplate({ ...newTemplate, courier: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select courier" />
                      </SelectTrigger>
                      <SelectContent>
                        {couriers.map(courier => (
                          <SelectItem key={courier.id} value={courier.id}>
                            <div className="flex items-center">
                              <Truck className="h-4 w-4 mr-2" />
                              {courier.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="event" className="block mb-1">
                      Event <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={newTemplate.event}
                      onValueChange={(value) => setNewTemplate({ ...newTemplate, event: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pickup">Pickup Scheduled</SelectItem>
                        <SelectItem value="transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="failed">Delivery Failed</SelectItem>
                        <SelectItem value="returned">Returned to Sender</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="block mb-1">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={newTemplate.message}
                      onChange={(e) => setNewTemplate({ ...newTemplate, message: e.target.value })}
                      className="min-h-[120px]"
                      placeholder="Enter your message template"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      You can use tags like [User Name], [Tracking Number], etc.
                    </p>
                  </div>

                  {/* Available Tags Table */}
                  <AvailableTagsTable />
                </div>
              </div>

              {/* Preview Section */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-medium mb-4">Preview</h3>
                <div className="flex justify-center">
                  <div className="border border-gray-300 rounded-3xl p-2 bg-white w-64 shadow-md">
                    <div className="w-full h-8 flex justify-center items-center border-b border-gray-200">
                      <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="p-4 h-96 overflow-y-auto">
                      {newTemplate.message ? (
                        <div className="bg-green-100 p-3 rounded-lg text-green-800 max-w-[80%] text-sm">
                          {newTemplate.message}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                          <EyeIcon className="h-12 w-12 mb-2 opacity-30" />
                          <p className="text-center text-sm">Enter a message to see preview</p>
                        </div>
                      )}
                    </div>
                    <div className="w-full h-10 flex justify-center items-center border-t border-gray-200">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTemplate} className="bg-notifybot-blue hover:bg-notifybot-dark-blue">
                Create template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 md:p-6">
          <h3 className="text-gray-600 font-medium mb-2">Total Templates</h3>
          <p className="text-3xl md:text-4xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 md:p-6">
          <h3 className="text-gray-600 font-medium mb-2">Active Templates</h3>
          <p className="text-3xl md:text-4xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 md:p-6">
          <h3 className="text-gray-600 font-medium mb-2">Inactive Templates</h3>
          <p className="text-3xl md:text-4xl font-bold text-orange-500">{stats.inactive}</p>
        </div>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-12">
          <Truck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-500 mb-4">Create your first courier message template.</p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-notifybot-blue hover:bg-notifybot-dark-blue"
          >
            Create Template
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Template cards would go here */}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CourierTemplates;
