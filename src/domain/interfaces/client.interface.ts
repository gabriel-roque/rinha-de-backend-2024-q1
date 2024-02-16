import { Repository, RepositoryContract } from '@domain/contracts';
import { Client } from '@domain/models';

export interface IClientRepository extends RepositoryContract<Client.Model> {
  create: (data: Client.Model) => Promise<Client.Model>;
  get: (params: Repository.ParamsGet) => Promise<Client.Model>;
}
