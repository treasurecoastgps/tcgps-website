import { Distribution, DistributionStatus } from '../types/platform';

// TODO: Replace with actual API calls to Render backend
class DistributionService {
  private baseUrl = '/api/distributions'; // Will be Render backend URL

  // Mock data for development
  private mockDistributions: Distribution[] = [
    {
      id: 'dist-1',
      propertyId: 'prop-1',
      userId: 'user-1',
      investmentId: 'inv-1',
      amount: 400,
      quarter: 'Q1',
      year: 2024,
      status: DistributionStatus.PAID,
      paymentDate: '2024-04-01T00:00:00Z',
      reinvested: false,
      createdAt: '2024-03-25T00:00:00Z',
      updatedAt: '2024-04-01T00:00:00Z'
    },
    {
      id: 'dist-2',
      propertyId: 'prop-2',
      userId: 'user-1',
      investmentId: 'inv-2',
      amount: 200,
      quarter: 'Q1',
      year: 2024,
      status: DistributionStatus.PAID,
      paymentDate: '2024-04-01T00:00:00Z',
      reinvested: false,
      createdAt: '2024-03-25T00:00:00Z',
      updatedAt: '2024-04-01T00:00:00Z'
    },
    {
      id: 'dist-3',
      propertyId: 'prop-1',
      userId: 'user-1',
      investmentId: 'inv-1',
      amount: 450,
      quarter: 'Q2',
      year: 2024,
      status: DistributionStatus.SCHEDULED,
      reinvested: true, // User elected to reinvest
      createdAt: '2024-06-20T00:00:00Z',
      updatedAt: '2024-06-20T00:00:00Z'
    }
  ];

