import { AppError } from '@application/errors';
import {
  GetClientService,
  makeGetClientService,
} from '@application/services/clients/get-client.service';
import { ControllerContract } from '@domain/contracts';
import { Client } from '@domain/models';
import { Http } from '@main/interfaces';

export class GetExtractClientController implements ControllerContract {
  constructor(private readonly getClientService: GetClientService) {}

  async handle(
    request: Http.Request,
  ): Promise<Http.Response<Client.ExtractReturnDTO>> {
    try {
      const { params } = request;
      const { id } = params;

      const client = await this.getClientService.perform(Number(id));
      if (!client) return { statusCode: Http.StatusCode.NOT_FOUND };

      // TODO: Ultimas transações as ultimas

      return {
        statusCode: Http.StatusCode.OK,
        data: {
          saldo: {
            total: client.saldo,
            data_extrato: new Date().toISOString(),
            limite: client.limite,
          },
          ultimas_transacoes: [],
        },
      };
    } catch (e: any) {
      throw new AppError({
        message: 'Failed in get extract client',
        category: 'FAILED_EXTRACT_CLIENT',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e.message,
      });
    }
  }
}

/* istanbul ignore next */
export const makeGetExtractClientController =
  (): GetExtractClientController => {
    return new GetExtractClientController(makeGetClientService());
  };
