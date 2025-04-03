
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Copy, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  FileSearch,
  Tag,
  MessageSquare,
  Smartphone,
  EyeIcon
} from 'lucide-react';
import { Input } from '@/components/ui/input';
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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/components/ui/sidebar';

// Types that would normally be defined in a separate types file
type Template = {
  id: string;
  name: string;
  event: string;
  device?: string;
  messageType?: string;
  message: string;
  createdAt: string;
  status: 'active' | 'inactive';
  tags?: string[];
};

type Device = {
  id: string;
  name: string;
  type: string;
};

type Tag = {
  id: string;
  name: string;
  color: string;
};

const ShopifyTemplates = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();
  
  // State for template data that would be fetched from an API
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for devices and tags
  const [devices, setDevices] = useState<Device[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Stats counters
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });
  
  // State for pagination that would be managed with API calls
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  
  // State for new template form
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    event: '',
    device: '',
    messageType: '',
    message: '',
    tags: [] as string[]
  });

  // Load mock devices
  useEffect(() => {
    // In a real app, this would be an API call to fetch devices
    const mockDevices: Device[] = [
      { id: 'dev-1', name: 'iPhone 13', type: 'smartphone' },
      { id: 'dev-2', name: 'Samsung Galaxy S22', type: 'smartphone' },
      { id: 'dev-3', name: 'Google Pixel 6', type: 'smartphone' }
    ];
    setDevices(mockDevices);
  }, []);

  // Load mock tags
  useEffect(() => {
    // In a real app, this would be an API call to fetch tags
    const mockTags: Tag[] = [
      { id: 'tag-1', name: 'Important', color: 'red' },
      { id: 'tag-2', name: 'Sale', color: 'green' },
      { id: 'tag-3', name: 'Promotion', color: 'blue' },
      { id: 'tag-4', name: 'Automated', color: 'purple' },
      { id: 'tag-5', name: 'Customer Service', color: 'orange' }
    ];
    setTags(mockTags);
  }, []);

  // Mock API call to fetch templates - in a real app this would be an actual API call
  useEffect(() => {
    const fetchTemplates = () => {
      setLoading(true);
      
      // Simulate API request
      setTimeout(() => {
        // This is mock data - in a real app, this would come from an API
        const mockTemplates: Template[] = [];
        
        // Filter templates by search term if provided
        const filteredTemplates = searchTerm 
          ? mockTemplates.filter(t => 
              t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              t.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
              t.message.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : mockTemplates;
        
        setTemplates(filteredTemplates);
        
        // Update stats
        setStats({
          total: filteredTemplates.length,
          active: filteredTemplates.filter(t => t.status === 'active').length,
          inactive: filteredTemplates.filter(t => t.status === 'inactive').length
        });
        
        setPagination({
          currentPage: 1,
          totalPages: Math.ceil(filteredTemplates.length / 10),
          totalItems: filteredTemplates.length,
          itemsPerPage: 10
        });
        
        setLoading(false);
      }, 500);
    };
    
    fetchTemplates();
  }, [searchTerm]);

  // Handle tag selection toggle
  const toggleTag = (tagId: string) => {
    setNewTemplate(prev => {
      const newTags = prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId];
      
      return { ...prev, tags: newTags };
    });
  };

  // Handler for creating a new template - would connect to an API in a real app
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
    
    // In a real app, this would be an API call
    const newId = `temp-${Date.now()}`;
    const createdTemplate: Template = {
      id: newId,
      name: newTemplate.name,
      event: newTemplate.event,
      device: newTemplate.device,
      messageType: newTemplate.messageType,
      message: newTemplate.message,
      createdAt: new Date().toISOString(),
      status: 'active',
      tags: newTemplate.tags
    };
    
    // Add to local state (in a real app, the API would return the new template)
    setTemplates(prev => [createdTemplate, ...prev]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      total: prev.total + 1,
      active: prev.active + 1
    }));
    
    // Reset form and close dialog
    setNewTemplate({ name: '', event: '', device: '', messageType: '', message: '', tags: [] });
    setIsDialogOpen(false);
    
    // Show success message
    toast({
      title: "Template Created",
      description: "Your new template has been created successfully."
    });
  };

  // Format display date from ISO string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get tag color by id
  const getTagColor = (tagId: string) => {
    const tag = tags.find(t => t.id === tagId);
    return tag?.color || 'gray';
  };

  // Get tag name by id
  const getTagName = (tagId: string) => {
    const tag = tags.find(t => t.id === tagId);
    return tag?.name || '';
  };

  // Get device name by id
  const getDeviceName = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    return device?.name || '';
  };

  // Calculate pagination indexes
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = Math.min(startIndex + pagination.itemsPerPage, pagination.totalItems);
  const displayedTemplates = templates.slice(startIndex, endIndex);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        {isMobile && (
          <Button variant="ghost" size="icon" className="mr-2" onClick={toggleSidebar}>
            <MessageSquare className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-2xl font-semibold">Shopify Messages</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-custom-orderly-green hover:bg-custom-orderly-green/90">
              Create New
            </Button>
          </DialogTrigger>
          <DialogContent className={isMobile ? "w-[95vw] max-w-none" : "sm:max-w-[800px]"}>
            <DialogHeader>
              <DialogTitle>Create new shopify message</DialogTitle>
              <DialogDescription>
                Create a new message template for your Shopify store events.
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
                    <Label htmlFor="message-type" className="block mb-1">
                      Message Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={newTemplate.messageType}
                      onValueChange={(value) => setNewTemplate({...newTemplate, messageType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Message Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="notification">Notification</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="transactional">Transactional</SelectItem>
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
                      Available variables: [Order No.], [User Name], [Tracking Url], [Products]
                    </p>
                  </div>
                  
                  <div>
                    <Label className="block mb-2">Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <Badge 
                          key={tag.id}
                          variant={newTemplate.tags.includes(tag.id) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            newTemplate.tags.includes(tag.id) 
                              ? `bg-${tag.color}-500 hover:bg-${tag.color}-600` 
                              : `hover:bg-${tag.color}-100`
                          }`}
                          onClick={() => toggleTag(tag.id)}
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Discard</Button>
              <Button 
                onClick={handleCreateTemplate} 
                className="bg-custom-orderly-green hover:bg-custom-orderly-green/90"
              >
                Create message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards - Matching the design from the screenshot */}
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

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            className="pl-10" 
            placeholder="Search templates..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {templates.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-12 text-center">
          <div className="flex justify-center mb-4">
            <FileSearch className="h-12 w-12 md:h-16 md:w-16 text-gray-300" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">Oops, there is no shopify message found....</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Create your first Shopify message template to get started with automated messaging.
          </p>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-custom-orderly-green hover:bg-custom-orderly-green/90"
          >
            Create New Template
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Event</th>
                  <th className="p-4 font-medium hidden md:table-cell">Device</th>
                  <th className="p-4 font-medium hidden md:table-cell">Message</th>
                  <th className="p-4 font-medium hidden md:table-cell">Tags</th>
                  <th className="p-4 font-medium hidden md:table-cell">Created</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-300 animate-pulse"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ) : displayedTemplates.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-gray-500">No data available in table</td>
                  </tr>
                ) : (
                  // Map through templates from the API response
                  displayedTemplates.map((template) => (
                    <tr key={template.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-medium">{template.name}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                          {template.event}
                        </span>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        {template.device && (
                          <div className="flex items-center">
                            <Smartphone className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-sm">{getDeviceName(template.device)}</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 max-w-xs hidden md:table-cell">
                        <div className="truncate text-gray-600">{template.message}</div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {template.tags?.map(tagId => (
                            <Badge 
                              key={tagId} 
                              variant="secondary"
                              className="text-xs px-1.5 py-0"
                            >
                              {getTagName(tagId)}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-gray-500 text-sm hidden md:table-cell">{formatDate(template.createdAt)}</td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer flex items-center">
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex items-center">
                              <Copy className="mr-2 h-4 w-4" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex items-center">
                              <EyeIcon className="mr-2 h-4 w-4" /> Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex items-center text-red-600">
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
            <div>
              Showing {pagination.totalItems === 0 ? 0 : startIndex + 1} to {endIndex} of {pagination.totalItems} entries
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0"
                disabled={pagination.currentPage === 1}
                onClick={() => setPagination({...pagination, currentPage: 1})}
              >
                «
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0"
                disabled={pagination.currentPage === 1}
                onClick={() => setPagination({...pagination, currentPage: pagination.currentPage - 1})}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0"
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => setPagination({...pagination, currentPage: pagination.currentPage + 1})}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0"
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => setPagination({...pagination, currentPage: pagination.totalPages})}
              >
                »
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ShopifyTemplates;
