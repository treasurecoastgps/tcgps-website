import { Handler } from '@netlify/functions';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: string;
  eventType: string;
}

// Sample data - in production this would come from a database
const events: Event[] = [
  {
    id: 1,
    title: "Q1 Investor Briefing",
    date: "March 15, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Stuart Conference Center",
    description: "Review our Q1 performance, upcoming acquisitions, and dividend distributions. Network with fellow investors and board members.",
    status: "Open",
    eventType: "Investor Meeting"
  },
  {
    id: 2,
    title: "REIT Investment Masterclass",
    date: "March 22, 2024",
    time: "10:00 AM - 2:00 PM",
    location: "Virtual & In-Person",
    description: "Learn the fundamentals of REIT investing, tax advantages, and portfolio diversification strategies from industry experts.",
    status: "Open",
    eventType: "Educational"
  },
  {
    id: 3,
    title: "Investor Social & Property Tour",
    date: "April 5, 2024",
    time: "4:00 PM - 7:00 PM",
    location: "Oceanview Estates",
    description: "Exclusive property tour of our newest acquisition followed by cocktails and networking with board members and investors.",
    status: "Limited",
    eventType: "Networking"
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
    const eventId = pathSegments[pathSegments.length - 1];

    // If requesting a specific event by ID
    if (eventId && eventId !== 'events' && !isNaN(Number(eventId))) {
      const eventItem = events.find(e => e.id === Number(eventId));
      if (!eventItem) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Event not found' }),
        };
      }
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(eventItem),
      };
    }

    // Return all events
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(events),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};