import { Repository } from '@domain/contracts';
import { Transaction } from '@domain/models';

export interface CreateTransactionUseCase {
  perform(transaction: Transaction.DTO): Promise<Transaction.Model>;
}
export interface ListTransactionsUseCase {
  perform(params: Repository.ParamsList): Promise<Transaction.Model[]>;
}
