import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_NAME, absoluteUrl } from '@/lib/seo';

interface SeoProps {
  /** Page-specific title. The site name is appended automatically unless already present. */
  title: string;
  description: string;
  /** Path only, e.g. "/about" — used to build the canonical URL and og:url. */
  path: string;
  /** Absolute image URL. Defaults to the site-wide social share image. */
  image?: string;
  /** og:type — defaults to "website"; use "article" for Market Update posts. */
  type?: 'website' | 'article';
  /** Keep this page out of search results (Coming Soon placeholders, 404, etc.). */
  noindex?: boolean;
  /** One or more JSON-LD structured data objects to inject as <script type="application/ld+json">. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export default function Seo({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const ogImage = image || absoluteUrl('/og-image.png');
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, i) => (
        // eslint-disable-next-line react/no-danger
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
