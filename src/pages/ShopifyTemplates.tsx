
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Edit, 
  Trash, 
  Copy, 
  MoreHorizontal,
  Tag,
  MessageSquare,
  Smartphone,
  EyeIcon,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Types that would normally be defined in a separate types file
type Template = {
  id: string;
  name: string;
  event: string;
  device?: string;
  message: string;
  createdAt: string;
  status: 'active' | 'inactive';
};

type Device = {
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
              <td className="py-2 px-4 text-sm text-gray-700">Order Status</td>
              <td className="py-2 px-4 text-sm text-gray-500">[Order Status]</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-sm text-gray-700">Order Return Reason</td>
              <td className="py-2 px-4 text-sm text-gray-500">[Order Return Reason]</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-sm text-gray-700">Order Date</td>
              <td className="py-2 px-4 text-sm text-gray-500">[Order Date]</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-sm text-gray-700">Order Amount</td>
              <td className="py-2 px-4 text-sm text-gray-500">[Amount]</td>
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

// Success Toast Actions component
const TemplateCreatedActions = ({ onView, onEdit, onCreateAnother }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-2">
      <Button 
        size="sm" 
        variant="outline" 
        className="bg-white border-white hover:bg-white/90 text-green-700"
        onClick={onView}
      >
        <EyeIcon className="mr-1 h-4 w-4" /> View Template
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        className="bg-white border-white hover:bg-white/90 text-green-700"
        onClick={onEdit}
      >
        <Edit className="mr-1 h-4 w-4" /> Edit Again
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        className="bg-white border-white hover:bg-white/90 text-green-700"
        onClick={onCreateAnother}
      >
        <Plus className="mr-1 h-4 w-4" /> Create Another
      </Button>
    </div>
  );
};

