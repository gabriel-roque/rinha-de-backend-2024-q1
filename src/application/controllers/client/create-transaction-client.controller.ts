import { AppError } from '@application/errors';
import {
  makeUpdateClientService,
  UpdateClientService,
} from '@application/services/clients';
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
    private readonly updateClientService: UpdateClientService,
  ) {}

  async handle(
    request: Http.Request<Transaction.DTO>,
  ): Promise<Http.Response<Transaction.ReturnDTO>> {
    try {
      const { body, params } = request;
      const { valor, tipo } = body;
      const { id } = params;

      let client = await this.getClientService.perform(Number(id));
      if (!client) return { statusCode: Http.StatusCode.NOT_FOUND };

      if (
        tipo === Transaction.Type.Debit &&
        client.saldo - valor < -client.limite
      ) {
        return {
          statusCode: Http.StatusCode.UNPROCESSABLE_CONTENT,
          data: {
            limite: client.limite,
            saldo: client.saldo,
          },
        };
      }

      if (
        tipo === Transaction.Type.Debit &&
        client.saldo - valor >= -client.limite
      ) {
        await this.createTransactionService.perform(body);
        client.saldo -= valor;

        client = await this.updateClientService.perform(client);
      }

      if (tipo === Transaction.Type.Credit) {
        await this.createTransactionService.perform(body);
        client.saldo += valor;

        client = await this.updateClientService.perform(client);
      }

      return {
        statusCode: Http.StatusCode.OK,
        data: {
          limite: client.limite,
          saldo: client.saldo,
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
      makeUpdateClientService(),
    );
  };
