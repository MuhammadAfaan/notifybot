
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyDevices from "./pages/MyDevices";
import DeviceDetail from "./pages/DeviceDetail";
import NewDevice from "./pages/NewDevice";
import ShopifyTemplates from "./pages/ShopifyTemplates";
import ContactBook from "./pages/ContactBook";
import MessageLog from "./pages/MessageLog";
import UserGuide from "./pages/UserGuide";
import OrderCredits from "./pages/OrderCredits";
import HelpSupport from "./pages/HelpSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/devices" element={<MyDevices />} />
          <Route path="/devices/new" element={<NewDevice />} />
          <Route path="/devices/:id" element={<DeviceDetail />} />
          <Route path="/shopify-templates" element={<ShopifyTemplates />} />
          <Route path="/contact-book" element={<ContactBook />} />
          <Route path="/message-log" element={<MessageLog />} />
          <Route path="/guide" element={<UserGuide />} />
          <Route path="/credits" element={<OrderCredits />} />
          <Route path="/support" element={<HelpSupport />} />
          <Route path="/purchase-credits" element={<Navigate to="/credits" />} />
          
          {/* Redirects for old URLs to new URLs */}
          <Route path="/couriers" element={<Navigate to="/dashboard" />} />
          <Route path="/courier-templates" element={<Navigate to="/dashboard" />} />
          <Route path="/contacts" element={<Navigate to="/contact-book" />} />
          <Route path="/messages" element={<Navigate to="/message-log" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
