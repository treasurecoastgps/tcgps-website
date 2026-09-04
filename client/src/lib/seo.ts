// Single source of truth for the production domain — used by the <Seo> component,
// the sitemap generator, and structured data. Update here if the domain ever changes.
export const SITE_URL = 'https://treasurecoastgps.com';
export const SITE_NAME = 'Treasure Coast Global Property Solutions';

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
