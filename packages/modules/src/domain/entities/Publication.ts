export type PublicationStatus =
  | 'DRAFT'
  | 'PENDING_CLIENT_APPROVAL'
  | 'CLIENT_APPROVED'
  | 'CONTRACT_SIGNED'
  | 'PAYMENT_RECEIVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'PENDING_FINAL_APPROVAL'
  | 'DISPUTED'
  | 'CLOSED'

export interface Publication {
  id: string
  status: PublicationStatus
  details?: Record<string, any>

  tenantId: string
  customerId: string
  disputeId?: string
  contractId?: string
  reviewId?: string

  createdAt: Date
  updatedAt: Date
  startDate?: Date
  endDate?: Date
}
