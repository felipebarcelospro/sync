import { PrismaClient } from '@prisma/client'
import {
  ITransactionRepository,
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from '../../../interfaces/repositories/transaction'
import {
  Transaction,
  TransactionType,
  TransactionStatus,
  PaymentMethod,
} from '../../../domain/entities/Transaction'

export class PrismaTransactionRepository implements ITransactionRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(data: CreateTransactionDTO): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...data,
        type: data.type as TransactionType,
        status: data.status as TransactionStatus,
        paymentMethod: data.paymentMethod as PaymentMethod | undefined,
      },
    })
    return this.mapToDomain(transaction)
  }

  async getById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    })
    return transaction ? this.mapToDomain(transaction) : null
  }

  async update(
    id: string,
    data: Partial<UpdateTransactionDTO>,
  ): Promise<Transaction> {
    const updatedTransaction = await this.prisma.transaction.update({
      where: { id },
      data,
    })
    return this.mapToDomain(updatedTransaction)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({ where: { id } })
  }

  async list(tenantId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { tenantId },
    })
    return transactions.map(this.mapToDomain)
  }

  async listByPublication(publicationId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { publicationId },
    })
    return transactions.map(this.mapToDomain)
  }

  private mapToDomain(transaction: any): Transaction {
    return {
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
      status: transaction.status,
      paymentMethod: transaction.paymentMethod,
      paymentDetails: transaction.paymentDetails,
      description: transaction.description,
      tenantId: transaction.tenantId,
      contractId: transaction.contractId,
      publicationId: transaction.publicationId,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    }
  }
}
