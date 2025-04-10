
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Upload, DollarSign } from "lucide-react";
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
  const [showUploadSection, setShowUploadSection] = useState(false);
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
            // Reset and close
            setShowUploadSection(false);
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

  const openPaymentSection = () => {
    setShowUploadSection(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">Invoice #{invoiceNo}</h2>
          <Button 
            variant="outline" 
            className="bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600"
            onClick={openPaymentSection}
          >
            <DollarSign className="h-4 w-4 mr-1" />
            Make Payment
          </Button>
        </div>

        {showUploadSection ? (
          <div className="p-6">
            <h3 className="font-medium mb-4 text-lg">Upload Payment Receipt</h3>
            
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
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowUploadSection(false)}>Cancel</Button>
              <Button onClick={handleMakePayment} disabled={isUploading || !file}>
                Complete Payment
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Logo and Company Info */}
              <div className="col-span-1">
                <div className="flex flex-col">
                  <img src="/public/lovable-uploads/91558e0d-46d3-4db1-b9bc-465a5ab549ff.png" alt="Orderly Logo" className="w-28 mb-2" />
                  <p className="text-lg font-medium">Orderly.pk</p>
                  <p className="text-gray-500">2nd Floor, Chenone</p>
                  <p className="text-gray-500">Multan, Pakistan</p>
                </div>
              </div>

              {/* Middle section - Invoice details */}
              <div className="col-span-1">
                <div className="mb-6">
                  <h3 className="text-sm text-gray-500">Invoice to</h3>
                  <p className="font-medium text-lg">Shoparama</p>
                  <p className="text-gray-600">afaan.sales@gmail.com</p>
                </div>

                <div>
                  <h3 className="text-sm text-gray-500">Payment Methods</h3>
                  <div className="mt-2">
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm">Title: Inbound Agency</p>
                    <p className="text-sm">Bank Account: 05220105233460</p>
                    <p className="text-sm">Branch: 0522</p>
                    <p className="text-sm">IBAN: PK03MEZN00052201052334602</p>
                  </div>

                  <div className="mt-4">
                    <p className="font-medium">EasyPaisa/JazzCash</p>
                    <p className="text-sm">Title: Mirza Ali Shamal</p>
                    <p className="text-sm">Account: 03069387974</p>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <p>Note: Click on "Make Payment" and attach payment screenshot OR Send your payment screenshot at our WhatsApp: +923069387974 along with Invoice No.</p>
                  </div>
                </div>
              </div>

              {/* Right section - Invoice summary */}
              <div className="col-span-1 flex flex-col">
                <div className="text-right mb-6">
                  <h1 className="text-3xl font-bold">Invoice</h1>
                </div>
                
                <div className="space-y-2 mb-6 text-right">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice No:</span>
                    <span className="font-medium">{invoiceNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice Date:</span>
                    <span>2025-04-03</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Due:</span>
                    <span>Upon receipt</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Pending</span>
                  </div>
                </div>
                
                <div className="mt-auto text-right bg-green-50 p-4 rounded-md">
                  <p className="text-gray-600">Amount Due:</p>
                  <p className="text-2xl font-bold text-green-600">PKR 5,500</p>
                </div>
              </div>
            </div>

            {/* Invoice Items Table */}
            <div className="mt-8">
              <div className="bg-gray-800 text-white rounded-t-md p-3 grid grid-cols-12">
                <div className="col-span-5 font-medium">Description</div>
                <div className="col-span-3 text-center font-medium">Quantity</div>
                <div className="col-span-4 text-right font-medium">Amount</div>
              </div>
              
              <div className="border-x border-b rounded-b-md">
                <div className="grid grid-cols-12 p-4 border-b">
                  <div className="col-span-5">Credits</div>
                  <div className="col-span-3 text-center">{credits}</div>
                  <div className="col-span-4 text-right">{totalPaid}</div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Subtotal:</span>
                    <span>{totalPaid}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Service Fee:</span>
                    <span>PKR 0</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Discount:</span>
                    <span>- PKR 0</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-4">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">{totalPaid}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-gray-200">
                    <span className="font-bold">Amount Due:</span>
                    <span className="font-bold">{totalPaid}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
