
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvoiceModalProps {
  invoiceNo: string;
  credits: number;
  totalPaid: string;
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceModal = ({ invoiceNo, credits, totalPaid, isOpen, onClose }: InvoiceModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // File size validation (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      // File type validation
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a JPEG, PNG, or PDF file",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleMakePayment = () => {
    if (file) {
      setIsUploading(true);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            toast({
              title: "Payment completed",
              description: "Your payment receipt has been uploaded successfully",
              variant: "success",
            });
            onClose();
          }, 500);
        }
      }, 300);
    } else {
      toast({
        title: "No file selected",
        description: "Please upload a payment receipt",
        variant: "default",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Invoice #{invoiceNo}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        
        <div className="py-4 border-b border-gray-200">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Invoice Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Credits:</span>
            <span className="font-medium">{credits}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">{totalPaid}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Status:</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Pending</span>
          </div>
        </div>
        
        <div className="py-4">
          <h3 className="font-medium mb-4">Upload Payment Receipt</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {file ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <Check className="text-green-500 mr-2" />
                  <span className="font-medium">{file.name}</span>
                </div>
                <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFile(null)}
                >
                  Change File
                </Button>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">
                  Upload JPEG, PNG, or PDF (max 5MB)
                </p>
                <Button
                  variant="outline" 
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Select File
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".jpeg,.jpg,.png,.pdf"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
          
          {isUploading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-notifybot-blue h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleMakePayment} disabled={isUploading || !file}>
            Make Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
