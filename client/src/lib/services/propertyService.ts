import { Property, PropertyStatus, PropertyType } from '../types/platform';
import { authService } from './authService';

// TODO: Replace with actual API calls to Render backend
class PropertyService {
  private baseUrl = '/api/properties'; // Will be Render backend URL

  // Mock data for development
  private mockProperties: Property[] = [
    {
      id: 'prop-1',
      name: 'Oceanview Apartments',
      type: PropertyType.MULTI_FAMILY,
      status: PropertyStatus.ACTIVE,
      description: 'Premium 24-unit apartment complex located just blocks from the beach in Stuart, FL.',
      market: 'Treasure Coast',
      city: 'Stuart',
      state: 'FL',
      address: '123 Ocean Drive, Stuart, FL 34994', // Internal only
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800'
      ],
      targetReturn: 12.5,
      minimumInvestment: 1000,
      totalRaise: 2400000,
      raisedAmount: 1800000,
      // Private metrics (only for invested users)
      currentValue: 2100000,
      occupancyRate: 95,
      monthlyIncome: 42000,
      monthlyExpenses: 18000,
      quarterlyIncome: 126000,
      investorReturn: 11.8,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-03-01T00:00:00Z'
    },
    {
      id: 'prop-2',
      name: 'Downtown Commercial Plaza',
      type: PropertyType.COMMERCIAL,
      status: PropertyStatus.ACTIVE,
      description: 'Mixed-use commercial property in the heart of Fort Pierce with retail and office space.',
      market: 'Treasure Coast',
      city: 'Fort Pierce',
      state: 'FL',
      address: '456 Commercial Blvd, Fort Pierce, FL 34950',
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
      ],
      targetReturn: 10.2,
      minimumInvestment: 1000,
      totalRaise: 1800000,
      raisedAmount: 1200000,
      currentValue: 1650000,
      occupancyRate: 88,
      monthlyIncome: 28000,
      monthlyExpenses: 12000,
      quarterlyIncome: 84000,
      investorReturn: 9.8,
      createdAt: '2024-02-01T00:00:00Z',
      updatedAt: '2024-03-01T00:00:00Z'
    },
    {
      id: 'prop-3',
      name: 'Riverside Single Family Portfolio',
      type: PropertyType.SINGLE_FAMILY,
      status: PropertyStatus.UPCOMING,
      description: 'Collection of 8 renovated single-family homes in established Jensen Beach neighborhoods.',
      market: 'Treasure Coast',
      city: 'Jensen Beach',
      state: 'FL',
      images: [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
      ],
      targetReturn: 14.0,
      minimumInvestment: 1000,
      totalRaise: 3200000,
      raisedAmount: 0,
      createdAt: '2024-03-01T00:00:00Z',
      updatedAt: '2024-03-01T00:00:00Z'
    }
  ];

  async getAllProperties(): Promise<Property[]> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return public-safe versions (no addresses, limited metrics)
        const publicProperties = this.mockProperties.map(this.toPublicProperty);
        resolve(publicProperties);
      }, 500);
    });
  }

  async getPropertyById(id: string): Promise<Property | null> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/${id}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const property = this.mockProperties.find(p => p.id === id);
        if (!property) {
          resolve(null);
          return;
        }

        // Check if user has access to private metrics
        // TODO: This logic will be handled by the backend
        const canViewPrivateMetrics = this.canViewPrivateMetrics(id);
        
        if (canViewPrivateMetrics) {
          resolve(property);
        } else {
          resolve(this.toPublicProperty(property));
        }
      }, 500);
    });
  }

  async getInvestorProperties(userId: string): Promise<Property[]> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/investor/${userId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock: Return properties this user has invested in
        // In real implementation, backend would join with investments table
        const investedProperties = this.mockProperties.slice(0, 2); // Mock: first 2 properties
        resolve(investedProperties);
      }, 500);
    });
  }

  async createProperty(propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    // TODO: Replace with actual API call (requires admin role)
    // return fetch(`${this.baseUrl}`, { method: 'POST', body: JSON.stringify(propertyData) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProperty: Property = {
          ...propertyData,
          id: `prop-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        this.mockProperties.push(newProperty);
        resolve(newProperty);
      }, 1000);
    });
  }

  async updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
    // TODO: Replace with actual API call (requires admin role)
    // return fetch(`${this.baseUrl}/${id}`, { method: 'PATCH', body: JSON.stringify(updates) })
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.mockProperties.findIndex(p => p.id === id);
        if (index === -1) {
          reject(new Error('Property not found'));
          return;
        }
        
        this.mockProperties[index] = {
          ...this.mockProperties[index],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        resolve(this.mockProperties[index]);
      }, 1000);
    });
  }

  async deleteProperty(id: string): Promise<void> {
    // TODO: Replace with actual API call (requires admin role)
    // return fetch(`${this.baseUrl}/${id}`, { method: 'DELETE' })
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.mockProperties.findIndex(p => p.id === id);
        if (index === -1) {
          reject(new Error('Property not found'));
          return;
        }
        
        this.mockProperties.splice(index, 1);
        resolve();
      }, 1000);
    });
  }

  // Utility method to strip sensitive data for public viewing
  private toPublicProperty(property: Property): Property {
    const publicProperty = { ...property };
    
    // Remove sensitive fields for public viewing
    delete publicProperty.address;
    delete publicProperty.currentValue;
    delete publicProperty.occupancyRate;
    delete publicProperty.monthlyIncome;
    delete publicProperty.monthlyExpenses;
    delete publicProperty.quarterlyIncome;
    delete publicProperty.investorReturn;
    
    return publicProperty;
  }

  // Mock method to check if user can view private metrics
  // TODO: This will be replaced by backend authorization
  private canViewPrivateMetrics(propertyId: string): boolean {
    // In real implementation, backend would check:
    // 1. User is authenticated
    // 2. User has invested in this property OR user is admin/internal
    return true; // Mock: always return true for development
  }

  // Utility methods for filtering
  getPropertiesByStatus(properties: Property[], status: PropertyStatus): Property[] {
    return properties.filter(p => p.status === status);
  }

  getPropertiesByType(properties: Property[], type: PropertyType): Property[] {
    return properties.filter(p => p.type === type);
  }

  getPropertiesByMarket(properties: Property[], market: string): Property[] {
    return properties.filter(p => p.market.toLowerCase().includes(market.toLowerCase()));
  }
}

export const propertyService = new PropertyService();