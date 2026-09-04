import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OpsSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Settings</h1>
        <p className="text-gray-600">System configuration and access management</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">System configuration and user management.</p>
          <p className="text-sm text-gray-500 mt-2">TODO: Role management, integration settings, audit logs.</p>
        </CardContent>
      </Card>
    </div>
  );
}