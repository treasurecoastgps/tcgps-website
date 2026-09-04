# Treasure Coast Global Property Solutions - Platform Architecture

> **Status note (2026-09-02):** This document was written early (March 2024) and its
> "Backend Integration Strategy" and "Future Backend" sections below described a
> Render/Supabase/QuickBooks stack that was never built and has since been superseded.
> The authoritative source of truth for stack decisions is now
> `investor-platform-project-document.html` (Section 03: Full Technology Stack), which
> specifies **AWS** (RDS Postgres, S3, Amplify/Elastic Beanstalk, CloudWatch), **Auth0**,
> **Plaid** (Link + Identity Verification), **Dwolla**, **DocuSign**, and **DoorLoop** —
> not Supabase, Render, or QuickBooks. Those sections have been corrected below. The
> Route Structure, User Roles, Service Layer, and Data Model sections remain accurate and
> match the current codebase.
>
> The public marketing site (this codebase's actual current state) is a **Vite + React +
> Wouter** SPA deployed to **Netlify**, with a local-dev **Express** server
> (`server/`) and parallel **Netlify Functions** (`netlify/functions/`) serving the same
> sample data in production. It is not Next.js. Content management (Sanity CMS) schema
> is designed and ready in `/studio` — see `studio/README.md` — but not yet wired into
> the frontend; the site launches on the existing static/API seed data.

## Overview
This document describes the transformation of the demo website into a production-ready real estate investment platform. The platform is designed to support an LLC-based investment vehicle with potential future evolution to REIT status.

## Architecture Transformation

### Before: Demo Landing Page
- Single-page marketing website
- Static content sections
- Basic contact forms
- Demo property listings

### After: Three-Tier Platform
1. **Public Site** - Marketing and lead conversion
2. **Investor Portal** - Protected investor dashboard and tools  
3. **Operations Portal** - Internal management interface (hidden from public)

## Route Structure

### Public Site Routes (`/`)
```
/ - Home page with hero, features, CTA
/about - Company information and mission
/how-it-works - Investment process explanation
/properties - Public property listings (limited data)
/faq - Frequently asked questions
/contact - Contact form and information
/login - Investor authentication
/register - New investor registration
```

### Investor Portal (`/app/*`)
**Protected by authentication + investor role**
```
/app/dashboard - Portfolio overview and key metrics
/app/portfolio - Detailed investment portfolio
/app/properties - Properties with investor-level data access
/app/documents - Document vault (signed agreements, reports)
/app/distributions - Distribution history and reinvestment options
/app/support - Support ticket system
/app/settings - Profile management and bank account linking
```

### Operations Portal (`/ops/*`)  
**Protected by authentication + internal roles (hidden from unauthorized)**
```
/ops/dashboard - KPI overview and management metrics
/ops/investors - Investor management and onboarding
/ops/properties - Property creation, editing, and management
/ops/reports - Document upload and report management
/ops/distributions - Distribution processing and payment management
/ops/messages - Support ticket administration
/ops/settings - System configuration and user management
```

## Authentication & Authorization

### User Roles
```typescript
enum UserRole {
  VISITOR = 'visitor',
  PROSPECTIVE_INVESTOR = 'prospective_investor', 
  INVESTOR = 'investor',
  PROPERTY_MANAGER = 'property_manager',
  BOARD_MEMBER = 'board_member',
  ADMIN = 'admin',
  SUPPORT = 'support'
}
```

### Access Control
- **Public routes**: Accessible to all users
- **Investor routes**: Require login + investor-level role
- **Ops routes**: Require login + internal role (admin/board/property_manager/support)
- **Hidden protection**: Ops routes return 404 instead of "access denied" to unauthorized users

### Security Features
- JWT-based authentication
- Role-based route protection
- Protected route components
- Automatic token refresh
- Secure logout with token cleanup

## Service Layer Architecture

All backend communication is abstracted through service classes that provide clean APIs for components:

### Core Services
- **authService** - Authentication, registration, role management
- **propertyService** - Property data with access-level filtering  
- **investorService** - Portfolio management, profile, transactions
- **documentService** - Document vault with DocuSign integration hooks
- **distributionService** - Quarterly distributions and reinvestment
- **supportService** - Support ticket system and messaging

### Service Benefits
1. **Clean separation** between UI and data access
2. **Easy testing** with mock implementations  
3. **Future flexibility** to swap backends without UI changes
4. **Type safety** with comprehensive TypeScript interfaces
5. **Consistent patterns** across all data operations

## Data Models & Types

### Key Entities
```typescript
// Authentication
interface User {
  id: string;
  email: string; 
  firstName: string;
  lastName: string;
  role: UserRole;
  onboardingStatus: OnboardingStatus;
}

// Investments
interface Property {
  id: string;
  name: string;
  type: PropertyType;
  status: PropertyStatus; 
  // Public fields always visible
  minimumInvestment: number;
  targetReturn: number;
  // Private fields only for invested users  
  currentValue?: number;
  occupancyRate?: number;
  monthlyIncome?: number;
}

interface Investment {
  id: string;
  userId: string;
  propertyId: string;
  amount: number;
  status: InvestmentStatus;
  reinvestmentElection: boolean;
}

// Operations
interface Distribution {
  id: string;
  propertyId: string;
  userId: string; 
  amount: number;
  quarter: string;
  year: number;
  status: DistributionStatus;
  reinvested: boolean;
}
```

## Backend Integration Strategy

### Architecture Pattern
```
Frontend (React on AWS Amplify/Elastic Beanstalk) → Service Layer → API Backend → AWS RDS (PostgreSQL)
                                                            ↓
                                                  External Integrations
                                        (Auth0, Plaid, Dwolla, DocuSign, DoorLoop, S3)
```

### Design Principles
1. **Frontend**: Presentation logic, user interactions, state management
2. **API Backend**: Business logic, API orchestration, integration workflows
3. **AWS RDS (PostgreSQL)**: Primary database — investor records, transactions, offering data
4. **Auth0**: Authentication, MFA, role-based access control (replaces any mock/demo auth)
5. **AWS S3**: Document storage (signed agreements, K-1s, reports)

### Future API Endpoints
```
Authentication:
POST /api/auth/login
POST /api/auth/register  
GET /api/auth/me
POST /api/auth/refresh

Properties:
GET /api/properties (public view)
GET /api/properties/:id (access-controlled view)
POST /api/properties (admin only)

Investments:
GET /api/investors/:userId/profile
GET /api/investors/:userId/investments  
POST /api/investments (triggers payment + documents)

Documents:
GET /api/documents/user/:userId
POST /api/documents/:id/send-for-signature

Distributions:
GET /api/distributions/user/:userId
POST /api/distributions/runs (admin only)
POST /api/distributions/process-payments (admin only)

Support:
GET /api/support/tickets/user/:userId  
POST /api/support/tickets
POST /api/support/tickets/:id/messages
```

## Integration Placeholders

### DocuSign Integration
**Purpose**: Digital document signing for investment agreements
**Implements**:
- Investment document workflow
- Operating agreement signatures  
- Quarterly report acknowledgments
- Automated envelope creation and tracking
- Webhook processing for status updates

**Backend Endpoints**:
```
POST /api/integrations/docusign/create-envelope
POST /api/integrations/docusign/send-envelope
POST /api/integrations/docusign/webhook
GET /api/integrations/docusign/status/:envelopeId
```

### Plaid Integration  
**Purpose**: Bank account linking and ACH payment processing
**Implements**:
- Secure bank account connection via Plaid Link
- Micro-deposit verification
- Investment funding via ACH debit
- Distribution payments via ACH credit
- Account balance and transaction monitoring

**Backend Endpoints**:
```
POST /api/integrations/plaid/create-link-token
POST /api/integrations/plaid/exchange-public-token  
POST /api/integrations/plaid/verify-microdeposits
POST /api/integrations/plaid/process-ach-payment
POST /api/integrations/plaid/webhook
```

### DoorLoop Integration
**Purpose**: Live property management data (client is already on DoorLoop Premium, ~$200/mo, which includes API access)
**Implements**:
- Property details, financials, and occupancy data feeding investor-portal property cards
- Offering record mapping (property → raise target, minimum investment, timeline, status)

**Backend Endpoints**:
```
GET /api/integrations/doorloop/properties
GET /api/integrations/doorloop/properties/:id
```

### Tax / Accounting Workflow (Open Item)
K-1 and 1099 generation is **not yet assigned to a specific tool** — see Open Item #9 in
`investor-platform-project-document.html`. The client's CPA/accountant will determine the
workflow; the platform's role is limited to storing and surfacing the resulting documents
in the investor Document Center (backed by S3), not generating them.

## Business Logic Implementation

### Key Business Rules
1. **Minimum Investment**: $1,000 per property
2. **Quarterly Distributions**: Automated calculation and processing
3. **Reinvestment Options**: Investor-controlled election per investment  
4. **Access Control**: Sensitive data only visible to invested users
5. **Privacy Protection**: Property addresses never shown to investors
6. **Admin Separation**: Ops portal completely hidden from public

### Investment Workflow
1. **User Registration** → Onboarding workflow
2. **Profile Completion** → Identity verification
3. **Bank Account Linking** → Plaid integration + verification
4. **Property Selection** → Investment amount specification  
5. **Document Signing** → DocuSign workflow
6. **Payment Processing** → ACH debit via Plaid
7. **Investment Confirmation** → Portfolio update + notifications
8. **Ongoing Management** → Quarterly reporting and distributions

### Distribution Workflow  
1. **Property Performance** → Admin input of quarterly metrics
2. **Distribution Calculation** → Automated per-share calculation
3. **Reinvestment Check** → Respect investor elections
4. **Payment Processing** → ACH credits via Plaid
5. **Confirmation & Reporting** → Statements + tax documentation
6. **Accounting Export** → QuickBooks synchronization

## Security & Compliance Considerations

### Data Protection
- Sensitive financial data encryption at rest and in transit
- PII protection with proper access controls
- Audit logging for all financial transactions
- Secure file storage for investment documents

### Regulatory Compliance  
- Securities law compliance (Reg D exemptions)
- Anti-money laundering (AML) procedures
- Know Your Customer (KYC) verification
- Investment suitability documentation
- Regular financial reporting requirements

### Technical Security
- JWT token expiration and refresh
- API rate limiting and DDoS protection  
- Input validation and sanitization
- SQL injection prevention
- XSS protection via Content Security Policy

## Development Workflow

### Current State
✅ Public marketing site live (Vite/React/Wouter on Netlify), portal gated behind `VITE_PORTAL_ENABLED`
✅ Frontend shell with three-tier route structure (public / investor / ops)
✅ Authentication and authorization framework (demo-mode only — not yet real)
✅ Service layer with mock implementations
✅ Type-safe data models and interfaces
✅ Integration placeholders for DocuSign, Plaid, DoorLoop
✅ Sanity CMS schema designed (`/studio`) — not yet wired into the frontend
✅ Responsive UI built on existing design system

### Next Implementation Steps (Phase 1 onward)
1. **Backend Development** on AWS (Amplify or Elastic Beanstalk)
   - REST API implementation
   - AWS RDS (PostgreSQL) schema, replacing the in-memory `server/storage.ts`
   - Auth0 authentication middleware, replacing demo-mode auth in `AuthContext.tsx`
   - Business logic implementation

2. **Integration Development**
   - DocuSign envelope creation and webhook handling
   - Plaid Link + Identity Verification, Dwolla ACH/Mass Pay processing
   - DoorLoop property data sync

3. **Content**
   - Provision the Sanity project (`cd studio && npx sanity@latest init`)
   - Wire `client/src/lib/sanity.ts` into the Team/Properties/Events/FAQ pages

4. **Production Deployment**
   - Environment configuration (see `.env.example`)
   - SSL certificate setup (AWS Certificate Manager)
   - Database migrations
   - Integration testing, then flip `VITE_PORTAL_ENABLED=true`

5. **Legal & Compliance**
   - Operating agreement finalization
   - Investment document templates
   - Regulatory filings and registrations
   - CPA workflow establishment

## Deployment Architecture

### Frontend (Current)
- **Platform**: Netlify (static deployment)
- **Domain**: Custom domain with SSL
- **Build**: Vite with TypeScript compilation
- **Assets**: CDN distribution via Netlify

### Future Backend (Phases 1-5 — see investor-platform-project-document.html Section 05)
- **Platform**: AWS Amplify or Elastic Beanstalk (app hosting + CI/CD)
- **Database**: AWS RDS (PostgreSQL), automated backups, encryption at rest
- **Authentication**: Auth0 — JWT, mandatory MFA, role-based access control
- **File Storage**: AWS S3 for signed agreements, K-1s, investor statements
- **Monitoring**: AWS CloudWatch + Sentry error tracking
- **Integrations**: Plaid (bank linking + identity verification), Dwolla (ACH + Mass Pay
  distributions), DocuSign (agreements), DoorLoop (property data), Postmark/SendGrid
  (transactional email)

### Production Considerations
- **Environment Variables**: Secure secret management
- **Monitoring**: Application performance and error tracking
- **Backup**: Automated database backups and disaster recovery  
- **Scale**: Horizontal scaling capabilities for growth
- **Security**: Regular security audits and penetration testing

---

**Created**: March 2024  
**Last Updated**: March 2024  
**Status**: Frontend Architecture Complete - Ready for Backend Development