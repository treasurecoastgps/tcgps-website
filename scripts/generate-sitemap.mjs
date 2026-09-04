// Generates dist/public/sitemap.xml after the Vite build, including dynamic Market
// Update post URLs pulled from Sanity — otherwise blog content is only discoverable via
// internal links, never via sitemap. Deliberately fails soft: if Sanity is unreachable
// (bad env var, network hiccup during a Netlify build) this logs a warning and falls
// back to the static routes only, rather than failing the whole site build over a
// sitemap. Run as part of `npm run build` (see package.json).
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';

const SITE_URL = 'https://treasurecoastgps.com';
const OUT_DIR = path.resolve(process.cwd(), 'dist', 'public');
const OUT_FILE = path.join(OUT_DIR, 'sitemap.xml');

// Local dev convenience: Netlify's build environment already has these as real env
// vars (set in the dashboard), but a local `npm run build` needs the root .env loaded.
function loadDotEnvIfPresent() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!match) continue;
    const [, key, rawValue = ''] = match;
    if (!(key in process.env)) {
      process.env[key] = rawValue.replace(/^["']|["']$/g, '');
    }
  }
}
loadDotEnvIfPresent();

const STATIC_ROUTES = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/how-it-works', changefreq: 'monthly', priority: '0.8' },
  { loc: '/properties', changefreq: 'weekly', priority: '0.8' },
  { loc: '/market-updates', changefreq: 'weekly', priority: '0.7' },
  { loc: '/contact', changefreq: 'yearly', priority: '0.6' },
  { loc: '/request-access', changefreq: 'yearly', priority: '0.6' },
  { loc: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
  { loc: '/disclaimer', changefreq: 'yearly', priority: '0.3' },
];

async function fetchMarketUpdateRoutes() {
  const projectId = process.env.VITE_SANITY_PROJECT_ID;
  const dataset = process.env.VITE_SANITY_DATASET || 'production';
  if (!projectId) {
    console.warn('[sitemap] VITE_SANITY_PROJECT_ID not set — skipping Market Update URLs.');
    return [];
  }

  const client = createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: false });
  const posts = await client.fetch(
    `*[_type == "marketUpdate" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
  );

  return posts.map((post) => ({
    loc: `/market-updates/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: post.publishedAt ? post.publishedAt.slice(0, 10) : undefined,
  }));
}

function buildXml(routes) {
  const urls = routes
    .map((r) => {
      const lastmod = r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : '';
      return `  <url><loc>${SITE_URL}${r.loc}</loc>${lastmod}<changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  let dynamicRoutes = [];
  try {
    dynamicRoutes = await fetchMarketUpdateRoutes();
    console.log(`[sitemap] Found ${dynamicRoutes.length} Market Update post(s).`);
  } catch (err) {
    console.warn('[sitemap] Failed to fetch Market Update slugs from Sanity — falling back to static routes only.');
    console.warn(`[sitemap] ${err instanceof Error ? err.message : err}`);
  }

  const xml = buildXml([...STATIC_ROUTES, ...dynamicRoutes]);

  if (!fs.existsSync(OUT_DIR)) {
    console.warn(`[sitemap] Build output directory ${OUT_DIR} does not exist yet — skipping write.`);
    return;
  }
  fs.writeFileSync(OUT_FILE, xml, 'utf8');
  console.log(`[sitemap] Wrote ${OUT_FILE} with ${STATIC_ROUTES.length + dynamicRoutes.length} URLs.`);
}

main().catch((err) => {
  // Never fail the build over the sitemap.
  console.warn('[sitemap] Unexpected error generating sitemap — continuing without it.');
  console.warn(err);
});
