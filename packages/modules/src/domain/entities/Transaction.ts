export type TransactionType = 'INCOME' | 'WITHDRAWAL' | 'FEE' | 'REFUND'

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'

export type PaymentMethod = 'PIX' | 'CREDIT_CARD' | 'BANK_TRANSFER' | 'BILLET'

export interface Transaction {
  id: string
  amount: number
  type: TransactionType
  status: TransactionStatus
  paymentMethod?: PaymentMethod
  paymentDetails?: Record<string, any>
  description?: string

  tenantId: string
  contractId?: string
  publicationId?: string

  createdAt: Date
  updatedAt: Date
}
