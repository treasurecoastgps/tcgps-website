import { users, contactSubmissions, properties, events, teamMembers, type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type Property, type InsertProperty, type Event, type InsertEvent, type TeamMember, type InsertTeamMember } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private properties: Map<number, Property>;
  private events: Map<number, Event>;
  private teamMembers: Map<number, TeamMember>;
  
  private currentUserId: number;
  private currentContactId: number;
  private currentPropertyId: number;
  private currentEventId: number;
  private currentTeamId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.properties = new Map();
    this.events = new Map();
    this.teamMembers = new Map();
    
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentPropertyId = 1;
    this.currentEventId = 1;
    this.currentTeamId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Properties
    const sampleProperties: Property[] = [
      {
        id: this.currentPropertyId++,
        name: "Treasure Coast Business Center",
        location: "Stuart, FL",
        type: "Commercial",
        value: "$2.4M",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Modern commercial office complex in the heart of Stuart"
      },
      {
        id: this.currentPropertyId++,
        name: "Oceanview Estates",
        location: "Jupiter, FL",
        type: "Residential",
        value: "$3.8M",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Luxury residential development with ocean views"
      },
      {
        id: this.currentPropertyId++,
        name: "Downtown Commons",
        location: "Port St. Lucie, FL",
        type: "Mixed-Use",
        value: "$5.2M",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Mixed-use development with retail and residential components"
      },
      {
        id: this.currentPropertyId++,
        name: "Coastal Marketplace",
        location: "Vero Beach, FL",
        type: "Retail",
        value: "$1.9M",
        status: "Under Review",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Modern retail shopping center in prime location"
      },
      {
        id: this.currentPropertyId++,
        name: "Riverside Apartments",
        location: "Fort Pierce, FL",
        type: "Multi-Family",
        value: "$4.1M",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Modern apartment complex with riverside views"
      },
      {
        id: this.currentPropertyId++,
        name: "Logistics Hub 95",
        location: "Palm City, FL",
        type: "Industrial",
        value: "$3.6M",
        status: "Planning",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Modern warehouse and logistics facility"
      }
    ];

    // Events
    const sampleEvents: Event[] = [
      {
        id: this.currentEventId++,
        title: "Q1 Investor Briefing",
        date: "March 15, 2024",
        time: "6:00 PM - 8:00 PM",
        location: "Stuart Conference Center",
        description: "Review our Q1 performance, upcoming acquisitions, and dividend distributions. Network with fellow investors and board members.",
        status: "Open",
        eventType: "Investor Meeting"
      },
      {
        id: this.currentEventId++,
        title: "REIT Investment Masterclass",
        date: "March 22, 2024",
        time: "10:00 AM - 2:00 PM",
        location: "Virtual & In-Person",
        description: "Learn the fundamentals of REIT investing, tax advantages, and portfolio diversification strategies from industry experts.",
        status: "Open",
        eventType: "Educational"
      },
      {
        id: this.currentEventId++,
        title: "Investor Social & Property Tour",
        date: "April 5, 2024",
        time: "4:00 PM - 7:00 PM",
        location: "Oceanview Estates",
        description: "Exclusive property tour of our newest acquisition followed by cocktails and networking with board members and investors.",
        status: "Limited",
        eventType: "Networking"
      }
    ];

    // Team Members
    const sampleTeamMembers: TeamMember[] = [
      {
        id: this.currentTeamId++,
        name: "Quinesha \"Nikki\" Hawkins",
        title: "Chief Executive Officer",
        description: "20+ years in real estate development and investment management. Expert in strategic planning and community development.",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        linkedinUrl: "#",
        email: "nikki@treasurecoastglobal.com"
      },
      {
        id: this.currentTeamId++,
        name: "Keisha McCarden",
        title: "Chief Financial Officer",
        description: "CPA with 15+ years in real estate finance and investment analysis. Specializes in REIT compliance and investor relations.",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        linkedinUrl: "#",
        email: "keisha@treasurecoastglobal.com"
      },
      {
        id: this.currentTeamId++,
        name: "Michael Rodriguez",
        title: "Chief Investment Officer",
        description: "Former institutional portfolio manager with deep expertise in Florida real estate markets and investment strategy.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        linkedinUrl: "#",
        email: "michael@treasurecoastglobal.com"
      },
      {
        id: this.currentTeamId++,
        name: "Sarah Thompson",
        title: "Director of Operations",
        description: "Property management specialist focused on operational excellence and maximizing portfolio performance across all assets.",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        linkedinUrl: "#",
        email: "sarah@treasurecoastglobal.com"
      }
    ];

    // Store sample data
    sampleProperties.forEach(prop => this.properties.set(prop.id, prop));
    sampleEvents.forEach(event => this.events.set(event.id, event));
    sampleTeamMembers.forEach(member => this.teamMembers.set(member.id, member));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const contactSubmission: ContactSubmission = {
      ...submission,
      phone: submission.phone ?? null,
      investmentInterest: submission.investmentInterest ?? null,
      id,
      createdAt: new Date()
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const newProperty: Property = {
      ...property,
      imageUrl: property.imageUrl ?? null,
      description: property.description ?? null,
      id,
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const newEvent: Event = { ...event, id };
    this.events.set(id, newEvent);
    return newEvent;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentTeamId++;
    const newMember: TeamMember = {
      ...member,
      imageUrl: member.imageUrl ?? null,
      linkedinUrl: member.linkedinUrl ?? null,
      email: member.email ?? null,
      id,
    };
    this.teamMembers.set(id, newMember);
    return newMember;
  }
}

export const storage = new MemStorage();
