import { RepositoryContract } from '@domain/contracts';
import { Transaction } from '@domain/models';

export interface ITransactionRepository
  extends RepositoryContract<Transaction.Model> {
  create: (data: Transaction.Model) => Promise<Transaction.Model>;
}
