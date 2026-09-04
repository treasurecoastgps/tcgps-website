import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OpsReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Reports</h1>
        <p className="text-gray-600">Generate and manage reports</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Reports & Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Report generation and document management.</p>
          <p className="text-sm text-gray-500 mt-2">TODO: Upload reports, assign to properties, visibility controls.</p>
        </CardContent>
      </Card>
    </div>
  );
}