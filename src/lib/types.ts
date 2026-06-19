export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  avatar: string;
  joinedAt: string; // ISO string
}

export interface Client {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface Invoice {
  id: string;
  clientId: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string; // ISO string
  status: 'pending' | 'paid' | 'overdue' | 'partially_paid' | 'cancelled';
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export type ExceptionType = 'missing_approval' | 'payment_issue' | 'data_mismatch' | 'duplicate_entry' | 'coding_error' | 'vendor_dispute';
export type ExceptionStatus = 'queued' | 'in_review' | 'approved' | 'rejected' | 'resolved' | 'blocked';
export type ExceptionPriority = 'low' | 'medium' | 'high' | 'critical';
export type ResolutionStatus = 'pending_action' | 'action_taken' | 'escalated' | 'closed_resolved';

export interface ExceptionOwner {
  id: string;
  name: string;
  email: string;
}

export interface ExceptionApproval {
  approvedBy: string; // User ID
  approvedAt: string; // ISO date string
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
}

export interface InvoiceException {
  id: string;
  invoiceId: string;
  clientId: string;
  type: ExceptionType;
  description: string;
  status: ExceptionStatus;
  priority: ExceptionPriority;
  amount: number; // Dollar impact
  ownerId: string; // ID of the DemoUser responsible
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  dueDate: string; // Target resolution date
  approvalHistory: ExceptionApproval[];
  resolutionStatus: ResolutionStatus;
  notes?: string;
}