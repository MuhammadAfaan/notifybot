
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Simple mock types to replace Supabase types
interface User {
  id: string;
  email: string;
}

interface Session {
  user: User;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
  }>;
  signUp: (email: string, password: string, userData: any) => Promise<{
    error: Error | null;
    data: any;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{
    error: Error | null;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create a mock user for demonstration purposes
  const mockUser: User = { id: 'mock-user-id', email: 'user@example.com' };
  const mockSession: Session = { user: mockUser };
  
  // Set default state with mock user (always logged in for UI demonstration)
  const [user] = useState<User | null>(mockUser);
  const [session] = useState<Session | null>(mockSession);
  const [loading] = useState(false);
  
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    // API CALL: This would authenticate the user in a real app
    console.log(`Mock sign in with email: ${email}`);
    navigate('/dashboard');
    return { error: null };
  };

  const signUp = async (email: string, password: string, userData: any) => {
    // API CALL: This would register a new user in a real app
    console.log(`Mock sign up with email: ${email}`, userData);
    navigate('/dashboard');
    return { data: { user: mockUser }, error: null };
  };

  const signOut = async () => {
    // API CALL: This would sign out the user in a real app
    console.log('Mock sign out');
    navigate('/login');
  };

  const resetPassword = async (email: string) => {
    // API CALL: This would trigger password reset in a real app
    console.log(`Mock password reset for: ${email}`);
    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
