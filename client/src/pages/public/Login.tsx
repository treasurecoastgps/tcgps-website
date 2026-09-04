import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Loader2, ArrowRight } from 'lucide-react';
import logoPath from '@assets/tcgps-icon.png';

export default function Login() {
  const [, setLocation] = useLocation();
  const { loginAsDemo, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleDemoLogin = () => {
    loginAsDemo();
    setLocation('/app/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDemoLogin();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <img src={logoPath} alt="Treasure Coast Logo" className="w-12 h-12" />
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Access your investor portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-4">
        {/* Demo CTA — primary action */}
        <div className="dark-gradient rounded-xl p-6 text-white text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#93c5fd' }}>
            Try the platform instantly
          </p>
          <h3 className="text-lg font-bold mb-2">Explore the Investor Portal</h3>
          <p className="text-sm mb-4" style={{ color: '#cbd5e1' }}>
            No account needed. See your portfolio, distributions, documents, and more.
          </p>
          <Button
            onClick={handleDemoLogin}
            className="w-full bg-sky-blue hover:bg-medium-blue text-white font-bold py-3"
            size="lg"
          >
            View Demo Portal
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-gray-50 px-3 text-gray-400 uppercase tracking-wider">or sign in with credentials</span>
          </div>
        </div>

        {/* Sign-in form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-navy text-lg">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>

              <div className="text-right">
                <a href="#" className="text-sm text-sky-blue hover:text-medium-blue">
                  Forgot your password?
                </a>
              </div>

              <Button type="submit" className="w-full bg-navy hover:bg-medium-blue text-white" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : 'Sign In'}
              </Button>
            </form>

            <div className="mt-5 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link href="/register">
                <span className="text-sky-blue hover:text-medium-blue font-medium cursor-pointer">
                  Create account
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
