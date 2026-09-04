import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Properties() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Properties</h1>
        <p className="text-gray-600">View properties you've invested in and explore new opportunities</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Your invested properties will be displayed here.</p>
          <p className="text-sm text-gray-500 mt-2">
            TODO: Show detailed property metrics for invested properties, 
            hide sensitive data for non-invested properties.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}