  async getUserDistributions(userId: string): Promise<Distribution[]> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/user/${userId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const userDistributions = this.mockDistributions.filter(dist => dist.userId === userId);
        resolve(userDistributions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }, 500);
    });
  }

  async getPropertyDistributions(propertyId: string): Promise<Distribution[]> {
    // TODO: Replace with actual API call (admin only)
    // return fetch(`${this.baseUrl}/property/${propertyId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const propertyDistributions = this.mockDistributions.filter(dist => dist.propertyId === propertyId);
        resolve(propertyDistributions);
      }, 500);
    });
  }

  async getAllDistributions(): Promise<Distribution[]> {
    // TODO: Replace with actual API call (admin only)
    // return fetch(`${this.baseUrl}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockDistributions);
      }, 500);
    });
  }

  async getDistributionById(distributionId: string): Promise<Distribution | null> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/${distributionId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const distribution = this.mockDistributions.find(dist => dist.id === distributionId);
        resolve(distribution || null);
      }, 500);
    });
  }

  async createDistributionRun(data: {
    propertyId: string;
    quarter: string;
    year: number;
    totalAmount: number;
  }): Promise<Distribution[]> {
    // TODO: Replace with actual API call (admin only)
    // Backend will:
    // 1. Calculate distributions for each investor based on ownership %
    // 2. Create distribution records
    // 3. Initiate payment processing workflows
    // 4. Handle reinvestment elections
    // return fetch(`${this.baseUrl}/runs`, { method: 'POST', body: JSON.stringify(data) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock: Create distribution for the demo user
        const newDistribution: Distribution = {
          id: `dist-${Date.now()}`,
          propertyId: data.propertyId,
          userId: 'user-1',
          investmentId: 'inv-1',
          amount: Math.round((data.totalAmount * 0.1) * 100) / 100, // Mock: 10% ownership
          quarter: data.quarter,
          year: data.year,
          status: DistributionStatus.SCHEDULED,
          reinvested: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        this.mockDistributions.push(newDistribution);
        resolve([newDistribution]);
      }, 1500);
    });
  }

  async processDistributionPayments(distributionIds: string[]): Promise<void> {
    // TODO: Replace with actual API call (admin only)
    // Backend will:
    // 1. Process ACH payments via Plaid/bank integration
    // 2. Update distribution statuses
    // 3. Send payment notifications
    // 4. Generate tax documents
    // return fetch(`${this.baseUrl}/process-payments`, { method: 'POST', body: JSON.stringify({ distributionIds }) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        distributionIds.forEach(id => {
          const distribution = this.mockDistributions.find(d => d.id === id);
          if (distribution && distribution.status === DistributionStatus.SCHEDULED) {
            distribution.status = DistributionStatus.PROCESSING;
            distribution.updatedAt = new Date().toISOString();
            
            // Simulate payment processing
            setTimeout(() => {
              distribution.status = DistributionStatus.PAID;
              distribution.paymentDate = new Date().toISOString();
              distribution.updatedAt = new Date().toISOString();
            }, 2000);
          }
        });
        
        console.log(`Processing payments for ${distributionIds.length} distributions`);
        resolve();
      }, 1000);
    });
  }

  async updateReinvestmentElection(
    userId: string,
    investmentId: string,
    reinvest: boolean
  ): Promise<void> {
    // TODO: Replace with actual API call
    // Backend will update future distributions for this investment
    // return fetch(`${this.baseUrl}/reinvestment`, { method: 'PATCH', body: JSON.stringify({ userId, investmentId, reinvest }) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update future distributions for this investment
        const futureDistributions = this.mockDistributions.filter(dist => 
          dist.userId === userId && 
          dist.investmentId === investmentId && 
          dist.status === DistributionStatus.SCHEDULED
        );
        
        futureDistributions.forEach(dist => {
          dist.reinvested = reinvest;
          dist.updatedAt = new Date().toISOString();
        });
        
        console.log(`Updated reinvestment election for investment ${investmentId}: ${reinvest}`);
        resolve();
      }, 500);
    });
  }

  async getDistributionSummary(userId: string): Promise<{
    totalReceived: number;
    totalReinvested: number;
    upcomingDistributions: number;
    lastDistributionDate?: string;
    nextDistributionDate?: string;
  }> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/user/${userId}/summary`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const userDistributions = this.mockDistributions.filter(dist => dist.userId === userId);
        
        const paidDistributions = userDistributions.filter(d => d.status === DistributionStatus.PAID);
        const reinvestedDistributions = userDistributions.filter(d => d.reinvested && d.status === DistributionStatus.PAID);
        const upcomingDistributions = userDistributions.filter(d => d.status === DistributionStatus.SCHEDULED);
        
        const totalReceived = paidDistributions
          .filter(d => !d.reinvested)
          .reduce((sum, d) => sum + d.amount, 0);
          
        const totalReinvested = reinvestedDistributions.reduce((sum, d) => sum + d.amount, 0);
        
        const sortedPaid = paidDistributions.sort((a, b) => 
          new Date(b.paymentDate || b.createdAt).getTime() - new Date(a.paymentDate || a.createdAt).getTime()
        );
        
        const lastDistributionDate = sortedPaid.length > 0 ? sortedPaid[0].paymentDate : undefined;
        const nextDistributionDate = upcomingDistributions.length > 0 ? 
          upcomingDistributions[0].createdAt : undefined; // In reality, this would be calculated based on quarter schedule
        
        resolve({
          totalReceived,
          totalReinvested,
          upcomingDistributions: upcomingDistributions.length,
          lastDistributionDate,
          nextDistributionDate
        });
      }, 500);
    });
  }

  async getQuarterlyDistributionReport(quarter: string, year: number): Promise<{
    totalDistributed: number;
    totalInvestors: number;
    totalProperties: number;
    distributionsByProperty: Array<{
      propertyId: string;
      propertyName: string;
      totalDistributed: number;
      investorCount: number;
    }>;
  }> {
    // TODO: Replace with actual API call (admin only)
    // return fetch(`${this.baseUrl}/reports/${year}/${quarter}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const quarterDistributions = this.mockDistributions.filter(d => 
          d.quarter === quarter && d.year === year
        );
        
        const totalDistributed = quarterDistributions.reduce((sum, d) => sum + d.amount, 0);
        const uniqueInvestors = new Set(quarterDistributions.map(d => d.userId)).size;
        const uniqueProperties = new Set(quarterDistributions.map(d => d.propertyId)).size;
        
        // Group by property
        const propertyGroups = quarterDistributions.reduce((acc, dist) => {
          const key = dist.propertyId;
          if (!acc[key]) {
            acc[key] = {
              propertyId: dist.propertyId,
              propertyName: `Property ${dist.propertyId}`, // Would be actual property name
              totalDistributed: 0,
              investors: new Set()
            };
          }
          acc[key].totalDistributed += dist.amount;
          acc[key].investors.add(dist.userId);
          return acc;
        }, {} as Record<string, any>);
        
        const distributionsByProperty = Object.values(propertyGroups).map((group: any) => ({
          propertyId: group.propertyId,
          propertyName: group.propertyName,
          totalDistributed: group.totalDistributed,
          investorCount: group.investors.size
        }));
        
        resolve({
          totalDistributed,
          totalInvestors: uniqueInvestors,
          totalProperties: uniqueProperties,
          distributionsByProperty
        });
      }, 500);
    });
  }

  // Utility methods
  getDistributionsByStatus(distributions: Distribution[], status: DistributionStatus): Distribution[] {
    return distributions.filter(dist => dist.status === status);
  }

  getDistributionsByYear(distributions: Distribution[], year: number): Distribution[] {
    return distributions.filter(dist => dist.year === year);
  }

  getDistributionsByQuarter(distributions: Distribution[], quarter: string, year: number): Distribution[] {
    return distributions.filter(dist => dist.quarter === quarter && dist.year === year);
  }

  formatDistributionPeriod(quarter: string, year: number): string {
    return `${quarter} ${year}`;
  }

  calculateAnnualDistributions(distributions: Distribution[], year: number): number {
    return distributions
      .filter(d => d.year === year && d.status === DistributionStatus.PAID)
      .reduce((sum, d) => sum + d.amount, 0);
  }
}

export const distributionService = new DistributionService();