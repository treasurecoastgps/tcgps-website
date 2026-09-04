import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Building, FileText, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="dark-gradient text-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-1">Welcome back, Nikki</h2>
        <p className="text-sm" style={{ color: '#93c5fd' }}>Here's an overview of your real estate investment portfolio.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,000</div>
            <p className="text-xs text-muted-foreground">Active investments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$16,800</div>
            <p className="text-xs text-green-600">+12% from invested</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Active investments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distributions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,200</div>
            <p className="text-xs text-muted-foreground">Year to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dot: 'var(--green)', title: 'Q1 Distribution Received', meta: '$600 · Oceanview Apartments' },
                { dot: 'var(--sky-blue)', title: 'Quarterly Report Available', meta: 'Downtown Commercial Plaza' },
                { dot: 'var(--gray-400)', title: 'Investment Confirmed', meta: '$5,000 · Riverfront Multi-Family' },
              ].map(item => (
                <div key={item.title} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.dot }}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4 text-gray-400" />
              View Latest Reports
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
              Distribution History
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Building className="mr-2 h-4 w-4 text-gray-400" />
              Browse Properties
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageCircle className="mr-2 h-4 w-4 text-gray-400" />
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}