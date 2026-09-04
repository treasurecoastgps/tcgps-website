import { Handler } from '@netlify/functions';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  description: string;
  imageUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

// Sample data - in production this would come from a database
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Quinesha \"Nikki\" Hawkins",
    title: "Chief Executive Officer",
    description: "20+ years in real estate development and investment management. Expert in strategic planning and community development.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    linkedinUrl: "#",
    email: "nikki@treasurecoastglobal.com"
  },
  {
    id: 2,
    name: "Keisha McCarden",
    title: "Chief Financial Officer",
    description: "CPA with 15+ years in real estate finance and investment analysis. Specializes in REIT compliance and investor relations.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    linkedinUrl: "#",
    email: "keisha@treasurecoastglobal.com"
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    title: "Chief Investment Officer",
    description: "Former institutional portfolio manager with deep expertise in Florida real estate markets and investment strategy.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    linkedinUrl: "#",
    email: "michael@treasurecoastglobal.com"
  },
  {
    id: 4,
    name: "Sarah Thompson",
    title: "Director of Operations",
    description: "Property management specialist focused on operational excellence and maximizing portfolio performance across all assets.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    linkedinUrl: "#",
    email: "sarah@treasurecoastglobal.com"
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
    const memberId = pathSegments[pathSegments.length - 1];

    // If requesting a specific team member by ID
    if (memberId && memberId !== 'team' && !isNaN(Number(memberId))) {
      const member = teamMembers.find(m => m.id === Number(memberId));
      if (!member) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Team member not found' }),
        };
      }
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(member),
      };
    }

    // Return all team members
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(teamMembers),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};