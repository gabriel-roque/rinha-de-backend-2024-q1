import { Repository } from '@domain/contracts';
import { IClientRepository } from '@domain/interfaces';
import { Client } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { clientSchema } from '@infra/mongodb/schemas';

export class ClientRepository implements IClientRepository {
  public static tableName = 'clients';
  private readonly databaseAdapter: MongodbAdapter<Client.Model>;

  constructor(databaseAdapter: MongodbAdapter<Client.Model>) {
    this.databaseAdapter = databaseAdapter;
  }
  async update(
    data: Client.Model,
    { filter }: Repository.ParamsUpdate,
  ): Promise<Client.Model> {
    try {
      await this.databaseAdapter.update(data, filter);
      return await this.get({ filter });
    } catch (e) {
      throw e;
    }
  }

  async get(params: Repository.ParamsGet): Promise<Client.Model> {
    try {
      return await this.databaseAdapter.get(params);
    } catch (e) {
      throw e;
    }
  }

  async create(data: Client.Model): Promise<Client.Model> {
    try {
      return await this.databaseAdapter.create(data);
    } catch (e: any) {
      throw e;
    }
  }
}

/* istanbul ignore next */
export const makeClientRepository = (): ClientRepository => {
  const mongoDbAdapter = new MongodbAdapter<Client.Model>(
    clientSchema,
    ClientRepository.tableName,
  );
  return new ClientRepository(mongoDbAdapter);
};
