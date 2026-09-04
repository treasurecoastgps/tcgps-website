// Service layer for Treasure Coast Global Property Solutions
// This abstracts all backend API calls and provides a clean interface for components
// TODO: All services currently use mock data and will be replaced with actual API calls to Render backend

export { authService } from './authService';
export { propertyService } from './propertyService';
export { investorService } from './investorService';
export { documentService } from './documentService';
export { distributionService } from './distributionService';
export { supportService } from './supportService';

// Re-export types for convenience
export type { User, UserRole, LoginCredentials, RegisterData, AuthState, OnboardingStatus } from '../types/auth';
export type {
  Property,
  PropertyStatus,
  PropertyType,
  Investment,
  InvestmentStatus,
  InvestorProfile,
  Document,
  DocumentType,
  DocumentStatus,
  Distribution,
  DistributionStatus,
  SupportTicket,
  SupportMessage,
  SupportTicketStatus,
  SupportTicketPriority,
  Transaction
} from '../types/platform';

/**
 * Architecture Notes:
 * 
 * 1. All services are designed to be replaced with actual API calls to a Render backend
 * 2. The backend will handle business logic, authentication, authorization, and data persistence
 * 3. Supabase will be used primarily for database storage and authentication
 * 4. Integration workflows (DocuSign, Plaid) will be handled by the backend
 * 5. Frontend components should only interact with these services, never directly with APIs
 * 
 * Future Backend Integration Points:
 * 
 * Authentication Flow:
 * - POST /api/auth/login
 * - POST /api/auth/register  
 * - POST /api/auth/logout
 * - GET /api/auth/me
 * - POST /api/auth/refresh
 * 
 * Property Management:
 * - GET /api/properties (public properties)
 * - GET /api/properties/:id (with access control)
 * - POST /api/properties (admin only)
 * - PATCH /api/properties/:id (admin only)
 * 
 * Investment Management:
 * - GET /api/investors/:userId/profile
 * - GET /api/investors/:userId/investments
 * - POST /api/investments (triggers payment & document workflows)
 * - PATCH /api/investments/:id/reinvestment
 * 
 * Document Management:
 * - GET /api/documents/user/:userId
 * - GET /api/documents/property/:propertyId
 * - POST /api/documents/upload (admin only)
 * - POST /api/documents/:id/send-for-signature (DocuSign integration)
 * 
 * Distribution Management:
 * - GET /api/distributions/user/:userId
 * - POST /api/distributions/runs (admin only - creates distribution batch)
 * - POST /api/distributions/process-payments (admin only - triggers ACH payments)
 * 
 * Support System:
 * - GET /api/support/tickets/user/:userId
 * - POST /api/support/tickets
 * - POST /api/support/tickets/:id/messages
 * - PATCH /api/support/tickets/:id/status (admin only)
 * 
 * Integration Endpoints:
 * - POST /api/integrations/plaid/link-account
 * - POST /api/integrations/docusign/webhook
 * - GET /api/integrations/quickbooks/export (admin only)
 */