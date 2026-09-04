import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sanityClient, urlForImage } from "@/lib/sanity";

interface SanityMarketUpdate {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  coverImage?: { asset?: { _ref: string } };
}

const LATEST_UPDATES_QUERY = `*[
  _type == "marketUpdate"
  && defined(slug.current)
] | order(publishedAt desc) [0...3] {
  _id, title, slug, publishedAt, excerpt, coverImage
}`;

export default function MarketUpdatesPreview() {
  const { data: posts, isLoading, error } = useQuery<SanityMarketUpdate[]>({
    queryKey: ['sanity', 'latestMarketUpdates'],
    queryFn: () => sanityClient.fetch(LATEST_UPDATES_QUERY),
  });

  if (isLoading || error || !posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy mb-6">Latest Market Updates</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            News and insights from the Treasure Coast Global Property Solutions team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const imageUrl = post.coverImage
              ? urlForImage(post.coverImage).width(800).height(450).fit('crop').url()
              : null;

            return (
              <Link key={post._id} href={`/market-updates/${post.slug.current}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
                  {imageUrl && (
                    <img src={imageUrl} alt={post.title} className="w-full h-44 object-cover" />
                  )}
                  <CardContent className="p-6">
                    <p className="text-sm text-medium-blue font-medium mb-2">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                    <h3 className="text-lg font-bold text-navy mb-2">{post.title}</h3>
                    {post.excerpt && <p className="text-gray-600 text-sm">{post.excerpt}</p>}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/market-updates">
            <Button className="bg-navy hover:bg-sky-blue text-white">
              View All Updates <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
