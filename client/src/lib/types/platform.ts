export enum PropertyStatus {
  UPCOMING = 'upcoming',
  ACTIVE = 'active',
  CLOSED = 'closed',
  SOLD = 'sold'
}

export enum PropertyType {
  SINGLE_FAMILY = 'single_family',
  MULTI_FAMILY = 'multi_family',
  COMMERCIAL = 'commercial',
  MIXED_USE = 'mixed_use',
  LAND = 'land'
}

export enum InvestmentStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  MATURED = 'matured',
  CANCELLED = 'cancelled'
}

export enum DocumentType {
  SUBSCRIPTION_AGREEMENT = 'subscription_agreement',
  OPERATING_AGREEMENT = 'operating_agreement',
  PPM = 'ppm', // Private Placement Memorandum
  TAX_DOCUMENT = 'tax_document',
  QUARTERLY_REPORT = 'quarterly_report',
  ANNUAL_REPORT = 'annual_report',
  DISTRIBUTION_STATEMENT = 'distribution_statement',
  OTHER = 'other'
}

export enum DocumentStatus {
  PENDING = 'pending',
  SENT = 'sent',
  SIGNED = 'signed',
  COMPLETED = 'completed'
}

export enum DistributionStatus {
  SCHEDULED = 'scheduled',
  PROCESSING = 'processing',
  PAID = 'paid',
  REINVESTED = 'reinvested',
  FAILED = 'failed'
}

export enum SupportTicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  WAITING_FOR_RESPONSE = 'waiting_for_response',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

export enum SupportTicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  status: PropertyStatus;
  description: string;
  market: string;
  city: string;
  state: string;
  // Address is never shown to investors - only internal use
  address?: string;
  images: string[];
  // Public metrics (shown to all)
  targetReturn?: number;
  minimumInvestment: number;
  totalRaise: number;
  raisedAmount: number;
  // Private metrics (only shown to invested users)
  currentValue?: number;
  occupancyRate?: number;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  quarterlyIncome?: number;
  investorReturn?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Investment {
  id: string;
  userId: string;
  propertyId: string;
  amount: number;
  status: InvestmentStatus;
  investmentDate: string;
  currentValue?: number;
  totalDistributions: number;
  reinvestmentElection: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InvestorProfile {
  id: string;
  userId: string;
  accreditedInvestor: boolean;
  entityType?: string;
  taxId?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  linkedBankAccount?: {
    bankName: string;
    accountType: string;
    lastFour: string;
    isVerified: boolean;
  };
  totalInvested: number;
  portfolioValue: number;
  totalDistributions: number;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  userId?: string;
  propertyId?: string;
  type: DocumentType;
  title: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  status: DocumentStatus;
  docusignEnvelopeId?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Distribution {
  id: string;
  propertyId: string;
  userId: string;
  investmentId: string;
  amount: number;
  quarter: string;
  year: number;
  status: DistributionStatus;
  paymentDate?: string;
  reinvested: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  assignedTo?: string;
  messages: SupportMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  isInternal: boolean;
  attachments?: string[];
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'investment' | 'distribution' | 'fee' | 'refund';
  amount: number;
  description: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  propertyId?: string;
  investmentId?: string;
  distributionId?: string;
  createdAt: string;
  updatedAt: string;
}