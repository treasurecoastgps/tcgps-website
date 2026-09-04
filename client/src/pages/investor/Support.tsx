import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Support() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-navy">Support</h1>
        <p className="text-gray-600">Get help and manage your support requests</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Support Center</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Support tickets and messaging system will be displayed here.</p>
          <p className="text-sm text-gray-500 mt-2">
            TODO: Integrate with supportService for ticket creation, messaging, and support history.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}