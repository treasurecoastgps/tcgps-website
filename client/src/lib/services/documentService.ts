import { Document, DocumentType, DocumentStatus } from '../types/platform';

// TODO: Replace with actual API calls to Render backend
class DocumentService {
  private baseUrl = '/api/documents'; // Will be Render backend URL

  // Mock data for development
  private mockDocuments: Document[] = [
    {
      id: 'doc-1',
      userId: 'user-1',
      propertyId: 'prop-1',
      type: DocumentType.SUBSCRIPTION_AGREEMENT,
      title: 'Subscription Agreement - Oceanview Apartments',
      description: 'Investment subscription agreement for Oceanview Apartments LLC',
      fileName: 'subscription-agreement-oceanview.pdf',
      fileUrl: '/documents/subscription-agreement-oceanview.pdf',
      fileSize: 245760,
      status: DocumentStatus.SIGNED,
      docusignEnvelopeId: 'envelope-123-456-789',
      isPublic: false,
      createdAt: '2024-01-10T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: 'doc-2',
      userId: 'user-1',
      propertyId: 'prop-1',
      type: DocumentType.QUARTERLY_REPORT,
      title: 'Q1 2024 Quarterly Report - Oceanview Apartments',
      description: 'Performance and financial report for Q1 2024',
      fileName: 'q1-2024-oceanview-report.pdf',
      fileUrl: '/documents/q1-2024-oceanview-report.pdf',
      fileSize: 1048576,
      status: DocumentStatus.COMPLETED,
      isPublic: false,
      createdAt: '2024-04-01T00:00:00Z',
      updatedAt: '2024-04-01T00:00:00Z'
    },
    {
      id: 'doc-3',
      type: DocumentType.PPM,
      title: 'Private Placement Memorandum - Downtown Commercial Plaza',
      description: 'Investment overview and terms for Downtown Commercial Plaza',
      fileName: 'ppm-downtown-commercial.pdf',
      fileUrl: '/documents/ppm-downtown-commercial.pdf',
      fileSize: 2097152,
      status: DocumentStatus.COMPLETED,
      isPublic: true, // Available to all prospective investors
      createdAt: '2024-01-20T00:00:00Z',
      updatedAt: '2024-01-20T00:00:00Z'
    },
    {
      id: 'doc-4',
      userId: 'user-1',
      type: DocumentType.TAX_DOCUMENT,
      title: '2023 K-1 Tax Document',
      description: 'Partnership tax document for 2023 tax year',
      fileName: '2023-k1-user1.pdf',
      fileUrl: '/documents/2023-k1-user1.pdf',
      fileSize: 524288,
      status: DocumentStatus.COMPLETED,
      isPublic: false,
      createdAt: '2024-02-15T00:00:00Z',
      updatedAt: '2024-02-15T00:00:00Z'
    }
  ];

