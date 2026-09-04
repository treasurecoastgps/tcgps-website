import { SupportTicket, SupportMessage, SupportTicketStatus, SupportTicketPriority } from '../types/platform';

// TODO: Replace with actual API calls to Render backend
class SupportService {
  private baseUrl = '/api/support'; // Will be Render backend URL

  // Mock data for development
  private mockTickets: SupportTicket[] = [
    {
      id: 'ticket-1',
      userId: 'user-1',
      subject: 'Question about Q1 distribution',
      description: 'I have a question about my Q1 distribution amount. It seems lower than expected.',
      status: SupportTicketStatus.RESOLVED,
      priority: SupportTicketPriority.MEDIUM,
      assignedTo: 'support-agent-1',
      messages: [
        {
          id: 'msg-1',
          ticketId: 'ticket-1',
          userId: 'user-1',
          message: 'I have a question about my Q1 distribution amount. It seems lower than expected.',
          isInternal: false,
          createdAt: '2024-04-02T10:00:00Z'
        },
        {
          id: 'msg-2',
          ticketId: 'ticket-1',
          userId: 'support-agent-1',
          message: 'Thank you for reaching out. I\'ve reviewed your distribution and it appears correct based on your investment amount and the property\'s performance. I\'ll send you a detailed breakdown.',
          isInternal: false,
          createdAt: '2024-04-02T14:30:00Z'
        },
        {
          id: 'msg-3',
          ticketId: 'ticket-1',
          userId: 'user-1',
          message: 'Thank you for the explanation. That makes sense now.',
          isInternal: false,
          createdAt: '2024-04-02T16:15:00Z'
        }
      ],
      createdAt: '2024-04-02T10:00:00Z',
      updatedAt: '2024-04-02T16:15:00Z'
    },
    {
      id: 'ticket-2',
      userId: 'user-1',
      subject: 'Update bank account information',
      description: 'I need to update my linked bank account for future distributions.',
      status: SupportTicketStatus.IN_PROGRESS,
      priority: SupportTicketPriority.HIGH,
      assignedTo: 'support-agent-2',
      messages: [
        {
          id: 'msg-4',
          ticketId: 'ticket-2',
          userId: 'user-1',
          message: 'I need to update my linked bank account for future distributions. My current account will be closed next week.',
          isInternal: false,
          createdAt: '2024-06-15T09:00:00Z'
        },
        {
          id: 'msg-5',
          ticketId: 'ticket-2',
          userId: 'support-agent-2',
          message: 'I can help you with that. I\'ll send you a secure link to update your banking information through our platform.',
          isInternal: false,
          createdAt: '2024-06-15T11:30:00Z'
        }
      ],
      createdAt: '2024-06-15T09:00:00Z',
      updatedAt: '2024-06-15T11:30:00Z'
    }
  ];

