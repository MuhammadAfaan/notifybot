
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NotifyBotLogo from "@/components/NotifyBotLogo";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const { signUp, user } = useAuth();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Form validation
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the terms and privacy policy");
      toast({
        title: "Terms Required",
        description: "Please accept the terms and privacy policy.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const userData = {
        firstName,
        lastName,
        phone,
      };

      const { error: signUpError } = await signUp(email, password, userData);

      if (signUpError) {
        setError(signUpError.message);
        toast({
          title: "Registration failed",
          description: signUpError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration successful",
          description: "Your account has been created!",
        });
        // Navigation to dashboard is handled in the signUp function
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-notifybot-bg p-4">
      <div className="bg-white rounded-lg shadow-sm max-w-md w-full p-6 sm:p-8 animate-fade-in">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4 sm:mb-6">
            <NotifyBotLogo />
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Register</h1>
          <p className="text-gray-500 mt-2">
            Have an account? <Link to="/login" className="text-notifybot-blue hover:underline">Login</Link>
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              I accept the <a href="#" className="text-notifybot-blue hover:underline">terms</a> and <a href="#" className="text-notifybot-blue hover:underline">privacy policy</a>
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-notifybot-blue hover:bg-notifybot-dark-blue"
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
