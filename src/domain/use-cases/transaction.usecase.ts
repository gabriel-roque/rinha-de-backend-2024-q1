import { Transaction } from '@domain/models';

export interface CreateTransactionUseCase {
  perform(transaction: Transaction.DTO): Promise<Transaction.Model>;
}
