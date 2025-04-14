import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, FileText } from 'lucide-react';

type Template = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  status: 'active' | 'inactive';
};

const ShopifyTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Listen for template creation events
    const handleTemplateCreated = (event: CustomEvent) => {
      if (event.detail && event.detail.template) {
        const newTemplate = event.detail.template;
        setTemplates(prev => [...prev, newTemplate]);
        
        toast({
          title: "Template Added",
          description: "New template has been added successfully",
        });
      }
    };

    window.addEventListener('templateCreated', handleTemplateCreated as EventListener);
    return () => {
      window.removeEventListener('templateCreated', handleTemplateCreated as EventListener);
    };
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Shopify Templates</h1>
        <Button className="bg-notifybot-blue hover:bg-notifybot-dark-blue">
          <Plus className="mr-2 h-4 w-4" /> Create Template
        </Button>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-500 mb-4">Create your first Shopify template to get started.</p>
          <Button className="bg-notifybot-blue hover:bg-notifybot-dark-blue">
            <Plus className="mr-2 h-4 w-4" /> Create Template
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(template => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium">{template.name}</h3>
              <p className="text-sm text-gray-500">Type: {template.type}</p>
              <p className="text-sm text-gray-500">Created At: {new Date(template.createdAt).toLocaleDateString()}</p>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${template.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {template.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ShopifyTemplates;
