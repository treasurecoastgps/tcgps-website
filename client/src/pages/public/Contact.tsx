import React, { useState } from 'react';
import { Link } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { InsertContactSubmission } from '@shared/schema';

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Message sent',
        description: "Thanks for reaching out — we'll get back to you within one business day.",
      });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Your message was not sent. Please try again or email us directly.',
        variant: 'destructive',
      });
    },
  });

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      toast({
        title: 'Please complete the required fields',
        description: 'Name, email, and message are required.',
        variant: 'destructive',
      });
      return;
    }
    contactMutation.mutate({
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      message: formData.subject ? `[${formData.subject}] ${formData.message}` : formData.message,
    });
  };

  return (
    <div className="py-20 bg-light-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-navy mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to start investing or have questions? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-navy">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="First Name" value={formData.firstName} onChange={handleChange('firstName')} required />
                    <Input placeholder="Last Name" value={formData.lastName} onChange={handleChange('lastName')} />
                  </div>
                  <Input placeholder="Email Address" type="email" value={formData.email} onChange={handleChange('email')} required />
                  <Input placeholder="Phone Number" type="tel" value={formData.phone} onChange={handleChange('phone')} />
                  <Input placeholder="Subject" value={formData.subject} onChange={handleChange('subject')} />
                  <Textarea
                    placeholder="How can we help you?"
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={handleChange('message')}
                    required
                  />
                  <Button className="w-full" size="lg" type="submit" disabled={contactMutation.isPending}>
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-sky-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@treasurecoastglobal.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-sky-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">(772) 555-0123</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-sky-600" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">1650 S Kanner Hwy Ste 313<br />Stuart, FL 34994</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-sky-600" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-navy mb-3">Investor Inquiries</h3>
              <p className="text-gray-600 mb-4">
                For investment-related questions or to request access as a prospective investor,
                please use our dedicated Investor Access Request form.
              </p>
              <p className="text-gray-600">
                <strong>Investor Relations:</strong> investors@treasurecoastglobal.com
              </p>
            </div>

            <div className="bg-navy text-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">Ready to Invest?</h3>
              <p className="text-gray-300 mb-4">
                Request investor access and our team will reach out about next steps.
              </p>
              <Link href="/request-access">
                <Button variant="secondary" size="sm">
                  Request Investor Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
