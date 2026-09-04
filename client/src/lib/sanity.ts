import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Live Sanity connection for the public site. Schemas: studio/schemaTypes.
// Project ID/dataset come from VITE_SANITY_PROJECT_ID / VITE_SANITY_DATASET
// (see .env.example — set in .env locally, and in Netlify's env vars for production).
// CORS origins (localhost + the production domain) are managed in the Sanity project's
// API settings, not in this codebase.

export const sanityEnabled = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  // CDN is cached and can lag behind edits by a minute or so — fine (and cheaper/faster)
  // in production, but use the live API in dev so new content shows up immediately.
  useCdn: import.meta.env.PROD,
});

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