  async getUserTickets(userId: string): Promise<SupportTicket[]> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/user/${userId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const userTickets = this.mockTickets.filter(ticket => ticket.userId === userId);
        resolve(userTickets.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
      }, 500);
    });
  }

  async getAllTickets(): Promise<SupportTicket[]> {
    // TODO: Replace with actual API call (admin/support only)
    // return fetch(`${this.baseUrl}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockTickets.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
      }, 500);
    });
  }

  async getTicketById(ticketId: string): Promise<SupportTicket | null> {
    // TODO: Replace with actual API call
    // Backend will verify user has access to this ticket
    // return fetch(`${this.baseUrl}/${ticketId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const ticket = this.mockTickets.find(t => t.id === ticketId);
        resolve(ticket || null);
      }, 500);
    });
  }

  async createTicket(ticketData: {
    userId: string;
    subject: string;
    description: string;
    priority?: SupportTicketPriority;
    attachments?: File[];
  }): Promise<SupportTicket> {
    // TODO: Replace with actual API call
    // Backend will:
    // 1. Create ticket record
    // 2. Upload any attachments to secure storage
    // 3. Send notification to support team
    // 4. Send confirmation email to user
    // return fetch(`${this.baseUrl}`, { method: 'POST', body: JSON.stringify(ticketData) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialMessage: SupportMessage = {
          id: `msg-${Date.now()}`,
          ticketId: `ticket-${Date.now()}`,
          userId: ticketData.userId,
          message: ticketData.description,
          isInternal: false,
          attachments: ticketData.attachments?.map(file => file.name),
          createdAt: new Date().toISOString()
        };

        const newTicket: SupportTicket = {
          id: `ticket-${Date.now()}`,
          userId: ticketData.userId,
          subject: ticketData.subject,
          description: ticketData.description,
          status: SupportTicketStatus.OPEN,
          priority: ticketData.priority || SupportTicketPriority.MEDIUM,
          messages: [initialMessage],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        this.mockTickets.push(newTicket);
        console.log('New support ticket created and notification sent to support team');
        resolve(newTicket);
      }, 1000);
    });
  }

  async addMessage(ticketId: string, message: {
    userId: string;
    message: string;
    isInternal?: boolean;
    attachments?: File[];
  }): Promise<SupportMessage> {
    // TODO: Replace with actual API call
    // Backend will:
    // 1. Add message to ticket
    // 2. Upload any attachments
    // 3. Update ticket status and timestamp
    // 4. Send notification to relevant parties
    // return fetch(`${this.baseUrl}/${ticketId}/messages`, { method: 'POST', body: JSON.stringify(message) })
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ticket = this.mockTickets.find(t => t.id === ticketId);
        if (!ticket) {
          reject(new Error('Ticket not found'));
          return;
        }

        const newMessage: SupportMessage = {
          id: `msg-${Date.now()}`,
          ticketId,
          userId: message.userId,
          message: message.message,
          isInternal: message.isInternal || false,
          attachments: message.attachments?.map(file => file.name),
          createdAt: new Date().toISOString()
        };

        ticket.messages.push(newMessage);
        ticket.updatedAt = new Date().toISOString();
        
        // Auto-update status if customer responds to resolved ticket
        if (ticket.status === SupportTicketStatus.RESOLVED && !message.isInternal) {
          ticket.status = SupportTicketStatus.OPEN;
        }

        console.log(`Message added to ticket ${ticketId}`);
        resolve(newMessage);
      }, 500);
    });
  }

  async updateTicketStatus(ticketId: string, status: SupportTicketStatus, userId: string): Promise<SupportTicket> {
    // TODO: Replace with actual API call (admin/support only)
    // return fetch(`${this.baseUrl}/${ticketId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ticket = this.mockTickets.find(t => t.id === ticketId);
        if (!ticket) {
          reject(new Error('Ticket not found'));
          return;
        }

        const oldStatus = ticket.status;
        ticket.status = status;
        ticket.updatedAt = new Date().toISOString();

        // Add internal message about status change
        const statusMessage: SupportMessage = {
          id: `msg-${Date.now()}`,
          ticketId,
          userId,
          message: `Ticket status changed from ${oldStatus} to ${status}`,
          isInternal: true,
          createdAt: new Date().toISOString()
        };
        ticket.messages.push(statusMessage);

        console.log(`Ticket ${ticketId} status updated to ${status}`);
        resolve(ticket);
      }, 500);
    });
  }

  async assignTicket(ticketId: string, assigneeId: string): Promise<SupportTicket> {
    // TODO: Replace with actual API call (admin/support only)
    // return fetch(`${this.baseUrl}/${ticketId}/assign`, { method: 'PATCH', body: JSON.stringify({ assigneeId }) })
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ticket = this.mockTickets.find(t => t.id === ticketId);
        if (!ticket) {
          reject(new Error('Ticket not found'));
          return;
        }

        ticket.assignedTo = assigneeId;
        ticket.updatedAt = new Date().toISOString();

        console.log(`Ticket ${ticketId} assigned to ${assigneeId}`);
        resolve(ticket);
      }, 500);
    });
  }

  async updateTicketPriority(ticketId: string, priority: SupportTicketPriority): Promise<SupportTicket> {
    // TODO: Replace with actual API call (admin/support only)
    // return fetch(`${this.baseUrl}/${ticketId}/priority`, { method: 'PATCH', body: JSON.stringify({ priority }) })
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ticket = this.mockTickets.find(t => t.id === ticketId);
        if (!ticket) {
          reject(new Error('Ticket not found'));
          return;
        }

        ticket.priority = priority;
        ticket.updatedAt = new Date().toISOString();

        console.log(`Ticket ${ticketId} priority updated to ${priority}`);
        resolve(ticket);
      }, 500);
    });
  }

  async deleteTicket(ticketId: string): Promise<void> {
    // TODO: Replace with actual API call (admin only)
    // return fetch(`${this.baseUrl}/${ticketId}`, { method: 'DELETE' })
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.mockTickets.findIndex(t => t.id === ticketId);
        if (index === -1) {
          reject(new Error('Ticket not found'));
          return;
        }

        this.mockTickets.splice(index, 1);
        console.log(`Ticket ${ticketId} deleted`);
        resolve();
      }, 1000);
    });
  }

  async getSupportStats(): Promise<{
    totalTickets: number;
    openTickets: number;
    resolvedTickets: number;
    averageResponseTime: number; // in hours
    averageResolutionTime: number; // in days
    ticketsByPriority: Record<SupportTicketPriority, number>;
  }> {
    // TODO: Replace with actual API call (admin/support only)
    // return fetch(`${this.baseUrl}/stats`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const totalTickets = this.mockTickets.length;
        const openTickets = this.mockTickets.filter(t => 
          [SupportTicketStatus.OPEN, SupportTicketStatus.IN_PROGRESS, SupportTicketStatus.WAITING_FOR_RESPONSE].includes(t.status)
        ).length;
        const resolvedTickets = this.mockTickets.filter(t => 
          [SupportTicketStatus.RESOLVED, SupportTicketStatus.CLOSED].includes(t.status)
        ).length;

        const ticketsByPriority = {
          [SupportTicketPriority.LOW]: this.mockTickets.filter(t => t.priority === SupportTicketPriority.LOW).length,
          [SupportTicketPriority.MEDIUM]: this.mockTickets.filter(t => t.priority === SupportTicketPriority.MEDIUM).length,
          [SupportTicketPriority.HIGH]: this.mockTickets.filter(t => t.priority === SupportTicketPriority.HIGH).length,
          [SupportTicketPriority.URGENT]: this.mockTickets.filter(t => t.priority === SupportTicketPriority.URGENT).length
        };

        resolve({
          totalTickets,
          openTickets,
          resolvedTickets,
          averageResponseTime: 4.5, // Mock data
          averageResolutionTime: 2.3, // Mock data
          ticketsByPriority
        });
      }, 500);
    });
  }

  // Utility methods
  getTicketsByStatus(tickets: SupportTicket[], status: SupportTicketStatus): SupportTicket[] {
    return tickets.filter(ticket => ticket.status === status);
  }

  getTicketsByPriority(tickets: SupportTicket[], priority: SupportTicketPriority): SupportTicket[] {
    return tickets.filter(ticket => ticket.priority === priority);
  }

  getTicketsByAssignee(tickets: SupportTicket[], assigneeId: string): SupportTicket[] {
    return tickets.filter(ticket => ticket.assignedTo === assigneeId);
  }

  getUnassignedTickets(tickets: SupportTicket[]): SupportTicket[] {
    return tickets.filter(ticket => !ticket.assignedTo);
  }

  formatTicketAge(createdAt: string): string {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInHours = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  }

  getPriorityColor(priority: SupportTicketPriority): string {
    const colors = {
      [SupportTicketPriority.LOW]: 'text-green-600',
      [SupportTicketPriority.MEDIUM]: 'text-yellow-600',
      [SupportTicketPriority.HIGH]: 'text-orange-600',
      [SupportTicketPriority.URGENT]: 'text-red-600'
    };
    return colors[priority];
  }

  getStatusColor(status: SupportTicketStatus): string {
    const colors = {
      [SupportTicketStatus.OPEN]: 'text-blue-600',
      [SupportTicketStatus.IN_PROGRESS]: 'text-purple-600',
      [SupportTicketStatus.WAITING_FOR_RESPONSE]: 'text-orange-600',
      [SupportTicketStatus.RESOLVED]: 'text-green-600',
      [SupportTicketStatus.CLOSED]: 'text-gray-600'
    };
    return colors[status];
  }
}

export const supportService = new SupportService();