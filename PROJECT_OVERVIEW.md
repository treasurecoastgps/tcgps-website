# Project Overview — Treasure Coast Global Property Solutions

## Overview

This is a full-stack web application for Treasure Coast Global Property Solutions, a
Florida-based real estate investment LLC (with a long-term goal of REIT status)
established in 2024. The application serves as the public marketing site — mission,
properties, events, and team — with a separate, currently feature-flagged-off investor
portal scaffold for future phases. See `PLATFORM_ARCHITECTURE.md` for the full
architecture and `investor-platform-project-document.html` for the authoritative stack
decisions and launch plan.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom brand color scheme
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js (local dev — `server/`) and Netlify Functions
  (production — `netlify/functions/`), serving the same sample data
- **Language**: TypeScript (ESM modules)
- **Database**: PostgreSQL with Drizzle ORM (schema defined, not yet provisioned —
  `server/storage.ts` currently uses an in-memory store)
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **API**: REST API with JSON responses
- **Development**: Hot module replacement via Vite integration

### Brand Design System
- **Primary Colors**:
  - Navy Blue (#002B5B)
  - Sky Blue (#00AEEF)
  - Medium Blue (#1B75BC)
  - White (#FFFFFF)
  - Light Gray/Blue (#EAF6FB)
  - Green Accent (#2CA85C)

## Key Components

### Database Schema
Located in `shared/schema.ts` with the following tables:
- **users**: Basic user management
- **contactSubmissions**: Contact form submissions with investor interest tracking
- **properties**: Real estate portfolio with status, type, and value information
- **events**: Investor meetings and educational events
- **teamMembers**: Leadership team profiles with social links

### API Endpoints
- `POST /api/contact` - Submit contact form (still live — used by Contact and Request
  Access pages)
- `GET /api/contact` - Retrieve contact submissions (admin)
- `GET /api/properties`, `GET /api/properties/:id`, `GET /api/events`, `GET /api/team` -
  legacy REST endpoints, no longer called by the frontend (Properties, Events, and Team
  content now come from Sanity — see below). Left in place rather than deleted; harmless
  either way.

### Content sources
- **Sanity CMS** (`client/src/lib/sanity.ts`, project/dataset via
  `VITE_SANITY_PROJECT_ID`/`VITE_SANITY_DATASET`) now feeds: Team (embedded in the About
  page), Properties, Events (homepage preview), and Market Updates (list + individual
  post pages). Schemas: `studio/schemaTypes`.
- **REST/in-memory** (`server/storage.ts`, `netlify/functions/*`) still backs the Contact
  and Request Access forms only.

### Routes & Pages (`client/src/pages/public/`, routed via `PublicLayout`)
- **Home**: Hero, About preview, How It Works, upcoming Events (Sanity), Market Updates
  preview (Sanity), CTA
- **About**: Mission, approach, and the Leadership Team section (`TeamSection`
  component, Sanity-backed) — there is no separate `/team` page
- **How It Works**: Investment process steps, plus an FAQ accordion section at the
  bottom (before the closing CTA) — there is no separate `/faq` page
- **Properties**: General portfolio showcase, Sanity-backed — deliberately excludes
  deal-specific financials (target return, raise total, funding progress) per Reg D
  506(b) no-general-solicitation guidance; see the note at the top of that file
- **Market Updates** (`/market-updates`) and **Market Update Post**
  (`/market-updates/:slug`): Sanity-backed list + individual post pages, rendered with
  `@portabletext/react`
- **Contact**: General contact form (wired to `POST /api/contact`)
- **Request Access**: Dedicated investor access request form (name, email, phone,
  investment range, relationship to firm) — wired to the same endpoint, tagged
  `[Investor Access Request]` in the message for admin filtering
- **Privacy / Terms / Disclaimer**: Legal pages (drafted boilerplate — needs attorney
  review before the firm accepts real investor funds)
- **Portal Coming Soon**: Shown in place of `/login`, `/register`, `/app/*` whenever
  `VITE_PORTAL_ENABLED` is not `"true"` (`/ops/*` renders a bare 404 instead, to avoid
  revealing the admin portal exists)

The investor (`/app/*`) and ops (`/ops/*`) portals are a separate, still-demo-data
three-tier scaffold — see `PLATFORM_ARCHITECTURE.md` for their route structure and
`client/src/lib/featureFlags.ts` for the launch gate.

## Data Flow

1. **Client Requests**: React components use React Query to fetch data
2. **API Layer**: Express.js handles REST endpoints with validation
3. **Database**: Drizzle ORM manages PostgreSQL operations
4. **Storage**: In-memory storage class for development, with database integration ready
5. **Forms**: Contact submissions validated with Zod schemas and stored in database

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: drizzle-orm with drizzle-zod for type-safe database operations
- **UI Library**: @radix-ui components for accessibility
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React icons
- **Date Handling**: date-fns for date formatting

### Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Database Migrations**: Drizzle Kit for schema management
- **Development**: tsx for TypeScript execution

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations apply schema changes

### Environment Configuration
- **Development**: `NODE_ENV=development` with hot reloading
- **Production**: `NODE_ENV=production` with optimized builds
- **Database**: `DATABASE_URL` environment variable required (see `.env.example`)

### Scripts
- `npm run dev` - Vite dev server only (frontend, no API — use for pure UI work)
- `npm run dev:server` - Express + Vite middleware, serving frontend and API together
  on one port (`PORT`, default 5000) — use this for full local functional testing
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run db:push` - Apply database schema changes

### Hosting Requirements
- Production target: Netlify (static site + serverless functions) — see
  `netlify.toml` and `README-NETLIFY.md`
- Node.js environment for local development
- PostgreSQL database (Neon recommended) once the backend phases begin
- Environment variables for database connection

The application uses a monorepo structure with shared TypeScript types and schemas,
enabling type safety across the full stack while maintaining clear separation between
client and server code.