  async getUserDocuments(userId: string): Promise<Document[]> {
    // TODO: Replace with actual API call
    // return fetch(`${this.baseUrl}/user/${userId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const userDocuments = this.mockDocuments.filter(doc => 
          doc.userId === userId || doc.isPublic
        );
        resolve(userDocuments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }, 500);
    });
  }

  async getPropertyDocuments(propertyId: string, userId?: string): Promise<Document[]> {
    // TODO: Replace with actual API call
    // Backend will check if user has access to this property's documents
    // return fetch(`${this.baseUrl}/property/${propertyId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const propertyDocs = this.mockDocuments.filter(doc => 
          doc.propertyId === propertyId && (doc.isPublic || doc.userId === userId)
        );
        resolve(propertyDocs);
      }, 500);
    });
  }

  async getDocument(documentId: string): Promise<Document | null> {
    // TODO: Replace with actual API call
    // Backend will verify user has permission to access this document
    // return fetch(`${this.baseUrl}/${documentId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const document = this.mockDocuments.find(doc => doc.id === documentId);
        resolve(document || null);
      }, 500);
    });
  }

  async downloadDocument(documentId: string): Promise<Blob> {
    // TODO: Replace with actual API call
    // Backend will generate secure download URL or stream file
    // return fetch(`${this.baseUrl}/${documentId}/download`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock: Create a blob for download
        const mockContent = `Mock document content for document ${documentId}`;
        const blob = new Blob([mockContent], { type: 'application/pdf' });
        resolve(blob);
      }, 1000);
    });
  }

  async uploadDocument(
    file: File,
    metadata: {
      type: DocumentType;
      title: string;
      description?: string;
      userId?: string;
      propertyId?: string;
      isPublic?: boolean;
    }
  ): Promise<Document> {
    // TODO: Replace with actual API call (admin only)
    // Backend will:
    // 1. Validate file type and size
    // 2. Upload to secure storage (Supabase Storage)
    // 3. Create document record
    // return fetch(`${this.baseUrl}/upload`, { method: 'POST', body: formData })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDocument: Document = {
          id: `doc-${Date.now()}`,
          ...metadata,
          fileName: file.name,
          fileUrl: `/documents/${file.name}`,
          fileSize: file.size,
          status: DocumentStatus.COMPLETED,
          isPublic: metadata.isPublic || false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        this.mockDocuments.push(newDocument);
        resolve(newDocument);
      }, 2000);
    });
  }

  async sendForSignature(
    documentId: string,
    recipientEmail: string,
    signerName: string
  ): Promise<string> {
    // TODO: Replace with actual API call that integrates with DocuSign
    // Backend will:
    // 1. Create DocuSign envelope
    // 2. Add document and signature fields
    // 3. Send to recipient
    // 4. Return envelope ID for tracking
    // return fetch(`${this.baseUrl}/${documentId}/send-for-signature`, { method: 'POST', body: JSON.stringify({ recipientEmail, signerName }) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const envelopeId = `env-${Date.now()}`;
        
        // Update document status
        const document = this.mockDocuments.find(doc => doc.id === documentId);
        if (document) {
          document.status = DocumentStatus.SENT;
          document.docusignEnvelopeId = envelopeId;
          document.updatedAt = new Date().toISOString();
        }
        
        console.log(`Document sent for signature to ${recipientEmail}`);
        resolve(envelopeId);
      }, 1500);
    });
  }

  async getSignatureStatus(envelopeId: string): Promise<{
    status: 'sent' | 'delivered' | 'signed' | 'completed' | 'declined' | 'voided';
    signerStatus: Array<{
      email: string;
      name: string;
      status: string;
      signedDate?: string;
    }>;
  }> {
    // TODO: Replace with actual API call to check DocuSign envelope status
    // return fetch(`${this.baseUrl}/signature-status/${envelopeId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock response
        resolve({
          status: 'signed',
          signerStatus: [
            {
              email: 'demo@treasurecoast.com',
              name: 'Demo Investor',
              status: 'completed',
              signedDate: new Date().toISOString()
            }
          ]
        });
      }, 500);
    });
  }

  async deleteDocument(documentId: string): Promise<void> {
    // TODO: Replace with actual API call (admin only)
    // Backend will remove file from storage and database record
    // return fetch(`${this.baseUrl}/${documentId}`, { method: 'DELETE' })
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.mockDocuments.findIndex(doc => doc.id === documentId);
        if (index === -1) {
          reject(new Error('Document not found'));
          return;
        }
        
        this.mockDocuments.splice(index, 1);
        resolve();
      }, 1000);
    });
  }

  // Utility methods
  getDocumentsByType(documents: Document[], type: DocumentType): Document[] {
    return documents.filter(doc => doc.type === type);
  }

  getDocumentsByStatus(documents: Document[], status: DocumentStatus): Document[] {
    return documents.filter(doc => doc.status === status);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getDocumentTypeLabel(type: DocumentType): string {
    const labels: Record<DocumentType, string> = {
      [DocumentType.SUBSCRIPTION_AGREEMENT]: 'Subscription Agreement',
      [DocumentType.OPERATING_AGREEMENT]: 'Operating Agreement',
      [DocumentType.PPM]: 'Private Placement Memorandum',
      [DocumentType.TAX_DOCUMENT]: 'Tax Document',
      [DocumentType.QUARTERLY_REPORT]: 'Quarterly Report',
      [DocumentType.ANNUAL_REPORT]: 'Annual Report',
      [DocumentType.DISTRIBUTION_STATEMENT]: 'Distribution Statement',
      [DocumentType.OTHER]: 'Other Document'
    };
    return labels[type];
  }
}

export const documentService = new DocumentService();