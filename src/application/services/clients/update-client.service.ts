import { IClientRepository } from '@domain/interfaces';
import { Client } from '@domain/models';
import { UpdateClientUseCase } from '@domain/use-cases/client.usecase';
import { makeClientRepository } from '@infra/mongodb/repos';

export class UpdateClientService implements UpdateClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async perform(client: Client.Model): Promise<Client.Model> {
    return await this.clientRepository.update(client, {
      filter: { id: client.id },
    });
  }
}

/* istanbul ignore next */
export const makeUpdateClientService = (): UpdateClientService => {
  return new UpdateClientService(makeClientRepository());
};
