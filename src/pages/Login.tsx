
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrderlyLogo from "@/components/OrderlyLogo";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login request
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Login successful",
        description: "Redirecting to dashboard...",
      });
      // Redirect would happen here in a real app
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-orderly-bg p-4">
      <div className="bg-white rounded-lg shadow-sm max-w-md w-full p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <OrderlyLogo />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Log in</h1>
          <p className="text-gray-500 mt-2">or <Link to="/signup" className="text-custom-orderly-green hover:underline">Create an account</Link></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <Input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-input" 
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-custom-orderly-green hover:underline">
                Forgot Password?
              </Link>
            </div>
            <Input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input" 
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={remember} 
              onCheckedChange={(checked) => setRemember(checked as boolean)} 
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-custom-orderly-green hover:bg-custom-orderly-green/90"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
