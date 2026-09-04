import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { sanityClient, urlForImage } from '@/lib/sanity';
import Seo from '@/components/Seo';

// NOTE: This is the PUBLIC portfolio showcase. Per compliance guidance (Reg D Rule 506(b)
// prohibits general solicitation), deal-specific financials — target returns, raise totals,
// funding progress — must never appear here. That data belongs exclusively to the
// invitation-only investor portal (/app/properties) once a visitor has been approved and
// onboarded. This page only shows general, non-solicitous portfolio information, matching
// the `property` schema in studio/schemaTypes/property.ts (which has no financial fields).
interface SanityProperty {
  _id: string;
  name: string;
  city: string;
  state?: string;
  propertyType: string;
  status: string;
  heroImage?: { asset?: { _ref: string } };
  description?: string;
}

const PROPERTIES_QUERY = `*[_type == "property"] | order(order asc) {
  _id, name, city, state, propertyType, status, heroImage, description
}`;

export default function Properties() {
  const { data: properties, isLoading, error } = useQuery<SanityProperty[]>({
    queryKey: ['sanity', 'properties'],
    queryFn: () => sanityClient.fetch(PROPERTIES_QUERY),
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'In Operation':
        return 'bg-green-accent/10 text-green-accent';
      case 'Under Review':
        return 'bg-yellow-500/10 text-yellow-600';
      case 'Planning':
      case 'Coming Soon':
        return 'bg-blue-500/10 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="py-20">
      <Seo
        title="Our Portfolio"
        description="A general overview of Treasure Coast Global Property Solutions' real estate portfolio across Florida's Treasure Coast region."
        path="/properties"
      />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-navy mb-6">Our Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A general overview of properties across Florida's Treasure Coast region. Detailed
            financials, projected returns, and funding status are shared privately with approved
            investors during onboarding.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
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
          <p className="text-center text-red-600">Failed to load properties. Please try again later.</p>
        )}

        {properties && properties.length === 0 && (
          <p className="text-center text-gray-500">Portfolio properties are being updated — check back soon.</p>
        )}

        {properties && properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => {
              const imageUrl = property.heroImage
                ? urlForImage(property.heroImage).width(800).height(600).fit('crop').url()
                : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=600';

              return (
                <Card key={property._id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={imageUrl}
                    alt={property.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{property.propertyType}</Badge>
                      <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2">{property.name}</h3>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-medium-blue" />
                      {property.city}{property.state ? `, ${property.state}` : ''}
                    </p>
                    {property.description && (
                      <p className="text-gray-600 text-sm">{property.description}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="text-center mt-16 bg-gray-50 rounded-lg p-10">
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Property-level financial details, target returns, and investment availability are
            shared privately with approved investors — not published publicly.
          </p>
          <Link href="/request-access">
            <Button size="lg" className="bg-navy hover:bg-sky-blue text-white">
              Request Investor Access <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
