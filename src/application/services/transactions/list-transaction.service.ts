import { Repository } from '@domain/contracts';
import { ITransactionRepository } from '@domain/interfaces';
import { Transaction } from '@domain/models';
import { ListTransactionsUseCase } from '@domain/use-cases';
import { makeTransactionRepository } from '@infra/mongodb/repos';

export class ListTransactionsService implements ListTransactionsUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async perform(params: Repository.ParamsList): Promise<Transaction.Model[]> {
    return await this.transactionRepository.list(params);
  }
}

/* istanbul ignore next */
export const makeListTransactionsService = (): ListTransactionsService => {
  return new ListTransactionsService(makeTransactionRepository());
};
