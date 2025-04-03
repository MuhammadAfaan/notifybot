
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
  FileSearch
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

// Types that would normally be defined in a separate types file
type Template = {
  id: string;
  name: string;
  event: string;
  message: string;
  createdAt: string;
  status: 'active' | 'inactive';
};

const ShopifyTemplates = () => {
  const { toast } = useToast();
  
  // State for template data that would be fetched from an API
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
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
    message: ''
  });

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

  // Handler for creating a new template - would connect to an API in a real app
  const handleCreateTemplate = () => {
    // Validate form
    if (!newTemplate.name || !newTemplate.event || !newTemplate.message) {
      toast({
        title: "Error",
        description: "All fields are required",
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
      message: newTemplate.message,
      createdAt: new Date().toISOString(),
      status: 'active'
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
    setNewTemplate({ name: '', event: '', message: '' });
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

  // Calculate pagination indexes
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = Math.min(startIndex + pagination.itemsPerPage, pagination.totalItems);
  const displayedTemplates = templates.slice(startIndex, endIndex);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Shopify Messages</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-custom-orderly-green hover:bg-custom-orderly-green/90">
              Create New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a new message template for your Shopify store events.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  placeholder="e.g., Order Confirmation"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event-type">Event Type</Label>
                <Select
                  value={newTemplate.event}
                  onValueChange={(value) => setNewTemplate({...newTemplate, event: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event" />
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
              <div className="grid gap-2">
                <Label htmlFor="message-template">Message Template</Label>
                <Textarea
                  id="message-template"
                  value={newTemplate.message}
                  onChange={(e) => setNewTemplate({...newTemplate, message: e.target.value})}
                  placeholder="Enter your message template with variables like {{order.number}}"
                  className="min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">
                  Available variables: {{order.number}}, {{customer.name}}, {{tracking.url}}, {{cart.url}}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateTemplate} className="bg-custom-orderly-green hover:bg-custom-orderly-green/90">
                Create Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards - Matching the design from the screenshot */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-600 font-medium mb-2">Total Messages</h3>
          <p className="text-4xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-600 font-medium mb-2">Active Messages</h3>
          <p className="text-4xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-600 font-medium mb-2">Inactive Messages</h3>
          <p className="text-4xl font-bold text-orange-500">{stats.inactive}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="flex justify-center mb-4">
            <FileSearch className="h-16 w-16 text-gray-300" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">Opps, there is no shopify message found....</h3>
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
                  <th className="p-4 font-medium">Message</th>
                  <th className="p-4 font-medium">Created</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-300 animate-pulse"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ) : displayedTemplates.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">No data available in table</td>
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
                      <td className="p-4 max-w-xs">
                        <div className="truncate text-gray-600">{template.message}</div>
                      </td>
                      <td className="p-4 text-gray-500 text-sm">{formatDate(template.createdAt)}</td>
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
          <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
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
