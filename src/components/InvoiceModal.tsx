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
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

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
      <DialogContent className="sm:max-w-[900px] p-0">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-2xl font-semibold">Invoice #{invoiceNo}</h2>
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
            <h3 className="font-semibold text-lg mb-4">Upload Payment Receipt</h3>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {file ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <Check className="text-green-500 mr-2" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                  <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  <Button variant="outline" size="sm" onClick={() => setFile(null)}>Change File</Button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Upload JPEG, PNG, or PDF (max 5MB)</p>
                  <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>Select File</Button>
                  <input id="file-upload" type="file" className="hidden" accept=".jpeg,.jpg,.png,.pdf" onChange={handleFileChange} />
                </>
              )}
            </div>

            {isUploading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowUploadSection(false)}>Cancel</Button>
              <Button onClick={handleMakePayment} disabled={isUploading || !file}>Complete Payment</Button>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-white rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">NotifyBot.pk</h1>
                <p className="text-sm text-gray-600">2nd Floor, Chenone</p>
                <p className="text-sm text-gray-600">Multan, Pakistan</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500 mb-1">Invoice To</h3>
                <p className="text-lg font-semibold">Shoparama</p>
                <p className="text-sm text-gray-600">afaan.sales@gmail.com</p>

                <div className="mt-4">
                  <h3 className="text-sm text-gray-500 mb-1">Payment Methods</h3>
                  <p className="text-sm font-medium">Bank Transfer</p>
                  <p className="text-sm">Inbound Agency</p>
                  <p className="text-sm">Account: 05220105233460</p>
                  <p className="text-sm">IBAN: PK03MEZN00052201052334602</p>

                  <p className="text-sm font-medium mt-2">EasyPaisa / JazzCash</p>
                  <p className="text-sm">Mirza Ali Shamal - 03069387974</p>
                </div>
              </div>

              <div className="text-right">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
                <div className="space-y-1 text-sm">
                  <div><span className="text-gray-500">Invoice No:</span> {invoiceNo}</div>
                  <div><span className="text-gray-500">Date:</span> 2025-04-03</div>
                  <div><span className="text-gray-500">Due:</span> Upon receipt</div>
                  <div><span className="text-gray-500">Status:</span> <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">Pending</span></div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-gray-800 text-white rounded-t-md p-3 grid grid-cols-12">
                <div className="col-span-6 font-medium">Description</div>
                <div className="col-span-3 text-center font-medium">Quantity</div>
                <div className="col-span-3 text-right font-medium">Amount</div>
              </div>

              <div className="border-x border-b rounded-b-md">
                <div className="grid grid-cols-12 p-4 border-b">
                  <div className="col-span-6">Credits</div>
                  <div className="col-span-3 text-center">{credits}</div>
                  <div className="col-span-3 text-right">{totalPaid}</div>
                </div>
              </div>

              <div className="p-4 text-sm text-gray-600 border rounded-b">
                <div className="flex justify-between py-1">
                  <span>Subtotal:</span>
                  <span>{totalPaid}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Service Fee:</span>
                  <span>PKR 0</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Discount:</span>
                  <span>- PKR 0</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>{totalPaid}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Amount Due:</span>
                  <span>{totalPaid}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Note: After making payment, click "Make Payment" to upload the receipt or send a screenshot on WhatsApp: +923069387974 with your Invoice No.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