const ShopifyTemplates = () => {
  const { toast } = useToast();
  
  // State for template data
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data for devices
  const [devices, setDevices] = useState<Device[]>([
    { id: 'dev-1', name: 'iPhone 13', type: 'smartphone' },
    { id: 'dev-2', name: 'Samsung Galaxy S22', type: 'smartphone' },
    { id: 'dev-3', name: 'Google Pixel 6', type: 'smartphone' }
  ]);
  
  // Stats counters
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });
  
  // State for new template form
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    event: '',
    device: '',
    message: ''
  });

  // State for the current edited template
  const [editedTemplate, setEditedTemplate] = useState<Template | null>(null);
  const [lastCreatedTemplate, setLastCreatedTemplate] = useState<Template | null>(null);

  // Mock API call to fetch templates
  useEffect(() => {
    // Simulating API request
    const fetchTemplates = () => {
      setLoading(true);
      
      setTimeout(() => {
        // Mock data
        const mockTemplates: Template[] = [];
        
        setTemplates(mockTemplates);
        setStats({
          total: 0,
          active: 0,
          inactive: 0
        });
        
        setLoading(false);
      }, 500);
    };
    
    fetchTemplates();
  }, []);

  // Handler for creating a new template
  const handleCreateTemplate = () => {
    // Validate form
    if (!newTemplate.name || !newTemplate.event || !newTemplate.message || !newTemplate.device) {
      toast({
        title: "Error",
        description: "All required fields must be filled",
        variant: "destructive"
      });
      return;
    }
    
    // Create template
    const newId = `temp-${Date.now()}`;
    const createdTemplate: Template = {
      id: newId,
      name: newTemplate.name,
      event: newTemplate.event,
      device: newTemplate.device,
      message: newTemplate.message,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    // Add to local state
    setTemplates(prev => [createdTemplate, ...prev]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      total: prev.total + 1,
      active: prev.active + 1
    }));
    
    // Save the last created template for reference
    setLastCreatedTemplate(createdTemplate);
    
    // Reset form and close dialog
    setNewTemplate({ name: '', event: '', device: '', message: '' });
    setIsDialogOpen(false);
    
    // Show success message with actions
    toast({
      title: "Shopify Message Created",
      description: "Your new template has been created successfully.",
      variant: "success",
      action: (
        <TemplateCreatedActions 
          onView={() => handleViewTemplate(createdTemplate)}
          onEdit={() => handleEditTemplate(createdTemplate)}
          onCreateAnother={() => setIsDialogOpen(true)}
        />
      ),
      duration: 5000,
    });
  };

  // Handle template duplication
  const handleDuplicateTemplate = (template: Template) => {
    const duplicatedTemplate: Template = {
      ...template,
      id: `temp-${Date.now()}`,
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString()
    };
    
    setTemplates(prev => [duplicatedTemplate, ...prev]);
    
    setStats(prev => ({
      ...prev,
      total: prev.total + 1,
      active: prev.active + 1
    }));
    
    toast({
      title: "Template Duplicated",
      description: "Your template has been duplicated successfully.",
      variant: "success",
    });
  };

  // Handle template deletion
  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    
    setStats(prev => ({
      ...prev,
      total: prev.total - 1,
      active: prev.active - 1
    }));
    
    toast({
      title: "Template Deleted",
      description: "Your template has been deleted successfully.",
      variant: "default",
    });
  };

  // Handle template editing
  const handleEditTemplate = (template: Template) => {
    setEditedTemplate(template);
    setNewTemplate({
      name: template.name,
      event: template.event,
      device: template.device || '',
      message: template.message
    });
    setIsDialogOpen(true);
  };

  // Handle viewing a template details
  const handleViewTemplate = (template: Template) => {
    // In a real app, this might navigate to a detail page
    // For now, we'll just show the template in a toast
    toast({
      title: template.name,
      description: template.message,
      variant: "default",
    });
  };

  // Format event name for display
  const formatEventName = (eventKey: string) => {
    switch (eventKey) {
      case 'order.created': return 'Order Created';
      case 'order.fulfilled': return 'Order Fulfilled';
      case 'order.cancelled': return 'Order Cancelled';
      case 'cart.abandoned': return 'Abandoned Cart';
      case 'customer.created': return 'New Customer';
      default: return eventKey;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Shopify Messages</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-notifybot-blue hover:bg-notifybot-dark-blue">
              Create New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editedTemplate ? "Edit shopify message" : "Create new shopify message"}
              </DialogTitle>
              <DialogDescription>
                {editedTemplate 
                  ? "Update your message template for Shopify store events."
                  : "Create a new message template for your Shopify store events."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Message Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-name" className="block mb-1">Template Name</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      placeholder="e.g., Order Confirmation"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="device" className="block mb-1">
                      Device <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={newTemplate.device}
                      onValueChange={(value) => setNewTemplate({...newTemplate, device: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Device" />
                      </SelectTrigger>
                      <SelectContent>
                        {devices.map(device => (
                          <SelectItem key={device.id} value={device.id}>
                            <div className="flex items-center">
                              <Smartphone className="h-4 w-4 mr-2" />
                              {device.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="event-type" className="block mb-1">
                      Event Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={newTemplate.event}
                      onValueChange={(value) => setNewTemplate({...newTemplate, event: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Event Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order.created">Order Created</SelectItem>
                        <SelectItem value="order.fulfilled">Order Fulfilled</SelectItem>
                        <SelectItem value="order.cancelled">Order Cancelled</SelectItem>
                        <SelectItem value="cart.abandoned">Abandoned Cart</SelectItem>
                        <SelectItem value="customer.created">New Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message-template" className="block mb-1">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message-template"
                      value={newTemplate.message}
                      onChange={(e) => setNewTemplate({...newTemplate, message: e.target.value})}
                      placeholder="Enter your message template with variables like [Order No.]"
                      className="min-h-[120px]"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      You can use tags like [User Name], [Order No.], etc.
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
              <Button variant="outline" onClick={() => {
                setIsDialogOpen(false);
                if (editedTemplate) setEditedTemplate(null);
              }}>
                Discard
              </Button>
              <Button 
                onClick={handleCreateTemplate} 
                className="bg-notifybot-blue hover:bg-notifybot-dark-blue"
              >
                {editedTemplate ? "Update message" : "Create message"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 md:p-6 shadow-sm">
          <h3 className="text-gray-600 font-medium mb-2">Total Messages</h3>
          <p className="text-3xl md:text-4xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 md:p-6 shadow-sm">
          <h3 className="text-gray-600 font-medium mb-2">Active Messages</h3>
          <p className="text-3xl md:text-4xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 md:p-6 shadow-sm">
          <h3 className="text-gray-600 font-medium mb-2">Inactive Messages</h3>
          <p className="text-3xl md:text-4xl font-bold text-orange-500">{stats.inactive}</p>
        </div>
      </div>

      {templates.length === 0 ? (
        <div className="p-8 text-center">
          <h3 className="text-xl font-medium text-gray-700 mb-4">No Shopify messages found</h3>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-notifybot-blue hover:bg-notifybot-dark-blue"
          >
            Create New Template
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-medium">{template.name}</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditTemplate(template)} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" /> Edit Message
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicateTemplate(template)} className="cursor-pointer">
                      <Copy className="mr-2 h-4 w-4" /> Copy Webhook Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteTemplate(template.id)} className="text-red-500 cursor-pointer">
                      <Trash className="mr-2 h-4 w-4" /> Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="mt-4 space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Message:</label>
                  <p className="text-gray-700">{template.message}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Total Sent:</label>
                  <p className="text-gray-700">0</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Device Name:</label>
                  <p className="text-gray-700">{template.device}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status:</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ShopifyTemplates;
