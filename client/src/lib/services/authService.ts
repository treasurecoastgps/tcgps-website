import { User, LoginCredentials, RegisterData, AuthState, UserRole, OnboardingStatus } from '../types/auth';

// TODO: Replace with actual API calls to Render backend
// This service abstracts auth logic from components

class AuthService {
  private baseUrl = '/api/auth'; // Will be Render backend URL

  // Mock user for development - Replace with actual API calls
  private mockUser: User = {
    id: 'user-1',
    email: 'demo@treasurecoast.com',
    firstName: 'Demo',
    lastName: 'Investor',
    role: UserRole.INVESTOR,
    onboardingStatus: OnboardingStatus.COMPLETED,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isActive: true
  };

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/login`, { method: 'POST', body: JSON.stringify(credentials) })
    
    // Mock implementation for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: this.mockUser,
          token: 'mock-jwt-token'
        });
      }, 1000);
    });
  }

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/register`, { method: 'POST', body: JSON.stringify(data) })
    
    // Mock implementation for development
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          ...this.mockUser,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          onboardingStatus: OnboardingStatus.NOT_STARTED
        };
        resolve({
          user: newUser,
          token: 'mock-jwt-token'
        });
      }, 1000);
    });
  }

  async logout(): Promise<void> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/logout`, { method: 'POST' })
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('auth_token');
        resolve();
      }, 500);
    });
  }

  async getCurrentUser(): Promise<User | null> {
    // TODO: Replace with actual API call that validates JWT
    // return fetch(`${this.baseUrl}/me`, { headers: { Authorization: `Bearer ${token}` } })
    
    // Mock implementation - check if user is logged in
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockUser);
      }, 500);
    });
  }

  async refreshToken(): Promise<string> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/refresh`, { method: 'POST' })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('refreshed-mock-jwt-token');
      }, 500);
    });
  }

  async requestPasswordReset(email: string): Promise<void> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Password reset requested for ${email}`);
        resolve();
      }, 1000);
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Password reset with token ${token}`);
        resolve();
      }, 1000);
    });
  }

  // Utility methods for role checking
  hasRole(user: User | null, role: UserRole): boolean {
    return user?.role === role;
  }

  hasAnyRole(user: User | null, roles: UserRole[]): boolean {
    return user ? roles.includes(user.role) : false;
  }

  isInternalUser(user: User | null): boolean {
    if (!user) return false;
    return [
      UserRole.ADMIN,
      UserRole.BOARD_MEMBER,
      UserRole.PROPERTY_MANAGER,
      UserRole.SUPPORT
    ].includes(user.role);
  }

  canAccessOpsPortal(user: User | null): boolean {
    return this.isInternalUser(user);
  }

  canAccessInvestorApp(user: User | null): boolean {
    if (!user) return false;
    return [
      UserRole.INVESTOR,
      UserRole.PROSPECTIVE_INVESTOR,
      ...this.getInternalRoles()
    ].includes(user.role);
  }

  private getInternalRoles(): UserRole[] {
    return [
      UserRole.ADMIN,
      UserRole.BOARD_MEMBER,
      UserRole.PROPERTY_MANAGER,
      UserRole.SUPPORT
    ];
  }
}

export const authService = new AuthService();