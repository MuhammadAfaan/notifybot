
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const CourierTemplates = () => {
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState('');

  // API call to create template
  const handleCreateTemplate = async () => {
    try {
      // TODO: Implement API call to create template
      const response = await fetch('/api/courier-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          // Add other form fields
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create template');
      }

      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Create new courier template</h1>
        <div className="space-x-4">
          <Button variant="outline">Discard</Button>
          <Button 
            className="bg-notifybot-blue hover:bg-notifybot-dark-blue"
            onClick={handleCreateTemplate}
          >
            Create template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Template Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Device</Label>
                  <Select>
                    <option>Select Device</option>
                  </Select>
                </div>

                <div>
                  <Label>Courier Company</Label>
                  <Select>
                    <option>Select Courier</option>
                  </Select>
                </div>

                <div>
                  <Label>Shipping Status</Label>
                  <Select>
                    <option>Select Shipping Status</option>
                  </Select>
                </div>

                <div>
                  <Label>Message Type</Label>
                  <Select>
                    <option>Select Message Type</option>
                  </Select>
                </div>

                <div>
                  <Label>Message</Label>
                  <Textarea 
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setPreview(e.target.value);
                    }}
                    placeholder="Enter your message template..."
                    className="h-32"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Available Tags</h2>
              <div className="grid grid-cols-2 gap-4">
                <TagItem label="User Name" tag="[User Name]" />
                <TagItem label="Order Status" tag="[Order Status]" />
                <TagItem label="Order Return Reason" tag="[Order Return Reason]" />
                <TagItem label="Order Date" tag="[Order Date]" />
                <TagItem label="Order Amount" tag="[Amount]" />
                <TagItem label="Order Number" tag="[Order No.]" />
                <TagItem label="Address" tag="[Address]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Preview</h2>
              <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px]">
                <div className="max-w-[280px] mx-auto bg-white rounded-xl shadow-sm p-4">
                  <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm">
                    {preview || "Message preview will appear here..."}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

const TagItem = ({ label, tag }: { label: string; tag: string }) => (
  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
    <span className="text-sm text-gray-600">{label}</span>
    <code className="text-sm text-notifybot-blue">{tag}</code>
  </div>
);

export default CourierTemplates;
