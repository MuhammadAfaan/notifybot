
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NotifyBotLogo from "@/components/NotifyBotLogo";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const { resetPassword, user } = useAuth();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: resetError } = await resetPassword(email);

      if (resetError) {
        setError(resetError.message);
        toast({
          title: "Password reset failed",
          description: resetError.message,
          variant: "destructive",
        });
      } else {
        setSent(true);
        toast({
          title: "Reset link sent",
          description: "Please check your email for further instructions.",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast({
        title: "Password reset failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-notifybot-bg p-4">
      <div className="bg-white rounded-lg shadow-sm max-w-md w-full p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <NotifyBotLogo />
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

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
                className="w-full bg-notifybot-blue hover:bg-notifybot-dark-blue"
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
              className="w-full bg-notifybot-blue hover:bg-notifybot-dark-blue"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center">
              <Link to="/login" className="text-sm text-notifybot-blue hover:underline">
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
