# Netlify Deployment Guide

This site deploys via GitHub — Netlify builds directly from the connected repo, which
properly compiles the TypeScript Netlify Functions. (An earlier manual drag-and-drop
deployment path, which needed hand-transpiled `.js` copies of each function, has been
retired along with those `.js` files — GitHub deployment is the only supported path now.)

## Steps for GitHub Deployment

1. **Push to GitHub** (already done if you're reading this post-setup):

   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**:

   - Go to [Netlify](https://netlify.com) and sign in
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build settings should auto-detect from `netlify.toml`:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist/public`
     - **Functions directory**: `netlify/functions`

3. **Set environment variables** in Netlify's Site settings → Environment variables
   (these are gitignored, so they won't come from the repo — see `.env.example` for the
   full list):
   - `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`
   - `VITE_PORTAL_ENABLED` (leave unset/`false` until the investor portal backend is live)

4. **Deploy**: Netlify will automatically build and deploy on every push to the
   connected branch.

5. **Add the Netlify domain to Sanity's CORS origins** (sanity.io/manage → project →
   API → CORS Origins) — otherwise Team/Properties/Events/Market Updates will fail to
   load in production with a CORS error, the same way they did locally before
   `localhost:5000` was added.

## Testing Your Deployment

After deployment, test these endpoints:

- `https://your-site.netlify.app/api/test` - Should return success message
- `https://your-site.netlify.app/api/properties` - Legacy REST endpoint (unused by the
  frontend now — Properties/Events/Team pull from Sanity — but still functional)
- `https://your-site.netlify.app/api/contact` - Used by the Contact and Request Access forms

## Troubleshooting

1. Check Netlify function logs in your dashboard
2. Verify build logs for TypeScript compilation errors
3. Ensure all dependencies are properly installed
4. Check that functions are deployed in the Functions tab
5. If Sanity-backed content (Team/Properties/Events/Market Updates) fails to load, check
   the browser console for a CORS error first — see step 5 above

## Key Files for Deployment

- `netlify.toml` - Configuration and redirects
- `netlify/functions/*.ts` - Serverless API functions (contact form; legacy
  properties/events/team REST endpoints)
- `package.json` - Build scripts and dependencies
- `.env.example` - Documents every environment variable the app uses

## Expected Results

After successful deployment:

- ✅ Public site loads with real content from Sanity (Team, Properties, Events, Market Updates)
- ✅ Contact form and Investor Access Request form submissions work
- ✅ Investor portal routes (`/app/*`, `/ops/*`, `/login`, `/register`) show "Coming Soon"
  unless `VITE_PORTAL_ENABLED=true` is set
