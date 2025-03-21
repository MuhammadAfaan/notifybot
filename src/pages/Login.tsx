
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate loading state
    setIsSubmitting(true);
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome back",
        description: "You've successfully logged in",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-custom-soft-blue p-4">
      <div className="card-login">
        <div className="flex flex-col items-center mb-8">
          <Logo className="mb-6" />
          <h1 className="text-2xl font-medium text-gray-800">Log in</h1>
          <p className="text-gray-500 text-sm mt-2">Welcome back! Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <Mail size={14} />
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Lock size={14} />
                Password
              </label>
              <Link to="/forgot-password" className="link text-xs">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pr-10"
                placeholder="Enter your password"
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-custom-olive-green focus:ring-custom-olive-green/30"
              disabled={isSubmitting}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : 'Log in'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-custom-olive-green hover:underline">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
