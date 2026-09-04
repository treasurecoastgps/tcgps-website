export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  investmentInterest?: string;
  message: string;
}

export interface PropertyStatus {
  Active: 'bg-green-accent/10 text-green-accent';
  'Under Review': 'bg-yellow-500/10 text-yellow-600';
  Planning: 'bg-blue-500/10 text-blue-600';
}

export interface EventStatus {
  Open: 'bg-green-accent/10 text-green-accent';
  Limited: 'bg-orange-500/10 text-orange-600';
  Closed: 'bg-red-500/10 text-red-600';
}

export interface PropertyType {
  Commercial: 'bg-sky-blue/10 text-sky-blue';
  Residential: 'bg-green-accent/10 text-green-accent';
  'Mixed-Use': 'bg-medium-blue/10 text-medium-blue';
  Retail: 'bg-sky-blue/10 text-sky-blue';
  'Multi-Family': 'bg-green-accent/10 text-green-accent';
  Industrial: 'bg-navy/10 text-navy';
}
