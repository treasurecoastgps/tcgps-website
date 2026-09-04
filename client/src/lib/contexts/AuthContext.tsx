import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData, UserRole, OnboardingStatus } from '../types/auth';
import { authService } from '../services';

const DEMO_USER: User = {
  id: 'demo',
  email: 'nikki@example.com',
  firstName: 'Nikki',
  lastName: 'Investor',
  role: UserRole.INVESTOR,
  onboardingStatus: OnboardingStatus.APPROVED,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  isActive: true,
};

interface AuthContextType extends AuthState {
  isDemo: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginAsDemo: () => void;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });
  const [isDemo, setIsDemo] = useState(false);

  // Initialize auth state — restore demo session or real token
  useEffect(() => {
    const initializeAuth = async () => {
      // Restore demo session
      if (localStorage.getItem('demo_mode') === 'true') {
        setIsDemo(true);
        setAuthState({ user: DEMO_USER, isAuthenticated: true, isLoading: false, error: null });
        return;
      }

      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const user = await authService.getCurrentUser();
          if (user) {
            setAuthState({ user, isAuthenticated: true, isLoading: false, error: null });
            return;
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('auth_token');
      }

      setAuthState({ user: null, isAuthenticated: false, isLoading: false, error: null });
    };

    initializeAuth();
  }, []);

  const loginAsDemo = (): void => {
    localStorage.setItem('demo_mode', 'true');
    setIsDemo(true);
    setAuthState({ user: DEMO_USER, isAuthenticated: true, isLoading: false, error: null });
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user, token } = await authService.login(credentials);
      localStorage.setItem('auth_token', token);
      setAuthState({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }));
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user, token } = await authService.register(data);
      localStorage.setItem('auth_token', token);
      setAuthState({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      }));
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (!isDemo) await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('demo_mode');
      setIsDemo(false);
      setAuthState({ user: null, isAuthenticated: false, isLoading: false, error: null });
    }
  };

  const refreshAuth = async (): Promise<void> => {
    if (isDemo) return;
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        setAuthState(prev => ({ ...prev, user }));
      } else {
        await logout();
      }
    } catch (error) {
      console.error('Auth refresh error:', error);
      await logout();
    }
  };

  const value: AuthContextType = {
    ...authState,
    isDemo,
    login,
    loginAsDemo,
    register,
    logout,
    refreshAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};