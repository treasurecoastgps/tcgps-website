import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OpsInvestors() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Investor Management</h1>
        <p className="text-gray-600">Manage investor accounts and onboarding</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Investors</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Investor management interface will be displayed here.</p>
          <p className="text-sm text-gray-500 mt-2">
            TODO: Investor table, profile details, onboarding status, investment summaries.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}