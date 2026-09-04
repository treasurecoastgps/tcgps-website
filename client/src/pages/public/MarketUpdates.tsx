import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { sanityClient, urlForImage } from '@/lib/sanity';

interface SanityMarketUpdate {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  coverImage?: { asset?: { _ref: string } };
  authorName?: string;
}

const UPDATES_QUERY = `*[
  _type == "marketUpdate"
  && defined(slug.current)
] | order(publishedAt desc) {
  _id, title, slug, publishedAt, excerpt, coverImage, "authorName": author->name
}`;

export default function MarketUpdates() {
  const { data: posts, isLoading, error } = useQuery<SanityMarketUpdate[]>({
    queryKey: ['sanity', 'marketUpdates'],
    queryFn: () => sanityClient.fetch(UPDATES_QUERY),
  });

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-navy mb-6">Market Updates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            News, market insights, and updates from the Treasure Coast Global Property Solutions team.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse overflow-hidden">
                <div className="h-48 bg-gray-200" />
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-6 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-600">Failed to load market updates. Please try again later.</p>
        )}

        {posts && posts.length === 0 && (
          <p className="text-center text-gray-500">No market updates published yet — check back soon.</p>
        )}

        {posts && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const imageUrl = post.coverImage
                ? urlForImage(post.coverImage).width(800).height(450).fit('crop').url()
                : null;

              return (
                <Link key={post._id} href={`/market-updates/${post.slug.current}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
                    {imageUrl && (
                      <img src={imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                    )}
                    <CardContent className="p-6">
                      <p className="text-sm text-medium-blue font-medium mb-2">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'long', day: 'numeric',
                        })}
                        {post.authorName ? ` · ${post.authorName}` : ''}
                      </p>
                      <h3 className="text-xl font-bold text-navy mb-2">{post.title}</h3>
                      {post.excerpt && <p className="text-gray-600 text-sm">{post.excerpt}</p>}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
