import React from 'react';
import { Link } from 'wouter';
import { ChevronDown, ArrowRight, Shield, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Events from "@/components/events";
import MarketUpdatesPreview from "@/components/market-updates-preview";
import Seo from "@/components/Seo";
import heroImage from "@assets/tcgps-hero.jpg";

export default function Home() {
  const handleScrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      const headerHeight = 80;
      const targetPosition = aboutSection.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      <Seo
        title="Treasure Coast Global Property Solutions"
        description="Florida real estate investment group offering strategic property investment opportunities across the Treasure Coast region. Professional management, quarterly distributions, transparent reporting."
        path="/"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,43,91,0.85) 0%, rgba(0,43,91,0.75) 40%, rgba(0,174,239,0.65) 100%), url('${heroImage}')`
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-24 pb-12 md:pt-28 md:pb-16">
          {/* Badge pill */}
          <div className="inline-block mb-6" style={{ background: 'rgba(0,174,239,0.2)', border: '1px solid rgba(0,174,239,0.4)', borderRadius: 9999, padding: '5px 16px' }}>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#7dd3fc' }}>
              Est. 2024 · Stuart, Florida
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Premium Real Estate<br />
            <span className="text-sky-blue">Investment Opportunities</span>
          </h1>

          <p className="text-lg md:text-xl mb-9 max-w-2xl mx-auto leading-relaxed" style={{ color: '#e2e8f0' }}>
            Build wealth through strategic property investments in Florida's thriving Treasure Coast region.
            Professional management, quarterly distributions, and transparent reporting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <Link href="/request-access">
              <Button size="lg" className="bg-sky-blue hover:bg-medium-blue text-white px-7 py-3 text-base font-bold">
                Request Investor Access
              </Button>
            </Link>
            <button
              onClick={handleScrollToAbout}
              className="text-white hover:text-sky-blue transition-colors text-base font-semibold px-7 py-3 rounded-md border border-white/50 hover:border-sky-blue"
            >
              Learn More
            </button>
          </div>

          {/* Stats — frosted glass */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { val: '$1,000', label: 'Minimum Investment' },
              { val: 'Quarterly', label: 'Distributions' },
              { val: 'Professional', label: 'Management' },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl p-5 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)' }}>
                <div className="text-2xl font-bold text-sky-blue mb-1">{val}</div>
                <div className="text-xs" style={{ color: '#cbd5e1' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={handleScrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-sky-blue transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-light-blue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">
              Why Choose Treasure Coast Global Property Solutions?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in identifying and managing high-quality real estate investments 
              in Florida's Treasure Coast, offering accredited and non-accredited investors 
              access to institutional-grade opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-sky-600" />
                </div>
                <CardTitle className="text-navy text-xl">Proven Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Our investment strategy focuses on cash-flowing properties in growing markets, 
                  targeting consistent returns for our investors.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-sky-600" />
                </div>
                <CardTitle className="text-navy text-xl">Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Regular reporting, detailed property analytics, and direct communication 
                  keep you informed about your investments.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-sky-600" />
                </div>
                <CardTitle className="text-navy text-xl">Expert Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Our experienced team handles all aspects of property management, 
                  from acquisition to disposition.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/about">
              <Button variant="outline" size="lg" className="text-navy border-navy hover:bg-navy hover:text-white">
                Learn More About Our Company
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started with real estate investing has never been easier
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-sky-blue text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Create Account</h3>
              <p className="text-gray-600">
                Sign up and complete our simple onboarding process
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-sky-blue text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Browse Properties</h3>
              <p className="text-gray-600">
                Review available investment opportunities with detailed analytics
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-sky-blue text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Invest</h3>
              <p className="text-gray-600">
                Choose your investment amount starting at $1,000
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-sky-blue text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Earn Returns</h3>
              <p className="text-gray-600">
                Receive quarterly distributions and track your portfolio
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/how-it-works">
              <Button size="lg" className="bg-sky-blue hover:bg-medium-blue text-white">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <Events />

      {/* Market Updates Section */}
      <MarketUpdatesPreview />

      {/* CTA Section */}
      <section className="py-20 dark-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Building Wealth?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join our community of investors and start your real estate investment journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request-access">
              <Button size="lg" className="bg-sky-blue hover:bg-sky-600 text-white font-semibold">
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
      </section>
    </div>
  );
}