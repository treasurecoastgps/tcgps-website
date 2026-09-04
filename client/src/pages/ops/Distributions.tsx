import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OpsDistributions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Distribution Management</h1>
        <p className="text-gray-600">Manage quarterly distributions</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Distributions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Distribution management and processing.</p>
          <p className="text-sm text-gray-500 mt-2">TODO: Create distribution runs, process payments, export for accounting.</p>
        </CardContent>
      </Card>
    </div>
  );
}