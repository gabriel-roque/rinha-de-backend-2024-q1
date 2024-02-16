import { AppError } from '@application/errors';
import {
  GetClientService,
  makeGetClientService,
} from '@application/services/clients/get-client.service';
import {
  CreateTransactionService,
  makeCreateTransactionService,
} from '@application/services/transactions';
import { ControllerContract } from '@domain/contracts';
import { Transaction } from '@domain/models';
import { Http } from '@main/interfaces';

export class CreateTransactionClientController implements ControllerContract {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
    private readonly getClientService: GetClientService,
  ) {}

  async handle(
    request: Http.Request<Transaction.DTO>,
  ): Promise<Http.Response<Transaction.ReturnDTO>> {
    try {
      const { body, params } = request;
      const { id } = params;

      const clientExist = await this.getClientService.perform(Number(id));
      if (!clientExist) return { statusCode: Http.StatusCode.NOT_FOUND };

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
      makeGetClientService(),
    );
  };
