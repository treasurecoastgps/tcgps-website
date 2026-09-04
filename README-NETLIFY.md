# Netlify Deployment Setup

This project has been configured for deployment on Netlify as a static site with serverless functions.

## What's Been Configured

### 1. Netlify Functions

- **Properties API**: `netlify/functions/properties.ts` - Serves property data
- **Events API**: `netlify/functions/events.ts` - Serves event data
- **Team API**: `netlify/functions/team.ts` - Serves team member data
- **Contact API**: `netlify/functions/contact.ts` - Handles contact form submissions

### 2. Build Configuration

- **Build Command**: `npm run build`
- **Publish Directory**: `dist/public`
- **Functions Directory**: `netlify/functions`

### 3. API Redirects

All `/api/*` routes are automatically redirected to the corresponding Netlify Functions:

- `/api/properties` → `/.netlify/functions/properties`
- `/api/events` → `/.netlify/functions/events`
- `/api/team` → `/.netlify/functions/team`
- `/api/contact` → `/.netlify/functions/contact`

### 4. SPA Routing

All other routes are redirected to `index.html` to support client-side routing.

## Manual Deployment Steps

1. **Build the project locally** (optional, for testing):

   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:

   - Drag and drop the entire project folder to Netlify's deploy interface
   - Or connect your Git repository to Netlify for automatic deployments

3. **Netlify will automatically**:
   - Install dependencies with `npm install`
   - Build the project with `npm run build`
   - Deploy the static files from `dist/public`
   - Set up the serverless functions from `netlify/functions`

## Key Files for Netlify

- `netlify.toml` - Netlify configuration
- `netlify/functions/*.ts` - Serverless API functions
- `package.json` - Build scripts and dependencies
- `vite.config.ts` - Build configuration (cleaned for production)

## Troubleshooting

### API Sections Not Loading

If the "Our Portfolio", "Upcoming Events", or "Leadership Team" sections show loading states or errors:

1. **Check Function Deployment**: Visit `https://your-site.netlify.app/api/test` to verify functions are working
2. **Check Browser Console**: Look for CORS or network errors in developer tools
3. **Verify Redirects**: Ensure `/api/*` routes are redirecting to `/.netlify/functions/*`

### Recent Fixes Applied

- ✅ Added proper TypeScript interfaces to all functions
- ✅ Fixed CORS headers for cross-origin requests
- ✅ Added missing `investmentInterest` field to contact function
- ✅ Added test endpoint at `/api/test` for debugging
- ✅ **CRITICAL FIX**: Removed `credentials: "include"` from fetch requests
- ✅ **CRITICAL FIX**: Updated query client to use proper headers for Netlify

If the API sections fail after deployment, hit `/api/test` directly and check the
browser console/Network tab for the failing request.

## Notes

- The original Express server is not needed for Netlify deployment
- All data is currently stored in-memory within the functions (for demo purposes)
- In production, you would connect the functions to a database
- Contact form submissions are stored temporarily in function memory
- Functions include proper TypeScript types and error handling
