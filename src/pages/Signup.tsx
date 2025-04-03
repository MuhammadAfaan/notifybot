
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrderlyLogo from "@/components/OrderlyLogo";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and privacy policy.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate signup request
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Registration successful",
        description: "Redirecting to login page...",
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
          <h1 className="text-2xl font-semibold text-gray-800">Register</h1>
          <p className="text-gray-500 mt-2">
            Have an account? <Link to="/login" className="text-custom-orderly-green hover:underline">Login</Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input 
                type="text" 
                placeholder="First Name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input 
                type="text" 
                placeholder="Last Name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Input 
              type="tel" 
              placeholder="Phone" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={acceptTerms} 
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the <a href="#" className="text-custom-orderly-green hover:underline">terms</a> and <a href="#" className="text-custom-orderly-green hover:underline">privacy policy</a>
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-custom-orderly-green hover:bg-custom-orderly-green/90"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
