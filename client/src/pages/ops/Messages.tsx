import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OpsMessages() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Messages</h1>
        <p className="text-gray-600">Support ticket management</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Support Center</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Support ticket management and messaging.</p>
          <p className="text-sm text-gray-500 mt-2">TODO: Ticket management, assignment, status updates.</p>
        </CardContent>
      </Card>
    </div>
  );
}