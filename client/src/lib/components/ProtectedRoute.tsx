import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';
import { authService } from '../services';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  requireAuth?: boolean;
  fallback?: React.ReactNode;
  hideFromUnauthorized?: boolean; // For ops portal - return 404-style instead of access denied
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  requireAuth = true,
  fallback,
  hideFromUnauthorized = false
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to access this area.
          </p>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Sign In
            </button>
            <button className="w-full bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors">
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check role requirements
  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = authService.hasAnyRole(user, requiredRoles);
    
    if (!hasRequiredRole) {
      if (hideFromUnauthorized) {
        // For ops portal - show 404-style page instead of revealing admin area exists
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900">404</h1>
              <p className="text-xl text-gray-600 mt-4">Page not found</p>
              <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
              <button 
                onClick={() => window.history.back()}
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        );
      }
      
      if (fallback) {
        return <>{fallback}</>;
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
            <p className="text-gray-600">
              You don't have permission to access this area.
            </p>
            <button 
              onClick={() => window.history.back()}
              className="mt-6 bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

// Convenience components for specific route types
export const InvestorRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute 
    requiredRoles={[
      UserRole.INVESTOR,
      UserRole.PROSPECTIVE_INVESTOR,
      UserRole.ADMIN,
      UserRole.BOARD_MEMBER,
      UserRole.PROPERTY_MANAGER,
      UserRole.SUPPORT
    ]}
  >
    {children}
  </ProtectedRoute>
);

export const OpsRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute 
    requiredRoles={[
      UserRole.ADMIN,
      UserRole.BOARD_MEMBER,
      UserRole.PROPERTY_MANAGER,
      UserRole.SUPPORT
    ]}
    hideFromUnauthorized={true}
  >
    {children}
  </ProtectedRoute>
);

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute 
    requiredRoles={[UserRole.ADMIN, UserRole.BOARD_MEMBER]}
    hideFromUnauthorized={true}
  >
    {children}
  </ProtectedRoute>
);