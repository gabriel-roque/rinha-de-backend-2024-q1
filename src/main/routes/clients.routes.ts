import { makeCreateTransactionClientController } from '@application/controllers/client';
import { createTransactionValidator } from '@application/controllers/client/validators';
import { Http, ResourceMapper } from '@main/interfaces';

const clientsRoutes: ResourceMapper[] = [
  {
    endPoint: '/clientes/:id/transacoes',
    method: Http.Methods.post,
    validators: [createTransactionValidator],
    controller: makeCreateTransactionClientController(),
  },
];

export { clientsRoutes };
