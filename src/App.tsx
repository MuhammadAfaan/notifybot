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
import ForgotPassword from "./pages/ForgotPassword";
import PricingPage from "./pages/PricingPage";
import Couriers from "./pages/Couriers";
import NewCourier from "./pages/NewCourier";
import CourierDetail from "./pages/CourierDetail";
import CourierTemplates from "./pages/CourierTemplates";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/devices" element={<MyDevices />} />
            <Route path="/devices/new" element={<NewDevice />} />
            <Route path="/devices/:id" element={<DeviceDetail />} />
            <Route path="/couriers" element={<Couriers />} />
            <Route path="/couriers/new" element={<NewCourier />} />
            <Route path="/couriers/:id" element={<CourierDetail />} />
            <Route path="/courier-templates" element={<CourierTemplates />} />
            <Route path="/shopify-templates" element={<ShopifyTemplates />} />
            <Route path="/contact-book" element={<ContactBook />} />
            <Route path="/message-log" element={<MessageLog />} />
            <Route path="/guide" element={<UserGuide />} />
            <Route path="/credits" element={<OrderCredits />} />
            <Route path="/support" element={<HelpSupport />} />
            <Route path="/purchase-credits" element={<PricingPage />} />
            
            <Route path="/couriers" element={<Navigate to="/dashboard" />} />
            <Route path="/courier-templates" element={<Navigate to="/dashboard" />} />
            <Route path="/contacts" element={<Navigate to="/contact-book" />} />
            <Route path="/messages" element={<Navigate to="/message-log" />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
