import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-navy">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Account settings, profile management, and bank account linking will be displayed here.</p>
          <p className="text-sm text-gray-500 mt-2">
            TODO: Integrate with investorService for profile updates, bank account linking via Plaid, and notification preferences.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}