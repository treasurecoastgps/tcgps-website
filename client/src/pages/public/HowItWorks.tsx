import React from 'react';
import { UserPlus, Search, DollarSign, TrendingUp, FileText, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'wouter';

const faqs = [
  {
    question: "What is the minimum investment amount?",
    answer: "The minimum investment amount is $1,000 per property. This makes our investment opportunities accessible to a wide range of investors."
  },
  {
    question: "How often are distributions made?",
    answer: "Distributions are made quarterly, typically within the first 30 days of each quarter. All distributions are sent directly to your linked bank account."
  },
  {
    question: "Can I reinvest my distributions?",
    answer: "Yes, you can elect to automatically reinvest your quarterly distributions into the same property or other available opportunities."
  },
  {
    question: "What types of properties do you invest in?",
    answer: "We focus on income-producing properties including multi-family apartments, commercial real estate, and single-family home portfolios in Florida's Treasure Coast region."
  },
  {
    question: "How do I track my investments?",
    answer: "Our investor portal provides detailed performance tracking, distribution history, property updates, and document access 24/7."
  },
  {
    question: "Are these investments suitable for retirement accounts?",
    answer: "Many of our investment structures are compatible with self-directed IRAs and other qualified retirement accounts. Consult with your financial advisor for guidance."
  },
  {
    question: "What are the tax implications?",
    answer: "You will receive annual K-1 tax documents for partnership interests. We recommend consulting with a tax professional regarding your specific situation."
  },
  {
    question: "How liquid are these investments?",
    answer: "Real estate investments are generally illiquid. Investment terms vary by property but typically range from 3-7 years with limited early exit options."
  }
];

export default function HowItWorks() {
  return (
    <div>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-navy mb-6">How Real Estate Investing Works</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with professional real estate investing in just four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-8 w-8 text-sky-600" />
                </div>
                <CardTitle className="text-navy">1. Create Account</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Sign up and complete our simple onboarding process. Verify your identity and investment eligibility.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-sky-600" />
                </div>
                <CardTitle className="text-navy">2. Review Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Browse available investment opportunities with detailed financial projections and property analysis.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-sky-600" />
                </div>
                <CardTitle className="text-navy">3. Invest</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Choose your investment amount starting at $1,000. Complete legal documents and fund your investment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-sky-600" />
                </div>
                <CardTitle className="text-navy">4. Earn Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Receive quarterly distributions and track your portfolio performance through our investor portal.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">Investment Process Details</h2>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-2">Documentation & Legal</h3>
                  <p className="text-gray-600">
                    All investments are structured through limited liability companies (LLCs) with comprehensive
                    operating agreements. Digital document signing via DocuSign streamlines the process.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-2">Funding & Payments</h3>
                  <p className="text-gray-600">
                    Secure bank account linking and payment processing. Quarterly distributions are sent
                    directly to your linked bank account with detailed statements.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-2">Ongoing Management</h3>
                  <p className="text-gray-600">
                    Professional property management, regular reporting, and transparent communication
                    throughout the investment lifecycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-light-blue">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Common questions about real estate investing with Treasure Coast Global Property Solutions.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-0 rounded-lg px-6 bg-white shadow-sm">
                <AccordionTrigger className="text-left text-lg font-semibold text-navy hover:text-sky-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Ready to Get Started CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-navy text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community of investors building wealth through real estate.
            </p>
            <div className="space-x-4">
              <Link href="/request-access">
                <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
                  Request Investor Access
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-navy">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
