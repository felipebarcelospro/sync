import {
  Transaction,
  TransactionType,
  TransactionStatus,
  PaymentMethod,
} from '../../domain/entities/Transaction'

export interface CreateTransactionDTO {
  amount: number
  type: TransactionType
  status: TransactionStatus
  paymentMethod?: PaymentMethod
  paymentDetails?: Record<string, any>
  description?: string
  tenantId: string
  contractId?: string
  publicationId?: string
}

export interface UpdateTransactionDTO {
  status?: TransactionStatus
  paymentDetails?: Record<string, any>
  description?: string
}

export interface ITransactionRepository {
  create: (data: CreateTransactionDTO) => Promise<Transaction>
  getById: (id: string) => Promise<Transaction | null>
  update: (
    id: string,
    data: Partial<UpdateTransactionDTO>,
  ) => Promise<Transaction>
  delete: (id: string) => Promise<void>
  list: (tenantId: string) => Promise<Transaction[]>
  listByPublication: (publicationId: string) => Promise<Transaction[]>
}
