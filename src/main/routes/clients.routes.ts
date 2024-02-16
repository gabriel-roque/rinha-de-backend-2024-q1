import {
  makeCreateTransactionClientController,
  makeGetExtractClientController,
} from '@application/controllers/client';
import {
  createTransactionValidator,
  getExtractClientValidator,
} from '@application/controllers/client/validators';
import { Http, ResourceMapper } from '@main/interfaces';

const clientsRoutes: ResourceMapper[] = [
  {
    endPoint: '/clientes/:id/transacoes',
    method: Http.Methods.post,
    validators: [createTransactionValidator],
    controller: makeCreateTransactionClientController(),
  },
  {
    endPoint: '/clientes/:id/extrato',
    method: Http.Methods.get,
    validators: [getExtractClientValidator],
    controller: makeGetExtractClientController(),
  },
];

export { clientsRoutes };
