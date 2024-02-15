import { AppError } from '@application/errors';
import {
  CreateTransactionService,
  makeCreateTransactionService,
} from '@application/services/transactions';
import { ControllerContract } from '@domain/contracts';
import { Transaction } from '@domain/models';
import { logger } from '@main/config/logger';
import { Http } from '@main/interfaces';

export class CreateTransactionClientController implements ControllerContract {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
  ) {}

  async handle(
    request: Http.Request<Transaction.DTO>,
  ): Promise<Http.Response<Transaction.ReturnDTO>> {
    try {
      //TODO: Veriricar se client existe, caso não return 404
      const { body } = request;
      logger.info(JSON.stringify(body));

      await this.createTransactionService.perform(body);

      return {
        statusCode: Http.StatusCode.OK,
        data: {
          limite: 0,
          saldo: 0,
        },
      };
    } catch (e: any) {
      throw new AppError({
        message: 'Failed in create transaction',
        category: 'FAILED_CREATE_TRANSACTION',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e.message,
      });
    }
  }
}

/* istanbul ignore next */
export const makeCreateTransactionClientController =
  (): CreateTransactionClientController => {
    return new CreateTransactionClientController(
      makeCreateTransactionService(),
    );
  };
