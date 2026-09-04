import { Investment, InvestorProfile, Transaction, InvestmentStatus } from '../types/platform';

// TODO: Replace with actual API calls to Render backend
class InvestorService {
  private baseUrl = '/api/investors'; // Will be Render backend URL

  // Mock data for development
  private mockInvestorProfile: InvestorProfile = {
    id: 'investor-1',
    userId: 'user-1',
    accreditedInvestor: true,
    entityType: 'Individual',
    taxId: 'XXX-XX-1234',
    address: {
      street: '123 Main Street',
      city: 'Stuart',
      state: 'FL',
      zipCode: '34994'
    },
    phone: '772-555-0123',
    linkedBankAccount: {
      bankName: 'Chase Bank',
      accountType: 'Checking',
      lastFour: '1234',
      isVerified: true
    },
    totalInvested: 15000,
    portfolioValue: 16800,
    totalDistributions: 1200,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  };

  private mockInvestments: Investment[] = [
    {
      id: 'inv-1',
      userId: 'user-1',
      propertyId: 'prop-1',
      amount: 10000,
      status: InvestmentStatus.ACTIVE,
      investmentDate: '2024-01-15T00:00:00Z',
      currentValue: 11200,
      totalDistributions: 800,
      reinvestmentElection: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-03-01T00:00:00Z'
    },
    {
      id: 'inv-2',
      userId: 'user-1',
      propertyId: 'prop-2',
      amount: 5000,
      status: InvestmentStatus.ACTIVE,
      investmentDate: '2024-02-01T00:00:00Z',
      currentValue: 5600,
      totalDistributions: 400,
      reinvestmentElection: false,
      createdAt: '2024-02-01T00:00:00Z',
      updatedAt: '2024-03-01T00:00:00Z'
    }
  ];

  private mockTransactions: Transaction[] = [
    {
      id: 'txn-1',
      userId: 'user-1',
      type: 'investment',
      amount: 10000,
      description: 'Investment in Oceanview Apartments',
      reference: 'INV-2024-001',
      status: 'completed',
      propertyId: 'prop-1',
      investmentId: 'inv-1',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: 'txn-2',
      userId: 'user-1',
      type: 'distribution',
      amount: 400,
      description: 'Q1 2024 Distribution - Oceanview Apartments',
      reference: 'DIST-2024-Q1-001',
      status: 'completed',
      propertyId: 'prop-1',
      investmentId: 'inv-1',
      distributionId: 'dist-1',
      createdAt: '2024-03-31T00:00:00Z',
      updatedAt: '2024-03-31T00:00:00Z'
    }
  ];

