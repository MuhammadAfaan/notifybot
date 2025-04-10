
// This file provides a mock Supabase client for frontend development
// In a production app, you would use the actual Supabase client

const createMockClient = () => {
  return {
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          single: () => Promise.resolve({ data: null, error: null }),
          data: [],
          error: null
        }),
        data: [],
        error: null
      }),
      insert: (data: any) => Promise.resolve({ data: null, error: null }),
      update: (data: any) => ({
        eq: (column: string, value: any) => Promise.resolve({ data: null, error: null }),
        data: null, 
        error: null
      }),
      delete: () => ({
        eq: (column: string, value: any) => Promise.resolve({ data: null, error: null }),
        data: null, 
        error: null
      }),
    }),
    auth: {
      // Mock auth methods that match the Supabase API
      signInWithPassword: (credentials: { email: string; password: string }) => 
        Promise.resolve({ data: null, error: null }),
      
      signUp: (credentials: { 
        email: string; 
        password: string; 
        options?: { data: Record<string, any> } 
      }) => Promise.resolve({ data: null, error: null }),
      
      signOut: () => Promise.resolve({ error: null }),
      
      getSession: () => Promise.resolve({ 
        data: { 
          session: null 
        }, 
        error: null 
      }),
      
      resetPasswordForEmail: (email: string, options?: { redirectTo: string }) => 
        Promise.resolve({ data: null, error: null }),
      
      updateUser: (attributes: { password?: string }) => 
        Promise.resolve({ data: null, error: null }),
      
      onAuthStateChange: (callback: Function) => ({
        data: { 
          subscription: { 
            unsubscribe: () => {} 
          } 
        }
      }),
    },
  };
};

// Example comment: In a real app, you would import the Supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createMockClient();
