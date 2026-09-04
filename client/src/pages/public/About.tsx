import React from 'react';
import { Users, MapPin, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TeamSection from '@/components/TeamSection';

export default function About() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-navy mb-6">About Treasure Coast Global Property Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a professional real estate investment firm specializing in high-quality 
            property investments throughout Florida's Treasure Coast region.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-navy mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To democratize access to premium real estate investment opportunities while 
              maintaining the highest standards of transparency, professionalism, and investor service.
            </p>
            <p className="text-gray-600">
              We believe that strategic real estate investments should be accessible to both 
              accredited and non-accredited investors, with clear communication and 
              professional management throughout the investment lifecycle.
            </p>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-navy mb-6">Our Approach</h2>
            <p className="text-gray-600 mb-4">
              Our investment strategy focuses on cash-flowing properties in growing markets, 
              with emphasis on location, condition, and long-term appreciation potential.
            </p>
            <p className="text-gray-600">
              Every property undergoes rigorous due diligence, and we maintain active management 
              to ensure optimal performance for our investor community.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card>
            <CardHeader className="text-center">
              <MapPin className="h-8 w-8 text-sky-600 mx-auto mb-2" />
              <CardTitle className="text-navy">Regional Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Concentrated expertise in Florida's Treasure Coast real estate markets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Award className="h-8 w-8 text-sky-600 mx-auto mb-2" />
              <CardTitle className="text-navy">Professional Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Full-service property management and investor relations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="h-8 w-8 text-sky-600 mx-auto mb-2" />
              <CardTitle className="text-navy">Investor First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Transparent communication and regular performance reporting
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Target className="h-8 w-8 text-sky-600 mx-auto mb-2" />
              <CardTitle className="text-navy">Proven Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Focus on cash-flowing assets with appreciation potential
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-navy mb-6 text-center">Leadership Team</h2>
          <p className="text-gray-600 text-center mb-10">
            Our experienced leadership team brings decades of combined experience in real estate
            investment, property management, and investor relations.
          </p>
          <TeamSection />
        </div>
      </div>
    </div>
  );
}