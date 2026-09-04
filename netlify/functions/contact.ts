import { Handler } from '@netlify/functions';

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  investmentInterest?: string;
  message: string;
  createdAt: string;
}

// In-memory storage for demo purposes
// In production, this would be stored in a database
let contactSubmissions: ContactSubmission[] = [];
let currentId = 1;

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

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      
      // Basic validation
      if (!body.name || !body.email || !body.message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Name, email, and message are required' }),
        };
      }

      // Create new contact submission
      const submission: ContactSubmission = {
        id: currentId++,
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        investmentInterest: body.investmentInterest || '',
        message: body.message,
        createdAt: new Date().toISOString(),
      };

      contactSubmissions.push(submission);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, submission }),
      };
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }
  }

  if (event.httpMethod === 'GET') {
    // Return all contact submissions (for admin purposes)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(contactSubmissions),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};