  async getInvestorProfile(userId: string): Promise<InvestorProfile | null> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/${userId}/profile`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockInvestorProfile);
      }, 500);
    });
  }

  async updateInvestorProfile(userId: string, updates: Partial<InvestorProfile>): Promise<InvestorProfile> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/${userId}/profile`, { method: 'PATCH', body: JSON.stringify(updates) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockInvestorProfile = {
          ...this.mockInvestorProfile,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        resolve(this.mockInvestorProfile);
      }, 1000);
    });
  }

  async getInvestments(userId: string): Promise<Investment[]> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/${userId}/investments`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const userInvestments = this.mockInvestments.filter(inv => inv.userId === userId);
        resolve(userInvestments);
      }, 500);
    });
  }

  async getInvestmentById(investmentId: string): Promise<Investment | null> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/investments/${investmentId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const investment = this.mockInvestments.find(inv => inv.id === investmentId);
        resolve(investment || null);
      }, 500);
    });
  }

  async createInvestment(investmentData: {
    propertyId: string;
    amount: number;
    userId: string;
  }): Promise<Investment> {
    // TODO: Replace with actual API call
    // This will trigger backend workflows for:
    // - Payment processing via Plaid
    // - Document generation via DocuSign
    // - Investment allocation
    // return fetch(`${this.baseUrl}/investments`, { method: 'POST', body: JSON.stringify(investmentData) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newInvestment: Investment = {
          id: `inv-${Date.now()}`,
          userId: investmentData.userId,
          propertyId: investmentData.propertyId,
          amount: investmentData.amount,
          status: InvestmentStatus.PENDING, // Will be updated when payment clears
          investmentDate: new Date().toISOString(),
          currentValue: investmentData.amount,
          totalDistributions: 0,
          reinvestmentElection: false, // Default, user can change later
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        this.mockInvestments.push(newInvestment);
        resolve(newInvestment);
      }, 1000);
    });
  }

  async updateReinvestmentElection(investmentId: string, reinvest: boolean): Promise<Investment> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/investments/${investmentId}/reinvestment`, { method: 'PATCH', body: JSON.stringify({ reinvest }) })
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const investment = this.mockInvestments.find(inv => inv.id === investmentId);
        if (!investment) {
          reject(new Error('Investment not found'));
          return;
        }
        
        investment.reinvestmentElection = reinvest;
        investment.updatedAt = new Date().toISOString();
        resolve(investment);
      }, 500);
    });
  }

  async getTransactions(userId: string): Promise<Transaction[]> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/${userId}/transactions`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const userTransactions = this.mockTransactions.filter(txn => txn.userId === userId);
        resolve(userTransactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }, 500);
    });
  }

  async getPortfolioSummary(userId: string): Promise<{
    totalInvested: number;
    currentValue: number;
    totalDistributions: number;
    totalReturn: number;
    returnPercentage: number;
    activeInvestments: number;
  }> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/${userId}/portfolio/summary`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const investments = this.mockInvestments.filter(inv => inv.userId === userId && inv.status === InvestmentStatus.ACTIVE);
        
        const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
        const currentValue = investments.reduce((sum, inv) => sum + (inv.currentValue || inv.amount), 0);
        const totalDistributions = investments.reduce((sum, inv) => sum + inv.totalDistributions, 0);
        const totalReturn = (currentValue + totalDistributions) - totalInvested;
        const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;
        
        resolve({
          totalInvested,
          currentValue,
          totalDistributions,
          totalReturn,
          returnPercentage,
          activeInvestments: investments.length
        });
      }, 500);
    });
  }

  // Method for linking bank account via Plaid
  async linkBankAccount(userId: string, plaidData: {
    publicToken: string;
    accountId: string;
  }): Promise<void> {
    // TODO: Replace with actual API call that:
    // 1. Exchanges public token for access token via Plaid
    // 2. Stores encrypted bank account info
    // 3. Initiates micro-deposit verification if needed
    // return fetch(`${this.baseUrl}/${userId}/bank-account`, { method: 'POST', body: JSON.stringify(plaidData) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Bank account linked for user ${userId}`, plaidData);
        // Update mock profile
        this.mockInvestorProfile.linkedBankAccount = {
          bankName: 'Mock Bank',
          accountType: 'Checking',
          lastFour: '9999',
          isVerified: false // Would be true after verification
        };
        resolve();
      }, 2000);
    });
  }

  async verifyBankAccount(userId: string, microDepositAmounts: number[]): Promise<boolean> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/${userId}/bank-account/verify`, { method: 'POST', body: JSON.stringify({ amounts: microDepositAmounts }) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock verification - in real implementation, backend would verify against Plaid
        const isValid = microDepositAmounts.length === 2; // Simple mock validation
        
        if (isValid && this.mockInvestorProfile.linkedBankAccount) {
          this.mockInvestorProfile.linkedBankAccount.isVerified = true;
        }
        
        resolve(isValid);
      }, 1000);
    });
  }

  // Method for getting all investors (admin only)
  async getAllInvestors(): Promise<InvestorProfile[]> {
    // TODO: Replace with actual API call (requires admin role)
    // return fetch(`${this.baseUrl}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock: Return array with single investor
        resolve([this.mockInvestorProfile]);
      }, 500);
    });
  }
}

export const investorService = new InvestorService();