import React from 'react';
import { Link, useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { ArrowLeft } from 'lucide-react';
import { sanityClient, urlForImage } from '@/lib/sanity';

interface SanityMarketUpdatePost {
  _id: string;
  title: string;
  publishedAt: string;
  excerpt?: string;
  coverImage?: { asset?: { _ref: string } };
  authorName?: string;
  body?: any[];
}

const POST_QUERY = `*[_type == "marketUpdate" && slug.current == $slug][0]{
  _id, title, publishedAt, excerpt, coverImage, body, "authorName": author->name
}`;

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={urlForImage(value).width(1000).url()}
        alt=""
        className="rounded-lg my-6 w-full"
      />
    ),
  },
};

export default function MarketUpdatePost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<SanityMarketUpdatePost | null>({
    queryKey: ['sanity', 'marketUpdate', slug],
    queryFn: () => sanityClient.fetch(POST_QUERY, { slug }),
    enabled: Boolean(slug),
  });

  const coverUrl = post?.coverImage
    ? urlForImage(post.coverImage).width(1200).height(630).fit('crop').url()
    : null;

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/market-updates" className="inline-flex items-center text-medium-blue hover:text-sky-blue mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Market Updates
        </Link>

        {isLoading && (
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-gray-200 rounded-lg" />
            <div className="h-8 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        )}

        {error && (
          <p className="text-red-600">Failed to load this update. Please try again later.</p>
        )}

        {!isLoading && !error && !post && (
          <div>
            <h1 className="text-3xl font-bold text-navy mb-4">Update not found</h1>
            <p className="text-gray-600">This market update may have been unpublished or moved.</p>
          </div>
        )}

        {post && (
          <article>
            {coverUrl && (
              <img src={coverUrl} alt={post.title} className="w-full rounded-xl mb-8 aspect-video object-cover" />
            )}
            <p className="text-sm text-medium-blue font-medium mb-2">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
              {post.authorName ? ` · ${post.authorName}` : ''}
            </p>
            <h1 className="text-4xl font-bold text-navy mb-8">{post.title}</h1>
            <div className="prose prose-lg max-w-none">
              {Array.isArray(post.body) && (
                <PortableText value={post.body} components={portableTextComponents} />
              )}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
