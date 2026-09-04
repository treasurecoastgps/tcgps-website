export enum UserRole {
  VISITOR = 'visitor',
  PROSPECTIVE_INVESTOR = 'prospective_investor',
  INVESTOR = 'investor',
  PROPERTY_MANAGER = 'property_manager',
  BOARD_MEMBER = 'board_member',
  ADMIN = 'admin',
  SUPPORT = 'support'
}

export enum OnboardingStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  DOCUMENTS_PENDING = 'documents_pending',
  COMPLETED = 'completed',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  onboardingStatus: OnboardingStatus;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}