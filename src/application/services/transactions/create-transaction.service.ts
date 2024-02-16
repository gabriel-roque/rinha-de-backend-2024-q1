import { ITransactionRepository } from '@domain/interfaces';
import { Transaction } from '@domain/models';
import { CreateTransactionUseCase } from '@domain/use-cases';
import { makeTransactionRepository } from '@infra/mongodb/repos';
import { v4 as uuid } from 'uuid';

export class CreateTransactionService implements CreateTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async perform(transaction: Transaction.DTO): Promise<Transaction.Model> {
    return await this.transactionRepository.create({
      ...transaction,
      id: uuid(),
      realizada_em: new Date().toISOString(),
    });
  }
}

/* istanbul ignore next */
export const makeCreateTransactionService = (): CreateTransactionService => {
  return new CreateTransactionService(makeTransactionRepository());
};
