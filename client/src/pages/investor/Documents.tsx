import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Documents() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-navy">Documents</h1>
        <p className="text-gray-600">Access your investment documents and reports</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Document Vault</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Your signed documents and reports will be displayed here.</p>
          <p className="text-sm text-gray-500 mt-2">
            TODO: Integrate with documentService for signed agreements, tax documents, and quarterly reports.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}