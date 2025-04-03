
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrderlyLogo from "@/components/OrderlyLogo";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  // This function would normally connect to an API to send a password reset email
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request to send password reset email
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast({
        title: "Reset link sent",
        description: "Please check your email for further instructions.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-orderly-bg p-4">
      <div className="bg-white rounded-lg shadow-sm max-w-md w-full p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <OrderlyLogo />
          </div>
          {sent ? (
            <>
              <h1 className="text-2xl font-semibold text-gray-800">Check your email</h1>
              <p className="text-gray-500 mt-2">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-gray-800">Forgot Password</h1>
              <p className="text-gray-500 mt-2">Enter your email to receive a reset link</p>
            </>
          )}
        </div>

        {sent ? (
          <div className="space-y-4">
            <Button 
              onClick={() => setSent(false)}
              variant="outline" 
              className="w-full"
            >
              Try a different email
            </Button>
            <Link to="/login">
              <Button 
                className="w-full bg-custom-orderly-green hover:bg-custom-orderly-green/90"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Login
              </Button>
            </Link>
          </div>
        ) : (
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

            <Button 
              type="submit" 
              className="w-full bg-custom-orderly-green hover:bg-custom-orderly-green/90"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center">
              <Link to="/login" className="text-sm text-custom-orderly-green hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
