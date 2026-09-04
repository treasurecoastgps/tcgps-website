import { Handler } from '@netlify/functions';

interface Property {
  id: number;
  name: string;
  location: string;
  type: string;
  value: string;
  status: string;
  imageUrl?: string;
  description?: string;
}

// Sample data - in production this would come from a database
const properties: Property[] = [
  {
    id: 1,
    name: "Treasure Coast Business Center",
    location: "Stuart, FL",
    type: "Commercial",
    value: "$2.4M",
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Modern commercial office complex in the heart of Stuart"
  },
  {
    id: 2,
    name: "Oceanview Estates",
    location: "Jupiter, FL",
    type: "Residential",
    value: "$3.8M",
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Luxury residential development with ocean views"
  },
  {
    id: 3,
    name: "Downtown Commons",
    location: "Port St. Lucie, FL",
    type: "Mixed-Use",
    value: "$5.2M",
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Mixed-use development with retail and residential components"
  },
  {
    id: 4,
    name: "Coastal Marketplace",
    location: "Vero Beach, FL",
    type: "Retail",
    value: "$1.9M",
    status: "Under Review",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Modern retail shopping center in prime location"
  },
  {
    id: 5,
    name: "Riverside Apartments",
    location: "Fort Pierce, FL",
    type: "Multi-Family",
    value: "$4.1M",
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Modern apartment complex with riverside views"
  },
  {
    id: 6,
    name: "Logistics Hub 95",
    location: "Palm City, FL",
    type: "Industrial",
    value: "$3.6M",
    status: "Planning",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Modern warehouse and logistics facility"
  }
];

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod === 'GET') {
    const pathSegments = event.path.split('/');
    const propertyId = pathSegments[pathSegments.length - 1];

    // If requesting a specific property by ID
    if (propertyId && propertyId !== 'properties' && !isNaN(Number(propertyId))) {
      const property = properties.find(p => p.id === Number(propertyId));
      if (!property) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Property not found' }),
        };
      }
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(property),
      };
    }

    // Return all properties
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(properties),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};