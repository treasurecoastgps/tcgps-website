import React from 'react';
import Seo from '@/components/Seo';

export default function Privacy() {
  return (
    <div className="py-20">
      <Seo
        title="Privacy Policy"
        description="Privacy Policy for Treasure Coast Global Property Solutions."
        path="/privacy"
      />

      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-navy mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Last updated: September 2, 2026</p>

        <div className="prose max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">1. Overview</h2>
            <p>
              Treasure Coast Global Property Solutions LLC ("Company," "we," "us," or "our") respects
              your privacy. This Privacy Policy explains what information we collect through
              treasurecoastgps.com (the "Site"), how we use it, and the choices available to you.
              This policy covers the public marketing Site only. Separate, more detailed disclosures
              govern information collected during investor onboarding, identity verification, and the
              investor portal once an individual becomes an approved investor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">2. Information We Collect</h2>
            <p>Through the public Site, we collect information you voluntarily provide, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Contact details submitted through our contact and investor access request forms (name, email, phone number, investment range, and any message you provide)</li>
              <li>Standard technical information collected automatically, such as browser type, device information, and pages visited, via server logs and analytics</li>
            </ul>
            <p>
              We do not collect Social Security numbers, government ID, or bank account information
              through the public Site. That information is only ever collected later, from approved
              investors, through the secure investor onboarding portal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">3. How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To respond to inquiries and requests for investor access</li>
              <li>To evaluate whether a pre-existing relationship exists prior to extending an investor onboarding invitation, consistent with our private placement compliance obligations</li>
              <li>To send administrative communications about our company, properties, and events</li>
              <li>To improve the Site and understand how visitors use it</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">4. Sharing of Information</h2>
            <p>
              We do not sell your personal information. We may share information with service
              providers who help us operate the Site and our business (such as email delivery and
              hosting providers), or when required by law, regulation, or legal process, including
              disclosures made to regulators in connection with our securities compliance obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">5. Data Retention</h2>
            <p>
              We retain contact and inquiry information for as long as reasonably necessary to
              respond to your request and to satisfy legal, accounting, and compliance obligations
              tied to our private placement offerings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">6. Your Choices</h2>
            <p>
              You may request to review, correct, or delete the personal information you have
              submitted through the Site by contacting us at the email address below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">7. Contact Us</h2>
            <p>
              Questions about this Privacy Policy can be directed to{' '}
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
