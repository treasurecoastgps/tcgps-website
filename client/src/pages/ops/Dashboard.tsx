import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OpsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Operations Dashboard</h1>
        <p className="text-gray-600">Internal management and oversight</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Operations dashboard with KPIs and management tools.</p>
          <p className="text-sm text-gray-500 mt-2">
            TODO: Admin-only dashboard with investor metrics, property performance, and system analytics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}