import React from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';

export default function PortalComingSoon() {
  // Rendered at multiple URLs (/login, /register, /app/*) — noindex so none of these
  // placeholder duplicates get indexed, and use the real current path for canonical/og:url.
  const [location] = useLocation();

  return (
    <div className="py-24 min-h-[70vh] flex items-center bg-light-blue">
      <Seo
        title="Investor Portal — Coming Soon"
        description="The Treasure Coast Global Property Solutions investor portal is coming soon."
        path={location}
        noindex
      />

      <div className="container mx-auto px-4 max-w-xl text-center">
        <div className="w-16 h-16 bg-sky-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="h-8 w-8 text-sky-blue" />
        </div>
        <h1 className="text-4xl font-bold text-navy mb-4">Investor Portal — Coming Soon</h1>
        <p className="text-xl text-gray-600 mb-10">
          We're putting the finishing touches on our secure investor portal. In the meantime,
          request investor access and our team will reach out directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/request-access">
            <Button size="lg" className="bg-sky-blue hover:bg-medium-blue text-white">
              Request Investor Access <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
