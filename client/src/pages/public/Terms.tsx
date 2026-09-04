import React from 'react';
import { Link } from 'wouter';
import Seo from '@/components/Seo';

export default function Terms() {
  return (
    <div className="py-20">
      <Seo
        title="Terms of Service"
        description="Terms of Service for Treasure Coast Global Property Solutions."
        path="/terms"
      />

      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-navy mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-12">Last updated: September 2, 2026</p>

        <div className="prose max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">1. Acceptance of Terms</h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of
              treasurecoastgps.com (the "Site"), operated by Treasure Coast Global Property
              Solutions LLC ("Company," "we," "us"). By using the Site, you agree to these Terms. If
              you do not agree, do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">2. Informational Site — Not an Offer</h2>
            <p>
              Content on this Site, including any description of the Company, its properties, or its
              investment approach, is provided for general informational purposes only. Nothing on
              this Site constitutes an offer to sell, or a solicitation of an offer to buy, any
              security. Any such offer will only be made through definitive offering documents
              (including a Private Placement Memorandum, subscription agreement, and related
              disclosures) provided directly to qualified prospective investors with whom the Company
              has a pre-existing relationship, consistent with Rule 506(b) of Regulation D under the
              Securities Act of 1933.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">3. Investor Access Requests</h2>
            <p>
              Submitting a contact form or an investor access request does not create any right to
              invest, and does not obligate the Company to extend an invitation. All prospective
              investors are subject to the Company's internal review process, including confirmation
              of a pre-existing substantive relationship where required by applicable securities law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">4. No Investment, Legal, or Tax Advice</h2>
            <p>
              Nothing on this Site is intended as investment, legal, accounting, or tax advice. You
              should consult your own advisors before making any investment decision. Real estate
              investments involve risk, including the possible loss of principal — see our{' '}
              <Link href="/disclaimer" className="text-sky-blue hover:text-medium-blue">
                Investment Risk Disclaimer
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">5. Intellectual Property</h2>
            <p>
              All content on the Site, including text, graphics, logos, and images, is the property
              of the Company or its licensors and is protected by applicable intellectual property
              laws. You may not reproduce, distribute, or create derivative works from Site content
              without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">6. Disclaimer of Warranties; Limitation of Liability</h2>
            <p>
              The Site is provided "as is" without warranties of any kind, express or implied. To the
              fullest extent permitted by law, the Company disclaims all liability for any damages
              arising from your use of, or inability to use, the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">7. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Florida, without regard to its
              conflict-of-laws principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">8. Contact Us</h2>
            <p>
              Questions about these Terms can be directed to{' '}
              <a href="mailto:info@treasurecoastglobal.com" className="text-sky-blue hover:text-medium-blue">
                info@treasurecoastglobal.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
