import React from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PORTAL_ENABLED } from '@/lib/featureFlags';
import logoPath from '@assets/tcgps-icon.png';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Properties', href: '/properties' },
    { name: 'Market Updates', href: '/market-updates' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <img src={logoPath} alt="Treasure Coast Logo" className="w-10 h-10" />
                <div>
                  <h1 className="text-navy font-bold text-lg">Treasure Coast</h1>
                  <p className="text-medium-blue text-sm font-medium">Global Property Solutions</p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <button 
                    className={`transition-colors font-medium ${
                      location === item.href 
                        ? 'text-sky-blue' 
                        : 'text-navy hover:text-sky-blue'
                    }`}
                  >
                    {item.name}
                  </button>
                </Link>
              ))}
              <div className="flex items-center space-x-3">
                {PORTAL_ENABLED ? (
                  <>
                    <Link href="/login">
                      <Button variant="outline" size="sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button size="sm">
                        Get Started
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/request-access">
                    <Button size="sm">
                      Request Investor Access
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-navy" />
              ) : (
                <Menu className="h-6 w-6 text-navy" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
              <div className="pt-4 space-y-3">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                        location === item.href
                          ? 'bg-sky-50 text-sky-blue'
                          : 'text-navy hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </button>
                  </Link>
                ))}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  {PORTAL_ENABLED ? (
                    <>
                      <Link href="/login">
                        <Button variant="outline" size="sm" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button size="sm" className="w-full">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link href="/request-access">
                      <Button size="sm" className="w-full">
                        Request Investor Access
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src={logoPath} alt="Treasure Coast Logo" className="w-10 h-10" />
                <div>
                  <h3 className="text-white font-bold text-lg">Treasure Coast</h3>
                  <p className="text-sky-blue text-sm font-medium">Global Property Solutions</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Professional real estate investment opportunities in Florida's Treasure Coast region. 
                Building wealth through strategic property investments.
              </p>
              <p className="text-sm text-gray-400">
                © 2024 Treasure Coast Global Property Solutions LLC. All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>1650 S Kanner Hwy Ste 313<br />Stuart, FL 34994</p>
                <p>info@treasurecoastglobal.com</p>
                <p>(772) 555-0123</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                Investment opportunities subject to risk. Past performance does not guarantee future results.
              </p>
              <p className="text-gray-400 text-sm space-x-2">
                <Link href="/privacy"><span className="hover:text-white cursor-pointer">Privacy Policy</span></Link>
                <span>|</span>
                <Link href="/terms"><span className="hover:text-white cursor-pointer">Terms of Service</span></Link>
                <span>|</span>
                <Link href="/disclaimer"><span className="hover:text-white cursor-pointer">Risk Disclaimer</span></Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;