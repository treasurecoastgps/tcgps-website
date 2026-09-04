import React, { useState } from 'react';
import { Link } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { InsertContactSubmission } from '@shared/schema';
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

const INVESTMENT_RANGES = [
  '$1,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+',
];

export default function RequestAccess() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investmentInterest: '',
    relationship: '',
  });

  const requestMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => setSubmitted(true),
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Your request was not submitted. Please try again or email us directly.',
        variant: 'destructive',
      });
    },
  });

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.relationship) {
      toast({
        title: 'Please complete the required fields',
        description: 'Name, email, and how you know our firm are required.',
        variant: 'destructive',
      });
      return;
    }
    requestMutation.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      investmentInterest: formData.investmentInterest,
      message: `[Investor Access Request] Relationship to firm: ${formData.relationship}`,
    });
  };

  if (submitted) {
    return (
      <div className="py-24 bg-light-blue min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <CheckCircle2 className="h-14 w-14 text-green-accent mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-navy mb-4">Request received</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your interest in investing with Treasure Coast Global Property Solutions.
            Our team manually reviews every request and will follow up by email if we're able to move
            forward with an invitation.
          </p>
          <Link href="/">
            <Button className="bg-navy hover:bg-sky-blue text-white">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-light-blue">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy mb-4">Request Investor Access</h1>
          <p className="text-xl text-gray-600">
            Our investor portal is invitation-only. Tell us a bit about yourself and our team will
            follow up to discuss next steps.
          </p>
        </div>

        <div className="bg-white border border-sky-blue/20 rounded-lg p-5 mb-8 flex gap-3">
          <ShieldCheck className="h-6 w-6 text-sky-blue flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            Access to specific investment opportunities is limited to individuals with an existing
            relationship to our firm, consistent with our private placement offering structure.
            Submitting this form does not guarantee access — every request is reviewed manually by
            our team.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-navy">Investor Access Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={formData.name} onChange={handleChange('name')} required className="mt-2" />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleChange('email')} required className="mt-2" />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={formData.phone} onChange={handleChange('phone')} className="mt-2" />
              </div>

              <div>
                <Label htmlFor="investmentInterest">Estimated Investment Range</Label>
                <Select
                  value={formData.investmentInterest}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, investmentInterest: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent>
                    {INVESTMENT_RANGES.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="relationship">How do you know our firm? *</Label>
                <Textarea
                  id="relationship"
                  value={formData.relationship}
                  onChange={handleChange('relationship')}
                  placeholder="e.g. referred by an existing investor, met at an event, prior business relationship..."
                  required
                  rows={3}
                  className="mt-2 resize-none"
                />
              </div>

              <Button type="submit" className="w-full bg-sky-blue hover:bg-medium-blue text-white" size="lg" disabled={requestMutation.isPending}>
                {requestMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
