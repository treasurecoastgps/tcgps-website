import React from 'react';

export default function RiskDisclaimer() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-navy mb-2">Investment Risk Disclaimer</h1>
        <p className="text-gray-500 mb-12">Last updated: September 2, 2026</p>

        <div className="prose max-w-none text-gray-700 space-y-8">
          <section className="bg-light-blue border-l-4 border-sky-blue p-6 rounded">
            <p className="font-semibold text-navy mb-0">
              Real estate investing involves substantial risk, including the possible loss of your
              entire principal investment. Past performance is not indicative of future results.
              Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">Private Placement — Not Registered</h2>
            <p>
              Investment opportunities offered by Treasure Coast Global Property Solutions LLC are
              conducted as private placements under Rule 506(b) of Regulation D of the Securities Act
              of 1933. These offerings are not registered with the U.S. Securities and Exchange
              Commission or any state securities regulator, and are made available only to persons
              with whom the Company has a pre-existing, substantive relationship, in accordance with
              applicable exemptions from registration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">Key Risks</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Illiquidity.</strong> Real estate investments are generally illiquid. There is no public market for these securities, and you should be prepared to hold your investment for an extended period with limited or no ability to exit early.</li>
              <li><strong>Market and Property Risk.</strong> Property values and rental income can be affected by local market conditions, interest rates, natural disasters, and broader economic conditions.</li>
              <li><strong>No Guaranteed Returns.</strong> Projected or targeted returns, if presented to qualified prospective investors in offering documents, are estimates only and are not guaranteed. Actual results may differ materially.</li>
              <li><strong>Leverage.</strong> Properties may be financed with debt, which can amplify both gains and losses.</li>
              <li><strong>Limited Diversification.</strong> Each offering is generally tied to a specific property or small group of properties, which concentrates risk relative to a broadly diversified fund.</li>
              <li><strong>Tax Complexity.</strong> Investors may receive K-1 tax forms and should consult a qualified tax advisor regarding the implications of any investment.</li>
              <li><strong>Reliance on Management.</strong> Investors have limited or no control over day-to-day property and investment decisions, which are made by Company management.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">Suitability</h2>
            <p>
              These investments are not suitable for all investors. You should only consider investing
              an amount you can afford to lose, and should independently evaluate whether an
              investment is consistent with your financial situation, investment objectives, and risk
              tolerance — ideally in consultation with independent legal, tax, and financial advisors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">No Advice</h2>
            <p>
              Nothing on this website should be construed as investment, legal, or tax advice. The
              Company is not acting as your fiduciary in connection with any general information
              provided on this Site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
