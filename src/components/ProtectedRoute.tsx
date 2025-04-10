
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// This component no longer checks for authentication
// It simply allows access to all routes
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // In a real app, this would check if the user is authenticated
  // and redirect to login if not authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
