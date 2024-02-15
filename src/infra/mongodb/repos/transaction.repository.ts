import { ITransactionRepository } from '@domain/interfaces';
import { Transaction } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { transactionSchema } from '@infra/mongodb/schemas';

export class TransactionRepository implements ITransactionRepository {
  public static tableName = 'transactions';
  private readonly databaseAdapter: MongodbAdapter<Transaction.Model>;

  constructor(databaseAdapter: MongodbAdapter<Transaction.Model>) {
    this.databaseAdapter = databaseAdapter;
  }

  async create(data: Transaction.Model): Promise<Transaction.Model> {
    try {
      return await this.databaseAdapter.create(data);
    } catch (e: any) {
      throw e;
    }
  }
}

/* istanbul ignore next */
export const makeTransactionRepository = (): TransactionRepository => {
  const mongoDbAdapter = new MongodbAdapter<Transaction.Model>(
    transactionSchema,
    TransactionRepository.tableName,
  );
  return new TransactionRepository(mongoDbAdapter);
};
